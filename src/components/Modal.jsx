import React, { useEffect } from 'react';
import { X } from './Icons';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = '550px' }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    // Disable scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h3 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--color-gray-900)' }}>
            {title}
          </h3>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-gray-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem', borderRadius: '0.375rem' }}
            aria-label="Close modal dialog"
          >
            <X style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
