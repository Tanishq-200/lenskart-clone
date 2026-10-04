import React from 'react';

export default function TopBanner() {
  return (
    <div className="top-warning-bar" role="alert">
      <span>Be cautious while dealing with anyone claiming to offer Lenskart franchisee and to verify details </span>
      <a href="#verify" className="warning-link" onClick={(e) => e.preventDefault()}>
        click here.
      </a>
    </div>
  );
}
