const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { isMongooseConnected } = require('./db');
const PartnerLead = require('../models/PartnerLead');
const LandlordLead = require('../models/LandlordLead');

const DATA_FILE = path.join(__dirname, '../../data/submissions.json');

// Ensure data file exists with default structure
const initFileStore = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      partnerLeads: [
        {
          _id: uuidv4(),
          isOptometrist: true,
          name: 'Dr. Rajesh Sharma',
          email: 'rajesh.sharma@optovision.in',
          phone: '+91 98101 23456',
          city: 'New Delhi',
          propertyType: 'Owned',
          status: 'In Review',
          notes: 'Experienced optometrist with 8 years practice. Prime high street location.',
          source: 'Franchise Partner Portal',
          createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
        },
        {
          _id: uuidv4(),
          isOptometrist: false,
          name: 'Priya Nair',
          email: 'priya.nair@retailventures.com',
          phone: '+91 98450 67890',
          city: 'Bengaluru',
          propertyType: 'Rented/Leased',
          status: 'Contacted',
          notes: 'Looking for 2 store locations in Indiranagar & Koramangala.',
          source: 'Franchise Partner Portal',
          createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        },
        {
          _id: uuidv4(),
          isOptometrist: true,
          name: 'Dr. Amit Verma',
          email: 'amit.verma@eyecareclinic.org',
          phone: '+91 99201 11223',
          city: 'Mumbai',
          propertyType: 'Owned',
          status: 'Approved',
          notes: 'Commercial shop approved for fitout. Final agreement in progress.',
          source: 'Franchise Partner Portal',
          createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
        {
          _id: uuidv4(),
          isOptometrist: false,
          name: 'Vikramaditya Rathore',
          email: 'vikram.rathore@royalgroups.in',
          phone: '+91 94140 88990',
          city: 'Jaipur',
          propertyType: 'Owned',
          status: 'New',
          notes: 'High net-worth investor interested in multi-unit franchise.',
          source: 'Franchise Partner Portal',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
      ],
      landlordLeads: [
        {
          _id: uuidv4(),
          firstName: 'Ramesh',
          lastName: 'Gupta',
          mobile: '+91 98110 33445',
          city: 'New Delhi',
          email: 'ramesh.gupta.realty@gmail.com',
          state: 'Delhi',
          landlordType: 'Individual Owner',
          frontage: '24 ft',
          propertyAddress: 'Shop 14, Main Market, South Extension Part II, New Delhi 110049',
          carpetArea: '850 sq.ft',
          floor: 'Ground Floor',
          expectedRent: '₹1,80,000 / month',
          status: 'Site Visit Scheduled',
          notes: 'Clear title, excellent visibility, high footfall market.',
          source: 'Landlord Property Portal',
          createdAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
        },
        {
          _id: uuidv4(),
          firstName: 'Meera',
          lastName: 'Sundaram',
          mobile: '+91 98860 99887',
          city: 'Bengaluru',
          email: 'meera.sundaram@mallops.com',
          state: 'Karnataka',
          landlordType: 'Commercial Complex / Mall Developer',
          frontage: '32 ft',
          propertyAddress: 'GF-08, Phoenix Retail Hub, ITPL Main Road, Whitefield, Bengaluru',
          carpetArea: '1200 sq.ft',
          floor: 'Ground Floor',
          expectedRent: '₹2,60,000 / month',
          status: 'Feasibility Check',
          notes: 'Corner anchor unit next to Starbucks. Ideal for flagship store.',
          source: 'Landlord Property Portal',
          createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        },
        {
          _id: uuidv4(),
          firstName: 'Sanjay',
          lastName: 'Deshmukh',
          mobile: '+91 98220 55667',
          city: 'Pune',
          email: 'sanjay.deshmukh@rediffmail.com',
          state: 'Maharashtra',
          landlordType: 'Individual Owner',
          frontage: '18 ft',
          propertyAddress: 'Shop No 3, Near Goodluck Cafe, FC Road, Shivajinagar, Pune 411005',
          carpetArea: '750 sq.ft',
          floor: 'Ground Floor',
          expectedRent: '₹1,45,000 / month',
          status: 'New',
          notes: 'Youth demographic, college belt, high density evening crowd.',
          source: 'Landlord Property Portal',
          createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        },
      ],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('[Storage] Initialized persistent JSON datastore with seed data.');
  }
};

initFileStore();

const readFileStore = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Error reading file store:', err);
    return { partnerLeads: [], landlordLeads: [] };
  }
};

const writeFileStore = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Storage] Error writing file store:', err);
    return false;
  }
};

// ============================================
// PARTNER LEADS METHODS
// ============================================

