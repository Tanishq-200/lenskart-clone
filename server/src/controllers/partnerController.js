const repository = require('../config/repository');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
const isValidPhone = (phone) => /^[0-9+()\s-]{7,16}$/.test(String(phone).trim());

exports.createLead = async (req, res) => {
  try {
    const { isOptometrist, name, email, phone, city, propertyType, notes } = req.body;
    const errors = {};

    if (isOptometrist === undefined || isOptometrist === null || isOptometrist === '') {
      errors.isOptometrist = 'Please indicate whether you are an optometrist';
    }

    if (!name || String(name).trim().length < 2) {
      errors.name = 'Full name is required (minimum 2 characters)';
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'A valid email address is required';
    }

    if (!phone || !isValidPhone(phone)) {
      errors.phone = 'A valid phone number is required (7-15 digits)';
    }

    if (!city || String(city).trim().length < 2) {
      errors.city = 'Target city is required';
    }

    if (!propertyType || !['Owned', 'Rented/Leased'].includes(propertyType)) {
      errors.propertyType = 'Please select property type (Owned or Rented/Leased)';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted errors.',
        errors,
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const lead = await repository.createPartnerLead(
      {
        isOptometrist: Boolean(isOptometrist),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        propertyType,
        notes: notes ? String(notes).trim() : '',
      },
      ipAddress
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your franchise inquiry has been received. Our partner team will contact you shortly.',
      data: lead,
    });
  } catch (err) {
    console.error('[PartnerController] Error creating lead:', err);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your request.',
      error: err.message,
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { search, status, propertyType, page = 1, limit = 50 } = req.query;
    const result = await repository.getPartnerLeads({ search, status, propertyType, page, limit });
    return res.status(200).json({
      success: true,
      data: result.leads,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit) || 1,
      },
    });
  } catch (err) {
    console.error('[PartnerController] Error fetching leads:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve franchise leads',
      error: err.message,
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await repository.getPartnerLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Franchise lead not found' });
    }
    return res.status(200).json({ success: true, data: lead });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { status, notes, city, propertyType } = req.body;
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (city !== undefined) updates.city = city;
    if (propertyType !== undefined) updates.propertyType = propertyType;

    const updated = await repository.updatePartnerLead(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Franchise lead not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deleted = await repository.deletePartnerLead(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Franchise lead not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
