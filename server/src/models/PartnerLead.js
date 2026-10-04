const mongoose = require('mongoose');

const PartnerLeadSchema = new mongoose.Schema(
  {
    isOptometrist: {
      type: Boolean,
      required: [true, 'Optometrist selection is required'],
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+()-\s]{7,16}$/, 'Please provide a valid phone number'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [80, 'City cannot exceed 80 characters'],
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: {
        values: ['Owned', 'Rented/Leased'],
        message: 'Property type must be either Owned or Rented/Leased',
      },
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Review', 'Meeting Scheduled', 'Approved', 'Rejected'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    source: {
      type: String,
      default: 'Franchise Partner Portal',
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

// Indexes for query performance
PartnerLeadSchema.index({ email: 1, phone: 1 });
PartnerLeadSchema.index({ city: 1, status: 1 });
PartnerLeadSchema.index({ createdAt: -1 });

module.exports = mongoose.models.PartnerLead || mongoose.model('PartnerLead', PartnerLeadSchema);
