// ═══════════════════════════════════════════════════════════
//  Tender notifications — admin collection: "tenders".
//  SAMPLE entries for the demo: every row is flagged `sample: true`
//  and dates are generated relative to today so "closing" badges
//  stay meaningful. Replace with the live tender feed once the
//  backend / data provider is connected.
//
//  Fields marked `locked` in the UI (value, EMD, authority,
//  documents) are shown only to paid subscribers.
// ═══════════════════════════════════════════════════════════

export const TENDER_PLAN = {
  name: 'Tender Alerts — Annual',
  price: '₹10,000',
  period: 'year',
  features: [
    'Full tender details — value, EMD, department and bid dates',
    'Tender documents, BOQ and corrigendum links',
    'Daily email + WhatsApp alerts for your keywords, sectors and states',
    'Tender results with awarded bidders and values',
    'Help with DSC, GeM, e-procurement and MSME / NSIC registration',
  ],
};

export const TENDER_SECTORS = [
  { id: 'construction', name: 'Construction & Civil Works', icon: 'ri-building-2-line' },
  { id: 'power', name: 'Power & Energy', icon: 'ri-flashlight-line' },
  { id: 'it', name: 'IT & Software', icon: 'ri-computer-line' },
  { id: 'medical', name: 'Medical & Healthcare', icon: 'ri-hospital-line' },
  { id: 'water', name: 'Water & Sanitation', icon: 'ri-drop-line' },
  { id: 'transport', name: 'Roads & Transport', icon: 'ri-road-map-line' },
  { id: 'consultancy', name: 'Consultancy & Services', icon: 'ri-briefcase-4-line' },
  { id: 'supply', name: 'Supply of Goods', icon: 'ri-truck-line' },
  { id: 'security', name: 'Security & Manpower', icon: 'ri-shield-user-line' },
  { id: 'education', name: 'Education & Training', icon: 'ri-graduation-cap-line' },
];

export const sectorOf = (id) => TENDER_SECTORS.find((s) => s.id === id);

export const TENDER_STATES = [
  'Delhi', 'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Rajasthan',
  'Madhya Pradesh', 'West Bengal', 'Haryana', 'Bihar', 'Telangana', 'Odisha', 'Punjab',
];

export const VALUE_BANDS = [
  { id: 'all', label: 'Any value' },
  { id: 'lt10l', label: 'Up to ₹10 lakh', max: 1e6 },
  { id: '10l-1cr', label: '₹10 lakh – ₹1 crore', min: 1e6, max: 1e7 },
  { id: '1cr-10cr', label: '₹1 crore – ₹10 crore', min: 1e7, max: 1e8 },
  { id: 'gt10cr', label: 'Above ₹10 crore', min: 1e8 },
];

const day = 24 * 60 * 60 * 1000;
const fromToday = (n) => {
  const d = new Date();
  d.setHours(17, 0, 0, 0);
  return new Date(d.getTime() + n * day).toISOString();
};

