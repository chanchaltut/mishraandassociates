import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const Mixed = Schema.Types.Mixed;

// ─── Admin users ─────────────────────────────────────────────
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 120 },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['owner', 'editor'], default: 'editor' },
    // Bumped on password change / sign-out everywhere — invalidates existing sessions
    tokenVersion: { type: Number, default: 0 },
    failedLogins: { type: Number, default: 0 },
    lockedUntil: Date,
    lastLoginAt: Date,
  },
  { timestamps: true }
);
userSchema.methods.toPublic = function toPublic() {
  return { id: this._id, name: this.name, email: this.email, role: this.role, lastLoginAt: this.lastLoginAt, createdAt: this.createdAt };
};
export const User = model('User', userSchema);

// ─── Editable content: one document per key (settings, home, services, …) ───
const contentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    draft: { type: Mixed, required: true },
    published: { type: Mixed, required: true },
    // Incremented on every save; a save with an older version is refused (two people editing)
    version: { type: Number, default: 1 },
    updatedBy: String,
    publishedAt: Date,
  },
  { timestamps: true, minimize: false }
);
export const Content = model('Content', contentSchema);

// ─── Publish history: each entry is a full copy of the public content ───
const publishSchema = new Schema(
  {
    snapshotId: { type: String, required: true, unique: true },
    content: { type: Mixed, required: true },
    publishedBy: String,
    note: { type: String, maxlength: 200 },
    deploy: {
      status: { type: String, enum: ['triggered', 'skipped', 'failed'], default: 'skipped' },
      message: String,
    },
  },
  { timestamps: true, minimize: false }
);
export const Publish = model('Publish', publishSchema);

// ─── Form submissions (inbox) ────────────────────────────────
export const SUBMISSION_TYPES = {
  enquiries: 'Enquiries',
  subscribers: 'Newsletter subscribers',
  'tender-subscriptions': 'Tender alert subscriptions',
  'trademark-searches': 'Trademark report requests',
};
const submissionSchema = new Schema(
  {
    type: { type: String, enum: Object.keys(SUBMISSION_TYPES), required: true, index: true },
    data: { type: Mixed, required: true },
    page: String,
    status: { type: String, enum: ['new', 'in-progress', 'done', 'spam'], default: 'new', index: true },
    notes: { type: String, default: '', maxlength: 4000 },
  },
  { timestamps: true, minimize: false }
);
submissionSchema.index({ createdAt: -1 });
export const Submission = model('Submission', submissionSchema);

// ─── Uploaded media (Cloudinary) ─────────────────────────────
const mediaSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, enum: ['image', 'raw'], default: 'image' },
    filename: String,
    bytes: Number,
    width: Number,
    height: Number,
    uploadedBy: String,
  },
  { timestamps: true }
);
export const Media = model('Media', mediaSchema);

// ─── Audit log ───────────────────────────────────────────────
const auditSchema = new Schema(
  {
    user: String,
    action: { type: String, required: true },
    target: String,
    detail: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
// Kept for one year
auditSchema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 24 * 3600 });
export const Audit = model('Audit', auditSchema);

export const audit = (user, action, target = '', detail = '') =>
  Audit.create({ user: user?.email || user || 'system', action, target, detail }).catch((err) =>
    console.error('[audit]', err.message)
  );
