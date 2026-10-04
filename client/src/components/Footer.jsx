import React from 'react';

export default function Footer({ onSelectTab }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg width="34" height="18" viewBox="0 0 100 50" fill="none" stroke="#ffffff" strokeWidth="6">
            <circle cx="28" cy="25" r="18" />
            <circle cx="72" cy="25" r="18" />
            <path d="M46 25 Q50 18 54 25" />
          </svg>
          <span>lenskart</span>
        </div>

        <div className="footer-links">
          <span className="footer-link" onClick={() => onSelectTab('partner')}>
            Partner
          </span>
          <span className="footer-link" onClick={() => onSelectTab('landlord')}>
            Landlord
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Lenskart Solutions Private Limited. All Rights Reserved.
        </div>
        <div>
          Technology Driven Eyewear Platform & Retail Network.
        </div>
      </div>
    </footer>
  );
}