const createPartnerLead = async (data, ipAddress = '') => {
  if (isMongooseConnected()) {
    try {
      const doc = new PartnerLead({ ...data, ipAddress });
      return await doc.save();
    } catch (err) {
      console.warn('[Storage] Mongoose save failed, using file fallback:', err.message);
    }
  }

  const store = readFileStore();
  const newLead = {
    _id: uuidv4(),
    isOptometrist: Boolean(data.isOptometrist),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    city: data.city.trim(),
    propertyType: data.propertyType,
    status: 'New',
    notes: data.notes || '',
    source: 'Franchise Partner Portal',
    ipAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.partnerLeads.unshift(newLead);
  writeFileStore(store);
  return newLead;
};

const getPartnerLeads = async ({ search = '', status = '', propertyType = '', page = 1, limit = 50 }) => {
  if (isMongooseConnected()) {
    try {
      const query = {};
      if (status) query.status = status;
      if (propertyType) query.propertyType = propertyType;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
        ];
      }
      const skip = (page - 1) * limit;
      const [leads, total] = await Promise.all([
        PartnerLead.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        PartnerLead.countDocuments(query),
      ]);
      return { leads, total, page: Number(page), limit: Number(limit) };
    } catch (err) {
      console.warn('[Storage] Mongoose find failed, using file fallback:', err.message);
    }
  }

  const store = readFileStore();
  let results = [...(store.partnerLeads || [])];

  if (status) {
    results = results.filter((item) => item.status === status);
  }
  if (propertyType) {
    results = results.filter((item) => item.propertyType === propertyType);
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(s)) ||
        (item.email && item.email.toLowerCase().includes(s)) ||
        (item.phone && item.phone.toLowerCase().includes(s)) ||
        (item.city && item.city.toLowerCase().includes(s))
    );
  }

  const total = results.length;
  const skip = (page - 1) * limit;
  const paginated = results.slice(skip, skip + Number(limit));

  return { leads: paginated, total, page: Number(page), limit: Number(limit) };
};

