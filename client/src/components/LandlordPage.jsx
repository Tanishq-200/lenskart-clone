import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitLandlordLead } from '../api/client';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Chandigarh', 'Puducherry'
];

const LANDLORD_TYPES = [
  'Select Landlords Type',
  'Individual Owner',
  'Commercial Complex / Mall Developer',
  'Authorized Broker / Agent',
  'Corporate Entity',
];

export default function LandlordPage({ onLeadSubmitted }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    city: '',
    email: '',
    state: '',
    landlordType: '',
    frontage: '',
    propertyAddress: '',
    propertyCity: '',
    carpetArea: '',
    superArea: '',
    catchment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!formData.mobile.trim() || !/^[0-9+()\s-]{7,16}$/.test(formData.mobile.trim())) {
      errs.mobile = 'Mobile Number is required';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid Email Id is required';
    }
    if (!formData.state || formData.state === 'Select State') {
      errs.state = 'Please select a state';
    }
    if (!formData.landlordType || formData.landlordType === 'Select Landlords Type') {
      errs.landlordType = 'Please select landlords type';
    }
    if (!formData.frontage.trim()) errs.frontage = 'Frontage is required';
    if (!formData.propertyAddress.trim()) errs.propertyAddress = 'Property Address is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await submitLandlordLead(formData);
      setSubmittedLead(response.data);
      if (onLeadSubmitted) onLeadSubmitted();
    } catch (err) {
      setServerError(err.message || 'Failed to submit details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mobile: '',
      city: '',
      email: '',
      state: '',
      landlordType: '',
      frontage: '',
      propertyAddress: '',
      propertyCity: '',
      carpetArea: '',
      superArea: '',
      catchment: '',
    });
    setErrors({});
    setSubmittedLead(null);
    setServerError('');
  };

  return (
    <div className="landlord-page-wrap">
      {/* Landlord Header (Screenshot 2) */}
      <div className="landlord-hero-section">
        <h1 className="landlord-page-title">Landlords - Lenskart</h1>
        <p className="landlord-intro-p">
          Do you have a property in a main market in your city which you would like to rent?
          We are here for you. Lenskart has a network of 2500+ stores. As part of our expansion plan,
          we constantly require main market properties that meet our specifications.
        </p>
        <p className="landlord-link-p">
          <a href="#cities" className="landlord-teal-link" onClick={(e) => e.preventDefault()}>
            Click here
          </a>{' '}
          to check out the list of cities and markets where we are actively looking for a store.
        </p>
        <p className="landlord-intro-p">
          We request you to fill the form below and we will contact you shortly.
        </p>
      </div>

      {/* Landlord Form (Screenshots 1 & 2) */}
      <div className="landlord-form-wrap">
        {submittedLead ? (
          <div className="landlord-success-card">
            <CheckCircle2 size={44} className="landlord-success-icon" />
            <h3 className="landlord-success-title">Property Details Submitted</h3>
            <p className="landlord-success-msg">
              Thank you, <strong>{submittedLead.firstName} {submittedLead.lastName}</strong>.
              Your property submission has been saved. Our real-estate team will contact you at {submittedLead.mobile}.
            </p>
            <button type="button" className="landlord-btn-reset" onClick={handleReset}>
              Submit Another Property
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="landlord-error-banner">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            {/* SECTION 1: PERSONAL DETAILS */}
            <div className="landlord-sec-heading">PERSONAL DETAILS</div>

            <div className="landlord-fields-grid">
              {/* Row 1: First Name & Mobile No */}
              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="firstName">
                  First Name <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="firstName"
                    type="text"
                    className={`landlord-input-box ${errors.firstName ? 'err' : ''}`}
                    placeholder="Enter your First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <div className="landlord-err-text">{errors.firstName}</div>}
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="mobile">
                  Mobile No <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="mobile"
                    type="tel"
                    className={`landlord-input-box ${errors.mobile ? 'err' : ''}`}
                    placeholder="Enter your Mobile No."
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                  />
                  {errors.mobile && <div className="landlord-err-text">{errors.mobile}</div>}
                </div>
              </div>

              {/* Row 2: Last Name & City */}
              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="lastName">
                  Last Name <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="lastName"
                    type="text"
                    className={`landlord-input-box ${errors.lastName ? 'err' : ''}`}
                    placeholder="Enter your Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <div className="landlord-err-text">{errors.lastName}</div>}
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="city">
                  City <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="city"
                    type="text"
                    className={`landlord-input-box ${errors.city ? 'err' : ''}`}
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  {errors.city && <div className="landlord-err-text">{errors.city}</div>}
                </div>
              </div>

              {/* Row 3: Email Id & State */}
              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="email">
                  Email Id <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="email"
                    type="email"
                    className={`landlord-input-box ${errors.email ? 'err' : ''}`}
                    placeholder="Enter your Email Id"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && <div className="landlord-err-text">{errors.email}</div>}
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="state">
                  State <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <select
                    id="state"
                    className={`landlord-input-box landlord-select-box ${errors.state ? 'err' : ''}`}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <div className="landlord-err-text">{errors.state}</div>}
                </div>
              </div>
            </div>

            {/* SECTION 2: LAND DETAILS */}
            <div className="landlord-sec-heading" style={{ marginTop: '36px' }}>LAND DETAILS</div>

            <div className="landlord-fields-grid">
              {/* Landlord Type & Frontage */}
              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="landlordType">
                  Landlord Type <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <select
                    id="landlordType"
                    className={`landlord-input-box landlord-select-box ${errors.landlordType ? 'err' : ''}`}
                    value={formData.landlordType}
                    onChange={(e) => handleInputChange('landlordType', e.target.value)}
                  >
                    {LANDLORD_TYPES.map((type) => (
                      <option key={type} value={type === 'Select Landlords Type' ? '' : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.landlordType && <div className="landlord-err-text">{errors.landlordType}</div>}
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="frontage">
                  Frontage <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="frontage"
                    type="text"
                    className={`landlord-input-box ${errors.frontage ? 'err' : ''}`}
                    placeholder="Frontage in Sq.ft"
                    value={formData.frontage}
                    onChange={(e) => handleInputChange('frontage', e.target.value)}
                  />
                  {errors.frontage && <div className="landlord-err-text">{errors.frontage}</div>}
                </div>
              </div>
            </div>

            {/* Property Address */}
            <div className="landlord-field-item-full" style={{ marginTop: '16px' }}>
              <label className="landlord-field-lbl" htmlFor="propertyAddress">
                Property Address <span className="req">*</span> :
              </label>
              <div className="landlord-field-control">
                <textarea
                  id="propertyAddress"
                  className={`landlord-input-box landlord-textarea-box ${errors.propertyAddress ? 'err' : ''}`}
                  placeholder="Layout Address"
                  rows={4}
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                />
                {errors.propertyAddress && <div className="landlord-err-text">{errors.propertyAddress}</div>}
              </div>
            </div>

            {/* Additional Landlord Details per User Requirements */}
            <div className="landlord-fields-grid" style={{ marginTop: '16px' }}>
              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="propertyCity">
                  City <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="propertyCity"
                    type="text"
                    className="landlord-input-box"
                    placeholder="Location"
                    value={formData.propertyCity}
                    onChange={(e) => handleInputChange('propertyCity', e.target.value)}
                  />
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="carpetArea">
                  Carpet Area <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="carpetArea"
                    type="text"
                    className="landlord-input-box"
                    placeholder="Size in Sq.ft"
                    value={formData.carpetArea}
                    onChange={(e) => handleInputChange('carpetArea', e.target.value)}
                  />
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="superArea">
                  Super Area <span className="req">*</span> :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="superArea"
                    type="text"
                    className="landlord-input-box"
                    placeholder="In Sq.ft"
                    value={formData.superArea}
                    onChange={(e) => handleInputChange('superArea', e.target.value)}
                  />
                </div>
              </div>

              <div className="landlord-field-item">
                <label className="landlord-field-lbl" htmlFor="catchment">
                  Catchment :
                </label>
                <div className="landlord-field-control">
                  <input
                    id="catchment"
                    type="text"
                    className="landlord-input-box"
                    placeholder="Neighborhood Market"
                    value={formData.catchment}
                    onChange={(e) => handleInputChange('catchment', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT Button */}
            <div className="landlord-btn-wrapper">
              <button type="submit" className="btn-landlord-rect-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Loader2 size={16} className="animate-spin" />
                    <span>SUBMITTING...</span>
                  </span>
                ) : (
                  <span>SUBMIT</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
