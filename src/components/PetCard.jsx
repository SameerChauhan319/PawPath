import React from 'react';
import { Dog, Cat, PawPrint, Edit, Trash } from './Icons';

export const PetCard = ({ pet, onEdit, onDelete }) => {
  const getAvatarIcon = () => {
    switch (pet.species) {
      case 'Dog':
        return <Dog style={{ width: '3.5rem', height: '3.5rem' }} />;
      case 'Cat':
        return <Cat style={{ width: '3.5rem', height: '3.5rem' }} />;
      default:
        return <PawPrint style={{ width: '3.5rem', height: '3.5rem' }} />;
    }
  };

  const getVaccineBadgeClass = () => {
    switch (pet.vaccinationStatus) {
      case 'Vaccinated':
        return 'badge-approved';
      case 'Partially Vaccinated':
        return 'badge-pending';
      default:
        return 'badge-rejected';
    }
  };

  return (
    <div className="pet-card">
      <div className="pet-avatar">
        {getAvatarIcon()}
      </div>
      <div className="pet-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-gray-900)' }}>
            {pet.name}
          </h3>
          <span className={`badge ${getVaccineBadgeClass()}`}>
            {pet.vaccinationStatus === 'Vaccinated' ? 'Fully Vaccinated' : pet.vaccinationStatus}
          </span>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', margin: '0.5rem 0 1rem 0' }}>
          <strong>{pet.species}</strong> • {pet.breed} • {pet.age} yrs • {pet.weight} kg
        </p>
        
        {pet.medicalNotes ? (
          <div style={{ backgroundColor: 'var(--color-gray-50)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid var(--color-gray-200)', marginBottom: '1.25rem', minHeight: '40px', color: 'var(--color-gray-700)' }}>
            <strong>Medical Notes:</strong> {pet.medicalNotes}
          </div>
        ) : (
          <div style={{ padding: '0.75rem', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1.25rem', color: 'var(--color-gray-400)' }}>
            No medical warnings or remarks registered.
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1rem' }}>
          <button 
            onClick={() => onEdit(pet)} 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Edit style={{ width: '0.85rem', height: '0.85rem' }} /> Edit
          </button>
          <button 
            onClick={() => onDelete(pet._id)} 
            className="btn btn-danger" 
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Trash style={{ width: '0.85rem', height: '0.85rem' }} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default PetCard;
