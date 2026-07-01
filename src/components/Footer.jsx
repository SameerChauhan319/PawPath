import React from 'react';
import { PawPrint } from './Icons';

export const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content max-w-7xl mx-auto px-4 w-full">
        <div style={{ textAlign: 'center' }}>
          <div className="logo" style={{ justifyContent: 'center', color: '#ffffff' }}>
            <PawPrint style={{ width: '1.5rem', height: '1.5rem', fill: 'var(--color-indigo-400)' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>PawPaths</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', marginTop: '0.5rem' }}>Your trusted partner in premium pet relocation.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Contact Logistics:</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', margin: 0 }}>Email: bookings@pawpaths.com</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', margin: 0 }}>Phone: +1 (555) PET-MOVE</p>
        </div>
      </div>
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #374151', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', paddingBottom: '1.5rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} PawPaths Logistics. All rights reserved. | Campus Placements Showcase
        </p>
      </div>
    </footer>
  );
};
export default Footer;
