import React, { useEffect, useState } from 'react';
import { getPets } from '../services/petService';
import { createBooking } from '../services/bookingService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Briefcase, Dog } from '../components/Icons';

export const Booking = ({ selectedPkg, setView, showFeedback }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingPetId, setBookingPetId] = useState('');
  const [bookingTravelDate, setBookingTravelDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (!selectedPkg) {
      setLoading(false);
      return;
    }

    const fetchUserPets = async () => {
      try {
        const petList = await getPets();
        setPets(petList);
        if (petList.length > 0) {
          setBookingPetId(petList[0]._id);
        }
      } catch (err) {
        console.error('Error fetching pets for booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, [selectedPkg]);

  const handleDateChange = (e) => {
    const val = e.target.value;
    setBookingTravelDate(val);
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setDateError('Selected date cannot be in the past.');
    } else {
      setDateError('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!bookingPetId) {
      showFeedback('Please select a registered pet to travel.', false);
      return;
    }
    if (!bookingTravelDate || dateError) {
      showFeedback('Please select a valid future departure date.', false);
      return;
    }

    setIsSubmitting(true);
    try {
      await createBooking(selectedPkg._id, bookingPetId, bookingTravelDate);
      showFeedback('Booking request submitted! Awaiting administrator approval.', true);
      setView('bookings');
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPkg) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No travel package selected"
        description="Please browse available relocation routes and choose a destination package first."
        actionLabel="Browse Packages"
        onAction={() => setView('packages')}
      />
    );
  }

  if (loading) {
    return <LoadingSpinner message="Validating booking prerequisites..." />;
  }

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4" style={{ maxWidth: '650px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          Finalize Booking
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '2.5rem' }}>
          Verify your itinerary details and register your pet's relocation.
        </p>

        <div className="form-card" style={{ maxWidth: '100%' }}>
          <div style={{ borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--color-gray-900)' }}>
              {selectedPkg.destination}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-gray-600)' }}>
              <span className="badge badge-approved" style={{ border: 'none' }}>{selectedPkg.transportType}</span>
              <span className="badge badge-paid" style={{ border: 'none' }}>Allows size: {selectedPkg.petSizeAllowed}</span>
              <span className="badge badge-pending" style={{ border: 'none' }}>Remaining Seats: {selectedPkg.availableSeats}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', marginTop: '1rem', lineHeight: '1.4' }}>
              {selectedPkg.description}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {pets.length === 0 ? (
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-red-50)', color: 'var(--color-red-600)', borderRadius: '0.75rem', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                You have no pets registered. Please register a pet first.
                <button 
                  type="button" 
                  onClick={() => setView('pets')} 
                  className="btn btn-secondary w-full" 
                  style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                >
                  <Dog style={{ width: '1.1rem', height: '1.1rem' }} /> Add Pet Profile
                </button>
              </div>
            ) : (
              <>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="booking-pet-select">Select Travel Companion</label>
                  <select 
                    id="booking-pet-select"
                    value={bookingPetId} 
                    onChange={(e) => setBookingPetId(e.target.value)} 
                    required 
                    className="form-input"
                  >
                    <option value="">-- Choose registered pet --</option>
                    {pets.map(p => (
                      <option key={p._id} value={p._id}>{p.name} ({p.species} • {p.weight}kg)</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="booking-travel-date">Departure Date</label>
                  <input 
                    type="date" 
                    id="booking-travel-date"
                    min={new Date().toISOString().substring(0, 10)}
                    value={bookingTravelDate} 
                    onChange={handleDateChange} 
                    required 
                    className={`form-input ${dateError ? 'form-input-error' : ''}`} 
                  />
                  {dateError && <span className="form-error-msg">{dateError}</span>}
                </div>
              </>
            )}

            <div className="quote-display" style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-green-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Relocation Ticket Price
              </span>
              <div className="quote-amount" style={{ fontSize: '2.5rem' }}>${selectedPkg.price}</div>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-green-600)' }}>
                Includes transit monitoring, vet document checks, and custom travel crate spacing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--color-gray-100)', paddingTop: '1.5rem' }}>
              <button 
                type="button" 
                onClick={() => setView('packages')} 
                className="btn btn-secondary" 
                style={{ width: '35%', borderRadius: '0.75rem' }}
              >
                Change Route
              </button>
              <button 
                type="submit" 
                disabled={pets.length === 0 || !bookingPetId || !bookingTravelDate || !!dateError || isSubmitting} 
                className="btn btn-primary" 
                style={{ width: '65%', borderRadius: '0.75rem' }}
              >
                {isSubmitting ? 'Confirming Itinerary...' : 'Confirm Book Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
