import React, { useState, useEffect } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import PartnerPage from './components/PartnerPage';
import LandlordPage from './components/LandlordPage';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('partner'); // 'partner' | 'landlord'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="lenskart-app">
      {/* 1. Black Announcement / Warning Bar */}
      <TopBanner />

      {/* 2. Header with Logo & Partner / Landlord Nav */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* 3. Main Body */}
      <main className="lenskart-main">
        {activeTab === 'partner' && (
          <PartnerPage />
        )}

        {activeTab === 'landlord' && (
          <LandlordPage />
        )}
      </main>

      {/* 4. Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
