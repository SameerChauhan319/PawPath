import React from 'react';
import { PawPrint } from './Icons';

/* --- Spinner Component --- */
export const LoadingSpinner = ({ message = 'Loading details...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <PawPrint 
        className="animate-spin" 
        style={{ width: '3rem', height: '3rem', color: 'var(--color-indigo-600)', marginBottom: '1rem' }} 
      />
      <p style={{ fontSize: '0.95rem', color: 'var(--color-gray-600)', fontWeight: 500 }}>{message}</p>
    </div>
  );
};

/* --- Button Loading Animation Component --- */
export const ButtonLoader = ({ label = 'Processing...' }) => {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <svg className="animate-spin" style={{ width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
      </svg>
      {label}
    </span>
  );
};

/* --- Skeleton Card Component --- */
export const SkeletonCard = () => {
  return (
    <div className="package-card animate-pulse" style={{ pointerEvents: 'none' }}>
      <div className="skeleton skeleton-image"></div>
      <div className="package-content" style={{ gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton skeleton-text" style={{ width: '20%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '15%' }}></div>
        </div>
        <div className="skeleton skeleton-title" style={{ marginTop: '0.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
        <div className="package-meta" style={{ margin: '1rem 0' }}>
          <div className="skeleton skeleton-text" style={{ width: '25%', height: '1.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '25%', height: '1.5rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '25%', height: '1.5rem' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <div className="skeleton skeleton-text" style={{ width: '30%', height: '2rem' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '40%', height: '2rem' }}></div>
        </div>
      </div>
    </div>
  );
};

/* --- Skeleton Grid Loader --- */
export const SkeletonGrid = ({ count = 3 }) => {
  return (
    <div className="grid-3-col">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export default LoadingSpinner;
