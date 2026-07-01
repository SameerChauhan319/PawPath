import React from 'react';
import { PawPrint } from './Icons';

export const EmptyState = ({ 
  icon: Icon = PawPrint, 
  title = 'No records found', 
  description = 'There are no items to display right now.', 
  actionLabel, 
  onAction 
}) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem', 
      backgroundColor: 'var(--color-white)', 
      borderRadius: '1rem', 
      border: '1px solid var(--color-gray-200)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '4rem', 
        height: '4rem', 
        borderRadius: '50%', 
        backgroundColor: 'var(--color-indigo-50)', 
        color: 'var(--color-indigo-600)',
        marginBottom: '0.5rem'
      }}>
        <Icon style={{ width: '2rem', height: '2rem' }} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gray-900)', margin: 0 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)', margin: 0, maxWidth: '400px', lineHeight: '1.5' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction} 
          className="btn btn-primary" 
          style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
