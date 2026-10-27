// ═══════════════════════════════════════════════════════════
//  Trademark search — Nice classes, application statuses and
//  recent filings. Recent filings are SAMPLE entries for the demo
//  (`sample: true`); replace with a live feed once available.
// ═══════════════════════════════════════════════════════════

export const IP_INDIA_SEARCH_URL = 'https://tmrsearch.ipindia.gov.in/tmrpublicsearch/';

export const TM_CLASSES = [
  [1, 'Chemicals'], [2, 'Paints & varnishes'], [3, 'Cosmetics & cleaning preparations'], [4, 'Industrial oils, fuels & candles'],
  [5, 'Pharmaceuticals'], [6, 'Common metals & metal goods'], [7, 'Machines & machine tools'], [8, 'Hand tools & cutlery'],
  [9, 'Electronics, scientific apparatus & software'], [10, 'Medical & surgical apparatus'], [11, 'Lighting, heating, cooking & sanitary'], [12, 'Vehicles'],
  [13, 'Firearms & fireworks'], [14, 'Jewellery & watches'], [15, 'Musical instruments'], [16, 'Paper goods & printed matter'],
  [17, 'Rubber, plastics & insulation'], [18, 'Leather goods & bags'], [19, 'Non-metallic building materials'], [20, 'Furniture'],
  [21, 'Household utensils & glassware'], [22, 'Ropes, tents & sacks'], [23, 'Yarns & threads'], [24, 'Textiles'],
  [25, 'Clothing, footwear & headwear'], [26, 'Lace, buttons & haberdashery'], [27, 'Carpets & floor coverings'], [28, 'Games, toys & sporting goods'],
  [29, 'Meat, dairy & preserved foods'], [30, 'Coffee, tea, flour, bakery & spices'], [31, 'Agricultural produce & live animals'], [32, 'Beers & soft drinks'],
  [33, 'Alcoholic beverages (except beer)'], [34, 'Tobacco'], [35, 'Advertising, business & retail'], [36, 'Insurance, finance & real estate'],
  [37, 'Construction & repair'], [38, 'Telecommunications'], [39, 'Transport, travel & storage'], [40, 'Treatment of materials & manufacturing'],
  [41, 'Education & entertainment'], [42, 'Technology & software services'], [43, 'Restaurants & accommodation'], [44, 'Medical, beauty & agriculture services'],
  [45, 'Legal, security & personal services'],
].map(([n, name]) => ({ n, name }));

export const TM_STATUSES = [
  { name: 'Formalities Chk Pass', tone: 'bg-cornflower', desc: 'Application is complete and waiting to be examined.' },
  { name: 'Marked for Exam', tone: 'bg-cornflower', desc: 'Assigned to an examiner for substantive examination.' },
  { name: 'Objected', tone: 'bg-rose', desc: 'The examiner has raised objections — a reply is due within 30 days.' },
  { name: 'Accepted & Advertised', tone: 'bg-mint', desc: 'Published in the Trade Marks Journal; open to opposition for 4 months.' },
  { name: 'Opposed', tone: 'bg-peach', desc: 'A third party has filed an opposition — counter-statement required.' },
  { name: 'Registered', tone: 'bg-sun', desc: 'Registered for 10 years — you may now use the ® symbol.' },
];

const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

export const RECENT_FILINGS = [
  { mark: 'Saffron Loom', applicant: 'Saffron Loom Textiles', state: 'Gujarat', cls: 24, status: 'Formalities Chk Pass', filed: hoursAgo(5) },
  { mark: 'Nimbu Bites', applicant: 'Citrus Snacks LLP', state: 'Maharashtra', cls: 30, status: 'Formalities Chk Pass', filed: hoursAgo(9) },
  { mark: 'Kavach Secure', applicant: 'Kavach Systems Pvt Ltd', state: 'Karnataka', cls: 42, status: 'Formalities Chk Pass', filed: hoursAgo(14) },
  { mark: 'Gharwala', applicant: 'Gharwala Realty', state: 'Delhi', cls: 36, status: 'Marked for Exam', filed: hoursAgo(20) },
  { mark: 'Pebble & Pine', applicant: 'Pebble and Pine Interiors', state: 'Haryana', cls: 20, status: 'Formalities Chk Pass', filed: hoursAgo(26) },
  { mark: 'Tarang Audio', applicant: 'Tarang Electronics', state: 'Tamil Nadu', cls: 9, status: 'Marked for Exam', filed: hoursAgo(31) },
  { mark: 'Mitti Craft', applicant: 'Mitti Craft Studio', state: 'Rajasthan', cls: 21, status: 'Formalities Chk Pass', filed: hoursAgo(40) },
  { mark: 'Yatra Wheels', applicant: 'Yatra Mobility Pvt Ltd', state: 'Uttar Pradesh', cls: 39, status: 'Formalities Chk Pass', filed: hoursAgo(47) },
].map((f, i) => ({ id: i + 1, ...f, sample: true }));

export const timeAgo = (iso) => {
  const h = Math.max(1, Math.round((Date.now() - new Date(iso)) / 3600000));
  if (h < 24) return `about ${h} hour${h === 1 ? '' : 's'} ago`;
  const d = Math.round(h / 24);
  return `about ${d} day${d === 1 ? '' : 's'} ago`;
};
