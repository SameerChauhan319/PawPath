import React from 'react';
import { Plane, Briefcase } from './Icons';

export const Hero = ({ onExploreClick }) => {
  return (
    <section className="hero-section">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="hero-title">
          The Safest Path for Your Furry Friend
        </h1>
        <p className="hero-subtitle">
          Global Pet Travel Logistics by <span style={{ fontWeight: '700', color: 'var(--color-indigo-600)' }}>PawPaths</span>
        </p>
        <div className="hero-cta-container">
          <button onClick={onExploreClick} className="btn btn-primary">
            <Plane style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Explore Packages
          </button>
          <a href="#estimator" className="btn btn-secondary">
            <Briefcase style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Get Quote Estimator
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
