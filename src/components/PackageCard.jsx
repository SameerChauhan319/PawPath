import React from 'react';
import { Star } from './Icons';

export const PackageCard = ({ pkg, onDetailsClick, onBookClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{ width: '1rem', height: '1rem', color: i <= floorRating ? '#f59e0b' : '#cbd5e1' }} 
          fill={i <= floorRating ? '#f59e0b' : 'none'}
        />
      );
    }
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>{stars}</span>;
  };

  return (
    <div className="package-card">
      <img 
        src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'} 
        className="package-image" 
        alt={pkg.destination} 
      />
      <div className="package-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-indigo-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {pkg.transportType}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            {renderStars(pkg.rating)}
            <span style={{ color: 'var(--color-gray-600)', marginLeft: '0.25rem' }}>{pkg.rating?.toFixed(1) || '0.0'}</span>
          </span>
        </div>
        
        <h3 className="package-title" style={{ marginTop: '0.5rem' }}>{pkg.destination}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', flexGrow: 1, lineBreak: 'strict', lineHeight: '1.4' }}>
          {pkg.description?.length > 110 ? `${pkg.description.substring(0, 110)}...` : pkg.description}
        </p>
        
        <div className="package-meta">
          <span className="package-meta-item">Duration: {pkg.duration}</span>
          <span className="package-meta-item">Size: {pkg.petSizeAllowed}</span>
          <span className="package-meta-item font-semibold" style={{ color: pkg.availableSeats <= 2 ? 'var(--color-red-600)' : 'inherit' }}>
            Seats: {pkg.availableSeats}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1rem' }}>
          <span className="package-price">${pkg.price}</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={onDetailsClick} 
              className="btn btn-secondary" 
              style={{ borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              Details
            </button>
            <button
              onClick={onBookClick}
              disabled={pkg.availableSeats <= 0}
              className="btn btn-primary"
              style={{ borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              {pkg.availableSeats <= 0 ? 'Full' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PackageCard;
