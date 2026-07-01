import React, { useEffect, useState } from 'react';
import { getPets, createPet, updatePet, deletePet } from '../services/petService';
import { PetCard } from '../components/PetCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';
import { Dog, Plus } from '../components/Icons';

export const Pets = ({ showFeedback }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [petForm, setPetForm] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    weight: '',
    vaccinationStatus: 'Vaccinated',
    medicalNotes: ''
  });

  // Field validation errors
  const [nameError, setNameError] = useState('');
  const [breedError, setBreedError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [weightError, setWeightError] = useState('');

  const fetchUserPets = async () => {
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error('Error fetching user pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPets();
  }, []);

  const handleDelete = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet? This will remove all their details.')) return;
    try {
      await deletePet(petId);
      showFeedback('Pet profile removed successfully', true);
      fetchUserPets();
    } catch (err) {
      showFeedback(err.message, false);
    }
  };

  const openAddModal = () => {
    setEditingPet(null);
    setPetForm({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      weight: '',
      vaccinationStatus: 'Vaccinated',
      medicalNotes: ''
    });
    setNameError('');
    setBreedError('');
    setAgeError('');
    setWeightError('');
    setPetModalOpen(true);
  };

  const openEditModal = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      vaccinationStatus: pet.vaccinationStatus,
      medicalNotes: pet.medicalNotes || ''
    });
    setNameError('');
    setBreedError('');
    setAgeError('');
    setWeightError('');
    setPetModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetForm(prev => ({ ...prev, [name]: value }));

    if (name === 'name') {
      setNameError(!value.trim() ? 'Pet name is required.' : '');
    }
    if (name === 'breed') {
      setBreedError(!value.trim() ? 'Breed is required.' : '');
    }
    if (name === 'age') {
      const val = Number(value);
      if (!value) {
        setAgeError('Age is required.');
      } else if (isNaN(val) || val < 0 || val > 30) {
        setAgeError('Please enter a valid age between 0 and 30 years.');
      } else {
        setAgeError('');
      }
    }
    if (name === 'weight') {
      const val = Number(value);
      if (!value) {
        setWeightError('Weight is required.');
      } else if (isNaN(val) || val <= 0 || val > 150) {
        setWeightError('Please enter a valid weight between 0.1 and 150 kg.');
      } else {
        setWeightError('');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!petForm.name.trim()) return setNameError('Pet name is required.');
    if (!petForm.breed.trim()) return setBreedError('Breed is required.');
    
    const ageNum = Number(petForm.age);
    if (!petForm.age || isNaN(ageNum) || ageNum < 0 || ageNum > 30) {
      return setAgeError('Enter valid age (0-30).');
    }
    
    const weightNum = Number(petForm.weight);
    if (!petForm.weight || isNaN(weightNum) || weightNum <= 0 || weightNum > 150) {
      return setWeightError('Enter valid weight (0.1-150).');
    }

    setIsSubmitting(true);
    try {
      if (editingPet) {
        await updatePet(editingPet._id, petForm);
        showFeedback('Pet profile updated successfully!', true);
      } else {
        await createPet(petForm);
        showFeedback('Pet registered successfully!', true);
      }
      setPetModalOpen(false);
      fetchUserPets();
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Checking registered companion profiles..." />;
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
              My Pets
            </h2>
            <p style={{ color: 'var(--color-gray-600)' }}>
              Register and update your pets' health details to clear international travel checklists.
            </p>
          </div>
          <button 
            onClick={openAddModal} 
            className="btn btn-primary" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '0.5rem' }}
          >
            <Plus style={{ width: '1.1rem', height: '1.1rem' }} /> Add New Pet
          </button>
        </div>

        {pets.length === 0 ? (
          <EmptyState
            icon={Dog}
            title="No pets registered yet"
            description="You must register at least one pet companion to book travel packages."
            actionLabel="Add Pet Profile"
            onAction={openAddModal}
          />
        ) : (
          <div className="grid-3-col">
            {pets.map((pet) => (
              <PetCard 
                key={pet._id} 
                pet={pet} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Pet Registration Modal */}
      <Modal
        isOpen={petModalOpen}
        onClose={() => setPetModalOpen(false)}
        title={editingPet ? `Modify Profile: ${editingPet.name}` : 'Register a New Pet'}
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pet-name">Pet Name</label>
            <input 
              type="text" 
              id="pet-name" 
              name="name" 
              value={petForm.name} 
              onChange={handleInputChange} 
              required 
              className={`form-input ${nameError ? 'form-input-error' : ''}`} 
              placeholder="e.g. Max" 
            />
            {nameError && <span className="form-error-msg">{nameError}</span>}
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            {/* Species */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pet-species">Species</label>
              <select 
                id="pet-species" 
                name="species" 
                value={petForm.species} 
                onChange={handleInputChange} 
                className="form-input"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Exotic">Exotic</option>
              </select>
            </div>

            {/* Breed */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pet-breed">Breed Name</label>
              <input 
                type="text" 
                id="pet-breed" 
                name="breed" 
                value={petForm.breed} 
                onChange={handleInputChange} 
                required 
                className={`form-input ${breedError ? 'form-input-error' : ''}`} 
                placeholder="e.g. Golden Retriever" 
              />
              {breedError && <span className="form-error-msg">{breedError}</span>}
            </div>
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            {/* Age */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pet-age">Age (Years)</label>
              <input 
                type="number" 
                id="pet-age" 
                name="age" 
                value={petForm.age} 
                onChange={handleInputChange} 
                required 
                className={`form-input ${ageError ? 'form-input-error' : ''}`} 
                placeholder="e.g. 3" 
                min="0" 
              />
              {ageError && <span className="form-error-msg">{ageError}</span>}
            </div>

            {/* Weight */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="pet-weight">Weight (kg)</label>
              <input 
                type="number" 
                id="pet-weight" 
                name="weight" 
                value={petForm.weight} 
                onChange={handleInputChange} 
                required 
                className={`form-input ${weightError ? 'form-input-error' : ''}`} 
                placeholder="e.g. 28" 
                min="0" 
                step="0.1" 
              />
              {weightError && <span className="form-error-msg">{weightError}</span>}
            </div>
          </div>

          {/* Vaccination status */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pet-vacc">Vaccination Status</label>
            <select 
              id="pet-vacc" 
              name="vaccinationStatus" 
              value={petForm.vaccinationStatus} 
              onChange={handleInputChange} 
              className="form-input"
            >
              <option value="Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          {/* Medical notes */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="pet-notes">Medical Notes / Warnings</label>
            <textarea 
              id="pet-notes" 
              name="medicalNotes" 
              value={petForm.medicalNotes} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="Enter dietary limits, health remarks, or drug warnings..." 
              rows="3" 
              style={{ resize: 'vertical' }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1.25rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => setPetModalOpen(false)} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting || !!nameError || !!breedError || !!ageError || !!weightError}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Pets;
