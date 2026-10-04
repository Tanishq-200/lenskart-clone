const repository = require('../config/repository');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
const isValidPhone = (phone) => /^[0-9+()\s-]{7,16}$/.test(String(phone).trim());

exports.createLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      city,
      email,
      state,
      landlordType,
      frontage,
      propertyAddress,
      propertyCity,
      carpetArea,
      superArea,
      catchment,
      floor,
      expectedRent,
      notes,
    } = req.body;

    const errors = {};

    if (!firstName || String(firstName).trim().length < 2) {
      errors.firstName = 'First name is required (at least 2 characters)';
    }

    if (!lastName || String(lastName).trim().length < 1) {
      errors.lastName = 'Last name is required';
    }

    if (!mobile || !isValidPhone(mobile)) {
      errors.mobile = 'A valid mobile number is required (7-15 digits)';
    }

    if (!city || String(city).trim().length < 2) {
      errors.city = 'City is required';
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'A valid email address is required';
    }

    if (!state || String(state).trim().length < 2) {
      errors.state = 'Please select a state';
    }

    if (!landlordType || String(landlordType).trim().length < 2) {
      errors.landlordType = 'Please select a landlord type';
    }

    if (!frontage || String(frontage).trim().length < 1) {
      errors.frontage = 'Frontage in sq.ft is required';
    }

    if (!propertyAddress || String(propertyAddress).trim().length < 5) {
      errors.propertyAddress = 'Property layout address is required (at least 5 characters)';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please fill in all required fields properly.',
        errors,
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const lead = await repository.createLandlordLead(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobile: mobile.trim(),
        city: city.trim(),
        email: email.trim(),
        state: state.trim(),
        landlordType: landlordType.trim(),
        frontage: frontage.trim(),
        propertyAddress: propertyAddress.trim(),
        propertyCity: propertyCity ? String(propertyCity).trim() : '',
        carpetArea: carpetArea ? String(carpetArea).trim() : '',
        superArea: superArea ? String(superArea).trim() : '',
        catchment: catchment ? String(catchment).trim() : '',
        floor: floor ? String(floor).trim() : 'Ground Floor',
        expectedRent: expectedRent ? String(expectedRent).trim() : '',
        notes: notes ? String(notes).trim() : '',
      },
      ipAddress
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your property details have been submitted. Our retail expansion team will inspect and reach out.',
      data: lead,
    });
  } catch (err) {
    console.error('[LandlordController] Error creating landlord submission:', err);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your property submission.',
      error: err.message,
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { search, status, state, page = 1, limit = 50 } = req.query;
    const result = await repository.getLandlordLeads({ search, status, state, page, limit });
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
    console.error('[LandlordController] Error fetching landlord leads:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve landlord submissions',
      error: err.message,
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await repository.getLandlordLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Property submission not found' });
    }
    return res.status(200).json({ success: true, data: lead });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { status, notes, carpetArea, floor, expectedRent } = req.body;
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (carpetArea !== undefined) updates.carpetArea = carpetArea;
    if (floor !== undefined) updates.floor = floor;
    if (expectedRent !== undefined) updates.expectedRent = expectedRent;

    const updated = await repository.updateLandlordLead(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Property submission not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Property submission updated successfully',
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deleted = await repository.deleteLandlordLead(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property submission not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Property submission deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
