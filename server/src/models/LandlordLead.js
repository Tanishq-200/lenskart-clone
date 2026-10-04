const mongoose = require('mongoose');

const LandlordLeadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [60, 'First name cannot exceed 60 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [1, 'Last name is required'],
      maxlength: [60, 'Last name cannot exceed 60 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9+()-\s]{7,16}$/, 'Please provide a valid mobile number'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [80, 'City cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    landlordType: {
      type: String,
      required: [true, 'Landlord type is required'],
      trim: true,
    },
    frontage: {
      type: String,
      required: [true, 'Frontage in sq.ft is required'],
      trim: true,
    },
    propertyAddress: {
      type: String,
      required: [true, 'Property layout address is required'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
      maxlength: [500, 'Address cannot exceed 500 characters'],
    },
    carpetArea: {
      type: String,
      trim: true,
      default: '',
    },
    superArea: {
      type: String,
      trim: true,
      default: '',
    },
    catchment: {
      type: String,
      trim: true,
      default: '',
    },
    propertyCity: {
      type: String,
      trim: true,
      default: '',
    },
    floor: {
      type: String,
      trim: true,
      default: 'Ground Floor',
    },
    expectedRent: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Site Visit Scheduled', 'Feasibility Check', 'Approved', 'Rejected'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    source: {
      type: String,
      default: 'Landlord Property Portal',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

LandlordLeadSchema.index({ email: 1, mobile: 1 });
LandlordLeadSchema.index({ city: 1, state: 1, status: 1 });
LandlordLeadSchema.index({ createdAt: -1 });

module.exports = mongoose.models.LandlordLead || mongoose.model('LandlordLead', LandlordLeadSchema);
