import React from 'react';

export default function Navbar({ activeTab, onSelectTab }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Lenskart Brand Logo */}
        <div className="navbar-brand" onClick={() => onSelectTab('partner')} role="button" tabIndex={0}>
          <svg className="lenskart-logo-svg" viewBox="0 0 170 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lenskart Spectacles Mark */}
            <circle cx="14" cy="19" r="10.5" stroke="#000042" strokeWidth="4" />
            <circle cx="39" cy="19" r="10.5" stroke="#000042" strokeWidth="4" />
            <path d="M24.5 19 Q26.5 15 28.5 19" stroke="#000042" strokeWidth="4" strokeLinecap="round" />
            {/* "lenskart" typography */}
            <text x="58" y="26" fill="#000042" fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" fontSize="21" fontWeight="800" letterSpacing="-0.3">
              lenskart
            </text>
          </svg>
        </div>

        {/* Navigation Tabs: Partner and Landlord */}
        <nav className="navbar-nav">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'partner' ? 'active' : ''}`}
            onClick={() => onSelectTab('partner')}
          >
            Partner
          </button>
          
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'landlord' ? 'active' : ''}`}
            onClick={() => onSelectTab('landlord')}
          >
            Landlord
          </button>
        </nav>
      </div>
    </header>
  );
}