// value: estimated tender value in ₹ (null = "refer document")
const RAW = [
  { tid: '[__]41', sector: 'power', city: 'Nagpur', state: 'Maharashtra', title: 'Procurement of primary seals for sector plates of air pre-heaters at thermal power station units', value: null, emd: null, published: -9, due: 0, source: 'State e-Procurement', type: 'Goods' },
  { tid: '[__]58', sector: 'construction', city: 'New Delhi', state: 'Delhi', title: 'Construction of boundary wall, internal roads and storm-water drains at government school campus', value: 24500000, emd: 490000, published: -6, due: 4, source: 'CPPP', type: 'Works' },
  { tid: '[__]62', sector: 'it', city: 'Bengaluru', state: 'Karnataka', title: 'Supply, installation and maintenance of desktop computers, UPS and networking equipment for district offices', value: 8700000, emd: 174000, published: -3, due: 9, source: 'GeM', type: 'Goods' },
  { tid: '[__]77', sector: 'medical', city: 'Lucknow', state: 'Uttar Pradesh', title: 'Rate contract for supply of surgical consumables and disposables to district hospitals', value: 32000000, emd: 640000, published: -5, due: 2, source: 'State e-Procurement', type: 'Goods' },
  { tid: '[__]83', sector: 'water', city: 'Jaipur', state: 'Rajasthan', title: 'Operation and maintenance of water treatment plant and pumping stations for three years', value: 56000000, emd: 1120000, published: -11, due: 6, source: 'State e-Procurement', type: 'Services' },
  { tid: '[__]90', sector: 'transport', city: 'Ahmedabad', state: 'Gujarat', title: 'Strengthening and resurfacing of state highway including drainage and road furniture works', value: 148000000, emd: 2960000, published: -14, due: 12, source: 'State e-Procurement', type: 'Works' },
  { tid: '[__]04', sector: 'consultancy', city: 'Kolkata', state: 'West Bengal', title: 'Engagement of chartered accountant firm for internal audit of municipal corporation accounts', value: 1800000, emd: 36000, published: -2, due: 15, source: 'CPPP', type: 'Services' },
  { tid: '[__]19', sector: 'security', city: 'Gurugram', state: 'Haryana', title: 'Hiring of security guards and housekeeping manpower for government office complex', value: 9600000, emd: 192000, published: -4, due: 1, source: 'GeM', type: 'Services' },
  { tid: '[__]25', sector: 'supply', city: 'Chennai', state: 'Tamil Nadu', title: 'Supply of office furniture — modular workstations, chairs and storage units', value: 4200000, emd: 84000, published: -7, due: 8, source: 'GeM', type: 'Goods' },
  { tid: '[__]36', sector: 'education', city: 'Patna', state: 'Bihar', title: 'Implementation of smart classrooms with interactive panels in government secondary schools', value: 67000000, emd: 1340000, published: -8, due: 19, source: 'State e-Procurement', type: 'Goods' },
  { tid: '[__]47', sector: 'power', city: 'Hyderabad', state: 'Telangana', title: 'Design, supply and commissioning of grid-connected rooftop solar systems on public buildings', value: 210000000, emd: 4200000, published: -10, due: 21, source: 'State e-Procurement', type: 'Works' },
  { tid: '[__]53', sector: 'construction', city: 'Bhopal', state: 'Madhya Pradesh', title: 'Repair and renovation of residential quarters including electrical and plumbing works', value: 7300000, emd: 146000, published: -1, due: 13, source: 'CPPP', type: 'Works' },
  { tid: '[__]68', sector: 'it', city: 'New Delhi', state: 'Delhi', title: 'Development and maintenance of web portal and mobile application for citizen services', value: null, emd: null, published: -3, due: 10, source: 'CPPP', type: 'Services' },
  { tid: '[__]72', sector: 'medical', city: 'Bhubaneswar', state: 'Odisha', title: 'Supply and installation of CT scan machine with five-year comprehensive maintenance', value: 98000000, emd: 1960000, published: -12, due: 3, source: 'State e-Procurement', type: 'Goods' },
  { tid: '[__]86', sector: 'transport', city: 'Ludhiana', state: 'Punjab', title: 'Annual rate contract for hiring of light motor vehicles on monthly basis', value: 2600000, emd: 52000, published: -2, due: 0, source: 'GeM', type: 'Services' },
];

export const TENDERS = RAW.map((t, i) => ({
  id: i + 1,
  ...t,
  published: fromToday(t.published),
  due: fromToday(t.due),
  sample: true,
}));

export const TENDER_RESULTS = [
  { tid: '[__]11', sector: 'construction', state: 'Delhi', title: 'Construction of multipurpose community hall', bids: 7, awarded: -3, sample: true },
  { tid: '[__]15', sector: 'it', state: 'Maharashtra', title: 'Supply of laptops and tablets for field staff', bids: 12, awarded: -5, sample: true },
  { tid: '[__]22', sector: 'medical', state: 'Gujarat', title: 'Rate contract for diagnostic reagents', bids: 5, awarded: -6, sample: true },
  { tid: '[__]29', sector: 'security', state: 'Karnataka', title: 'Manpower services for hospital housekeeping', bids: 9, awarded: -8, sample: true },
  { tid: '[__]31', sector: 'water', state: 'Uttar Pradesh', title: 'Laying of distribution pipeline under water supply scheme', bids: 4, awarded: -10, sample: true },
].map((r, i) => ({ id: i + 1, ...r, awarded: fromToday(r.awarded) }));

export const daysLeft = (iso) => {
  const end = new Date(iso);
  const now = new Date();
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.round((end - now) / day);
};

// ₹ formatting in lakh / crore
export const inr = (n) => {
  if (n == null) return 'Refer document';
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2).replace(/\.?0+$/, '')} crore`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2).replace(/\.?0+$/, '')} lakh`;
  return `₹${n.toLocaleString('en-IN')}`;
};