const getPartnerLeadById = async (id) => {
  if (isMongooseConnected()) {
    try {
      return await PartnerLead.findById(id);
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  return store.partnerLeads.find((l) => l._id === id || l.id === id) || null;
};

const updatePartnerLead = async (id, updates) => {
  if (isMongooseConnected()) {
    try {
      return await PartnerLead.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  const idx = store.partnerLeads.findIndex((l) => l._id === id || l.id === id);
  if (idx === -1) return null;

  store.partnerLeads[idx] = {
    ...store.partnerLeads[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeFileStore(store);
  return store.partnerLeads[idx];
};

const deletePartnerLead = async (id) => {
  if (isMongooseConnected()) {
    try {
      const res = await PartnerLead.findByIdAndDelete(id);
      if (res) return true;
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  const initialLength = store.partnerLeads.length;
  store.partnerLeads = store.partnerLeads.filter((l) => l._id !== id && l.id !== id);
  writeFileStore(store);
  return store.partnerLeads.length < initialLength;
};

// ============================================
// LANDLORD LEADS METHODS
// ============================================

const createLandlordLead = async (data, ipAddress = '') => {
  if (isMongooseConnected()) {
    try {
      const doc = new LandlordLead({ ...data, ipAddress });
      return await doc.save();
    } catch (err) {
      console.warn('[Storage] Mongoose save failed, using file fallback:', err.message);
    }
  }

  const store = readFileStore();
  const newLead = {
    _id: uuidv4(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    mobile: data.mobile.trim(),
    city: data.city.trim(),
    email: data.email.trim().toLowerCase(),
    state: data.state.trim(),
    landlordType: data.landlordType.trim(),
    frontage: data.frontage.trim(),
    propertyAddress: data.propertyAddress.trim(),
    propertyCity: data.propertyCity ? data.propertyCity.trim() : '',
    carpetArea: data.carpetArea ? data.carpetArea.trim() : '',
    superArea: data.superArea ? data.superArea.trim() : '',
    catchment: data.catchment ? data.catchment.trim() : '',
    floor: data.floor ? data.floor.trim() : 'Ground Floor',
    expectedRent: data.expectedRent ? data.expectedRent.trim() : '',
    status: 'New',
    notes: data.notes || '',
    source: 'Landlord Property Portal',
    ipAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.landlordLeads.unshift(newLead);
  writeFileStore(store);
  return newLead;
};

const getLandlordLeads = async ({ search = '', status = '', state = '', page = 1, limit = 50 }) => {
  if (isMongooseConnected()) {
    try {
      const query = {};
      if (status) query.status = status;
      if (state) query.state = state;
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { propertyAddress: { $regex: search, $options: 'i' } },
        ];
      }
      const skip = (page - 1) * limit;
      const [leads, total] = await Promise.all([
        LandlordLead.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        LandlordLead.countDocuments(query),
      ]);
      return { leads, total, page: Number(page), limit: Number(limit) };
    } catch (err) {
      console.warn('[Storage] Mongoose find failed, using file fallback:', err.message);
    }
  }

  const store = readFileStore();
  let results = [...(store.landlordLeads || [])];

  if (status) {
    results = results.filter((item) => item.status === status);
  }
  if (state) {
    results = results.filter((item) => item.state === state);
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(
      (item) =>
        (item.firstName && item.firstName.toLowerCase().includes(s)) ||
        (item.lastName && item.lastName.toLowerCase().includes(s)) ||
        (item.email && item.email.toLowerCase().includes(s)) ||
        (item.mobile && item.mobile.toLowerCase().includes(s)) ||
        (item.city && item.city.toLowerCase().includes(s)) ||
        (item.propertyAddress && item.propertyAddress.toLowerCase().includes(s))
    );
  }

  const total = results.length;
  const skip = (page - 1) * limit;
  const paginated = results.slice(skip, skip + Number(limit));

  return { leads: paginated, total, page: Number(page), limit: Number(limit) };
};

const getLandlordLeadById = async (id) => {
  if (isMongooseConnected()) {
    try {
      return await LandlordLead.findById(id);
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  return store.landlordLeads.find((l) => l._id === id || l.id === id) || null;
};

const updateLandlordLead = async (id, updates) => {
  if (isMongooseConnected()) {
    try {
      return await LandlordLead.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  const idx = store.landlordLeads.findIndex((l) => l._id === id || l.id === id);
  if (idx === -1) return null;

  store.landlordLeads[idx] = {
    ...store.landlordLeads[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeFileStore(store);
  return store.landlordLeads[idx];
};

const deleteLandlordLead = async (id) => {
  if (isMongooseConnected()) {
    try {
      const res = await LandlordLead.findByIdAndDelete(id);
      if (res) return true;
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  const initialLength = store.landlordLeads.length;
  store.landlordLeads = store.landlordLeads.filter((l) => l._id !== id && l.id !== id);
  writeFileStore(store);
  return store.landlordLeads.length < initialLength;
};

// ============================================
// OVERVIEW STATS
// ============================================

const getStats = async () => {
  let partnerCount = 0;
  let landlordCount = 0;
  let optometristCount = 0;
  let ownedPropertyCount = 0;
  let rentedPropertyCount = 0;
  let partnerByStatus = {};
  let landlordByStatus = {};

  if (isMongooseConnected()) {
    try {
      partnerCount = await PartnerLead.countDocuments();
      landlordCount = await LandlordLead.countDocuments();
      optometristCount = await PartnerLead.countDocuments({ isOptometrist: true });
      ownedPropertyCount = await PartnerLead.countDocuments({ propertyType: 'Owned' });
      rentedPropertyCount = await PartnerLead.countDocuments({ propertyType: 'Rented/Leased' });

      const pStatus = await PartnerLead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
      pStatus.forEach((s) => { partnerByStatus[s._id] = s.count; });

      const lStatus = await LandlordLead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
      lStatus.forEach((s) => { landlordByStatus[s._id] = s.count; });

      return {
        partnerCount,
        landlordCount,
        optometristCount,
        nonOptometristCount: partnerCount - optometristCount,
        ownedPropertyCount,
        rentedPropertyCount,
        partnerByStatus,
        landlordByStatus,
      };
    } catch (err) {
      // Fallback
    }
  }

  const store = readFileStore();
  const pList = store.partnerLeads || [];
  const lList = store.landlordLeads || [];

  partnerCount = pList.length;
  landlordCount = lList.length;
  optometristCount = pList.filter((p) => p.isOptometrist).length;
  ownedPropertyCount = pList.filter((p) => p.propertyType === 'Owned').length;
  rentedPropertyCount = pList.filter((p) => p.propertyType === 'Rented/Leased').length;

  pList.forEach((p) => {
    partnerByStatus[p.status] = (partnerByStatus[p.status] || 0) + 1;
  });

  lList.forEach((l) => {
    landlordByStatus[l.status] = (landlordByStatus[l.status] || 0) + 1;
  });

  return {
    partnerCount,
    landlordCount,
    optometristCount,
    nonOptometristCount: partnerCount - optometristCount,
    ownedPropertyCount,
    rentedPropertyCount,
    partnerByStatus,
    landlordByStatus,
  };
};

module.exports = {
  createPartnerLead,
  getPartnerLeads,
  getPartnerLeadById,
  updatePartnerLead,
  deletePartnerLead,
  createLandlordLead,
  getLandlordLeads,
  getLandlordLeadById,
  updateLandlordLead,
  deleteLandlordLead,
  getStats,
};
