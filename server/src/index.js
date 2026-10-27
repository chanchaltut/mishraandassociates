// Entry point: connect to MongoDB, make sure content and the owner account
// exist, then start serving.
import fs from 'node:fs';
import mongoose from 'mongoose';
import { config } from './config.js';
import { createApp } from './app.js';
import { Content, User } from './models.js';
import { ensureContent } from './content.js';
import { hashPassword, checkPasswordStrength } from './auth.js';

// The site's data modules read the build snapshot; outside a site build it doesn't exist yet
const snapshotFile = new URL('../../client/src/generated/snapshot.js', import.meta.url);
if (!fs.existsSync(snapshotFile)) {
  fs.mkdirSync(new URL('./', snapshotFile), { recursive: true });
  fs.writeFileSync(snapshotFile, 'export default null;\n');
}

async function ensureOwner() {
  const { email, password, resetPassword } = config.admin;
  if (resetPassword) {
    // Emergency reset: set RESET_ADMIN_PASSWORD, restart, sign in, then remove the variable
    const user = email && (await User.findOne({ email }));
    if (user && !checkPasswordStrength(resetPassword)) {
      user.passwordHash = await hashPassword(resetPassword);
      user.tokenVersion += 1;
      user.lockedUntil = undefined;
      user.failedLogins = 0;
      user.role = 'owner';
      await user.save();
      console.warn(`[admin] password for ${email} was reset from RESET_ADMIN_PASSWORD — remove that variable now.`);
    } else {
      console.warn('[admin] RESET_ADMIN_PASSWORD ignored: ADMIN_EMAIL must match an existing user and the password must be 10+ characters.');
    }
  }
  if (await User.exists({})) return;
  if (!email || checkPasswordStrength(password)) {
    console.warn('[admin] No admin user yet. Set ADMIN_EMAIL and ADMIN_PASSWORD (10+ characters) and restart.');
    return;
  }
  await User.create({ name: 'Owner', email, role: 'owner', passwordHash: await hashPassword(password) });
  console.log(`[admin] owner account created for ${email}`);
}

// The first deployments imported a domain that isn't the firm's (mishraandassociates.in)
// into the website address, contact email, FAQ text and alert recipients. Correct it
// once, wherever it appears; content that never had it is left untouched.
const WRONG_DOMAIN = [
  ['https://mishraandassociates.in', 'https://www.mishranassociates.com'],
  ['mishraandassociates.in', 'mishranassociates.com'],
];

async function migrateSiteAddress() {
  const fixed = [];
  for (const doc of await Content.find({})) {
    let changed = false;
    for (const field of ['draft', 'published']) {
      if (doc[field] == null) continue;
      const before = JSON.stringify(doc[field]);
      const after = WRONG_DOMAIN.reduce((s, [from, to]) => s.split(from).join(to), before);
      if (after !== before) {
        doc[field] = JSON.parse(after);
        changed = true;
      }
    }
    if (!changed) continue;
    doc.version += 1;
    await doc.save();
    fixed.push(doc.key);
  }
  if (fixed.length) console.log(`[content] corrected the website domain to mishranassociates.com in: ${fixed.join(', ')}`);
}

async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 15000 });
  console.log('[db] connected');

  const { buildDefaults } = await import('../../client/src/data/defaults.js');
  await ensureContent(buildDefaults());
  await migrateSiteAddress();
  await ensureOwner();

  const app = createApp();
  const server = app.listen(config.port, () => console.log(`[api] listening on :${config.port}`));

  const shutdown = () => {
    server.close(() => mongoose.disconnect().finally(() => process.exit(0)));
    setTimeout(() => process.exit(0), 10000).unref();
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

mongoose.connection.on('disconnected', () => console.warn('[db] disconnected — retrying automatically'));

main().catch((err) => {
  console.error('[api] failed to start:', err.message);
  process.exit(1);
});
