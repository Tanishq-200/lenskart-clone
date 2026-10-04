import React, { useState } from 'react';
import {
  TrendingUp,
  CircleDollarSign,
  Briefcase,
  MonitorCheck,
  Store,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { submitPartnerLead } from '../api/client';

export default function PartnerPage({ onLeadSubmitted }) {
  // 3 tabs as shown in reference Screenshot 4 & 5:
  // 'model' (icon 1: chart/briefcase), 'vision' (icon 2: optometrist/computer), 'store' (icon 3: storefront)
  const [activeTab, setActiveTab] = useState('vision');

  // Form state
  const [formData, setFormData] = useState({
    isOptometrist: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  const validate = () => {
    const errs = {};
    if (formData.isOptometrist === '') {
      errs.isOptometrist = 'Please select if you are an optometrist';
    }
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || !/^[0-9+()\s-]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim() || formData.city.trim().length < 2) {
      errs.city = 'Please enter your city';
    }
    if (!formData.propertyType) {
      errs.propertyType = 'Please select property type';
    }

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
      const payload = {
        ...formData,
        isOptometrist: formData.isOptometrist === 'yes',
      };
      const response = await submitPartnerLead(payload);
      setSubmittedLead(response.data);
      if (onLeadSubmitted) onLeadSubmitted();
    } catch (err) {
      setServerError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      isOptometrist: '',
      name: '',
      email: '',
      phone: '',
      city: '',
      propertyType: '',
    });
    setErrors({});
    setSubmittedLead(null);
    setServerError('');
  };

  return (
    <div className="partner-page-wrap">
      <div className="partner-split-container">
        {/* =========================================================
            LEFT CONTENT COLUMN (Exact from Screenshots 3, 4, 5)
            ========================================================= */}
        <div className="partner-left-area">
          <div className="partner-content-inner">
            <div className="partner-subtag">OWN A SUCCESSFUL BUSINESS</div>
            <h1 className="partner-heading">Join Us As A Franchise Partner Today</h1>
            <p className="partner-desc">
              Lenskart is a technology-driven eyewear company, with 2500+ stores across 500+ cities.
              Become a franchise partner, and join Lenskart's Vision Mission today.
            </p>

            {/* Returns Section */}
            <h2 className="returns-heading">Returns that we deliver for our partners</h2>
            <div className="returns-row">
              <div className="return-item">
                <div className="return-icon-circle">
                  <CircleDollarSign size={24} strokeWidth={1.7} />
                </div>
                <div className="return-labels">
                  <span className="return-val">25-30%</span>
                  <span className="return-lbl">Margin</span>
                </div>
              </div>

              <div className="return-item">
                <div className="return-icon-circle">
                  <TrendingUp size={24} strokeWidth={1.7} />
                </div>
                <div className="return-labels">
                  <span className="return-val">Quick</span>
                  <span className="return-lbl">Breakeven</span>
                </div>
              </div>
            </div>

            {/* Why Partner With Us? */}
            <h2 className="why-partner-heading">Why Partner With Us?</h2>

            {/* Interactive Card Widget (Screenshots 4 & 5) */}
            <div className="vision-widget-card">
              {/* Left Vertical 3-Icon Bar */}
              <div className="vision-sidebar-icons">
                <button
                  type="button"
                  className={`sidebar-icon-btn ${activeTab === 'model' ? 'active' : ''}`}
                  onClick={() => setActiveTab('model')}
                  title="Business Model"
                >
                  <Briefcase size={22} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  className={`sidebar-icon-btn ${activeTab === 'vision' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vision')}
                  title="Business Vision"
                >
                  <MonitorCheck size={22} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  className={`sidebar-icon-btn ${activeTab === 'store' ? 'active' : ''}`}
                  onClick={() => setActiveTab('store')}
                  title="Store Showcase"
                >
                  <Store size={22} strokeWidth={1.8} />
                </button>
              </div>

              {/* Card Body */}
              <div className="vision-card-body">
                {/* TAB 2: BUSINESS VISION (Screenshot 4 Exact Content) */}
                {activeTab === 'vision' && (
                  <div className="vision-content-view">
                    <h3 className="vision-title">Business Vision</h3>
                    <p className="vision-intro">
                      Lenskart is a technology-driven eyewear company operating an integrated platform spanning
                      designing, manufacturing, branding and retailing of eyewear products.
                    </p>
                    <p className="vision-aims-lbl">We aim to:</p>
                    <ul className="vision-aims-list">
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>build solutions that improve access to affordable and quality Eyewear for All.</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>offer customers a wide and evolving range of choices across occasions, styles, and needs, empowering them to see better every day.</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>play a foundational role in the prescription eyeglasses value chain through free eye tests</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>provide cross channel access with consistent pricing to customers</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>deliver better customer experience through our range of customized technology solutions, AI tools and automation</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* TAB 3: STORE SHOWCASE (Screenshot 5 Exact Content) */}
                {activeTab === 'store' && (
                  <div className="store-content-view">
                    <div className="store-img-container">
                      <img
                        src="/images/store_interior.jpg"
                        alt="Lenskart Store Interior"
                        className="store-display-img"
                      />
                    </div>
                    <p className="store-caption-text">A premium store for all cities in India.</p>
                  </div>
                )}

                {/* TAB 1: BUSINESS MODEL */}
                {activeTab === 'model' && (
                  <div className="vision-content-view">
                    <h3 className="vision-title">Business Model</h3>
                    <p className="vision-intro">
                      Lenskart operates an omnichannel FOFO (Franchise Owned Franchise Operated) model powered by centralized manufacturing and automated inventory management.
                    </p>
                    <ul className="vision-aims-list" style={{ marginTop: '14px' }}>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>Zero dead stock risk with automated demand forecasting & auto replenishment.</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>Protected 25-30% margins with nationwide marketing and brand support.</span>
                      </li>
                      <li>
                        <span className="vision-chevron">&rsaquo;</span>
                        <span>Proprietary 3D Try-on, digital frame selectors, and automated eye test labs.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: LIGHT TURQUOISE FORM (Screenshots 3, 4, 5)
            ========================================================= */}
        <div className="partner-right-form-panel">
          <div className="partner-form-inner">
            {submittedLead ? (
              <div className="form-success-box">
                <CheckCircle2 size={40} className="success-icon" />
                <h3 className="success-title">Request Submitted</h3>
                <p className="success-text">
                  Thank you, <strong>{submittedLead.name}</strong>. Our franchise partnership team for <strong>{submittedLead.city}</strong> will contact you shortly.
                </p>
                <button type="button" className="btn-form-reset" onClick={handleReset}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="form-main-title">Ready to start your growth journey?</h2>

                {serverError && (
                  <div className="form-server-error">
                    <AlertCircle size={16} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Question: Are you an optometrist ? */}
                <div className="form-q-block">
                  <div className="form-q-label">Are you an optometrist ?</div>
                  <div className="form-radio-row">
                    <label className="form-radio-item">
                      <input
                        type="radio"
                        name="isOptometrist"
                        value="yes"
                        checked={formData.isOptometrist === 'yes'}
                        onChange={(e) => handleInputChange('isOptometrist', e.target.value)}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="form-radio-item">
                      <input
                        type="radio"
                        name="isOptometrist"
                        value="no"
                        checked={formData.isOptometrist === 'no'}
                        onChange={(e) => handleInputChange('isOptometrist', e.target.value)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.isOptometrist && <div className="field-err">{errors.isOptometrist}</div>}
                </div>

                {/* Inputs: Name, Email, Phone Number, City */}
                <div className="form-input-group">
                  <input
                    type="text"
                    className={`form-pill-input ${errors.name ? 'has-error' : ''}`}
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  {errors.name && <div className="field-err">{errors.name}</div>}

                  <input
                    type="email"
                    className={`form-pill-input ${errors.email ? 'has-error' : ''}`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && <div className="field-err">{errors.email}</div>}

                  <input
                    type="tel"
                    className={`form-pill-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  {errors.phone && <div className="field-err">{errors.phone}</div>}

                  <input
                    type="text"
                    className={`form-pill-input ${errors.city ? 'has-error' : ''}`}
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  {errors.city && <div className="field-err">{errors.city}</div>}
                </div>

                {/* Question: What property type will you open the store at? */}
                <div className="form-q-block" style={{ marginTop: '10px' }}>
                  <div className="form-q-label">What property type will you open the store at?</div>
                  <div className="form-radio-row">
                    <label className="form-radio-item">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Owned"
                        checked={formData.propertyType === 'Owned'}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      />
                      <span>Owned</span>
                    </label>
                    <label className="form-radio-item">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Rented/Leased"
                        checked={formData.propertyType === 'Rented/Leased'}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      />
                      <span>Rented/Leased</span>
                    </label>
                  </div>
                  {errors.propertyType && <div className="field-err">{errors.propertyType}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-partner-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="btn-loading">
                      <Loader2 size={16} className="animate-spin" />
                      <span>SUBMITTING...</span>
                    </span>
                  ) : (
                    <span>SUBMIT REQUEST</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
