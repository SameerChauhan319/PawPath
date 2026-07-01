import React, { useState, useCallback } from 'react';
import { Dog, Cat, PawPrint, MapPin, Calendar, UserIcon, MessageSquare } from './Icons';

/* --- Helper: Estimate Calculations --- */
export const calculateEstimate = (formData) => {
  let basePrice = 500;
  if (formData.petType === 'Cat') basePrice += 150;
  if (formData.petType === 'Dog') basePrice += 250;
  if (formData.origin && formData.destination) {
    basePrice += 400;
  }
  return basePrice;
};

/* --- Component 1: Quick Quote Estimator (Used on Homepage) --- */
export const QuoteForm = () => {
  const [formData, setFormData] = useState({
    petType: 'Dog',
    origin: '',
    destination: '',
    date: '',
    firstName: '',
    email: ''
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [dateError, setDateError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

    if (name === 'date') {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setDateError('Departure date cannot be in the past.');
      } else {
        setDateError('');
      }
    }
  }, []);

  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;
    if (formData.origin && formData.destination && formData.date) {
      setStep(2);
    }
  };

  const handleStepTwoSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('A valid email is required.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      petType: 'Dog',
      origin: '',
      destination: '',
      date: '',
      firstName: '',
      email: ''
    });
    setStep(1);
    setSubmitSuccess(false);
    setEmailError('');
    setDateError('');
  };

  if (submitSuccess) {
    return (
      <div className="text-center" style={{ padding: '3rem 2rem', background: 'var(--color-indigo-50)', borderRadius: '1rem', borderTop: '8px solid var(--color-indigo-600)' }}>
        <div style={{ display: 'inline-block', padding: '1rem', background: 'var(--color-indigo-100)', borderRadius: '9999px', color: 'var(--color-indigo-600)', marginBottom: '1.25rem' }}>
          <PawPrint style={{ width: '2.5rem', height: '2.5rem' }} />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-gray-900)', marginBottom: '0.75rem' }}>
          Estimate Request Saved!
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
          Thanks, <strong style={{ color: 'var(--color-gray-900)' }}>{formData.firstName}</strong>! Your calculated quote estimate is ready.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
          A confirmation detailing a base rate of <strong style={{ color: 'var(--color-green-600)' }}>${calculateEstimate(formData)}</strong> has been sent to <strong>{formData.email}</strong>.
        </p>
        <button onClick={resetForm} className="btn btn-primary">
          Calculate New Route
        </button>
      </div>
    );
  }

  return (
    <div className="form-card" style={{ maxWidth: '550px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem', gap: '0.5rem' }}>
        <div style={{ width: '50%', height: '0.4rem', borderRadius: '9999px', background: step === 1 ? 'var(--color-indigo-600)' : 'var(--color-gray-200)' }}></div>
        <div style={{ width: '50%', height: '0.4rem', borderRadius: '9999px', background: step === 2 ? 'var(--color-indigo-600)' : 'var(--color-gray-200)' }}></div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleStepOneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gray-900)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Calculate Travel Estimate
          </h3>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Pet Type</label>
            <div className="pet-btn-group">
              <button type="button" className={`pet-button ${formData.petType === 'Dog' ? 'active' : ''}`} onClick={() => setFormData(prev => ({ ...prev, petType: 'Dog' }))}>
                <Dog style={{ width: '1.5rem', height: '1.5rem' }} /> Dog
              </button>
              <button type="button" className={`pet-button ${formData.petType === 'Cat' ? 'active' : ''}`} onClick={() => setFormData(prev => ({ ...prev, petType: 'Cat' }))}>
                <Cat style={{ width: '1.5rem', height: '1.5rem' }} /> Cat
              </button>
              <button type="button" className={`pet-button ${formData.petType === 'Exotic' ? 'active' : ''}`} onClick={() => setFormData(prev => ({ ...prev, petType: 'Exotic' }))}>
                <PawPrint style={{ width: '1.5rem', height: '1.5rem' }} /> Other
              </button>
            </div>
          </div>

          <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="origin" className="form-label">
                <MapPin style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: 'var(--color-red-500)' }} /> Departure
              </label>
              <input
                type="text" id="origin" name="origin" value={formData.origin} onChange={handleChange}
                placeholder="e.g. London, UK" required className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="destination" className="form-label">
                <MapPin style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: 'var(--color-green-500)' }} /> Arrival
              </label>
              <input
                type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange}
                placeholder="e.g. New York, USA" required className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '0.5rem' }}>
            <label htmlFor="date" className="form-label">
              <Calendar style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: 'var(--color-indigo-500)' }} /> Departure Date
            </label>
            <input
              type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
              className={`form-input ${dateError ? 'form-input-error' : ''}`}
            />
            {dateError && <span className="form-error-msg">{dateError}</span>}
          </div>

          <button
            type="submit"
            disabled={!!dateError}
            className="btn btn-primary w-full"
            style={{ borderRadius: '0.75rem', padding: '0.85rem' }}
          >
            Continue to Contact Details
          </button>
        </form>
      ) : (
        <form onSubmit={handleStepTwoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gray-900)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Enter Contact Information
          </h3>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="firstName" className="form-label">
              <UserIcon style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: 'var(--color-indigo-500)' }} /> Name
            </label>
            <input
              type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
              placeholder="e.g. Jane Doe" required className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="email" className="form-label">
              <MessageSquare style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: 'var(--color-indigo-500)' }} /> Email Address
            </label>
            <input
              type="email" id="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="jane@example.com" required 
              className={`form-input ${emailError ? 'form-input-error' : ''}`}
            />
            {emailError && <span className="form-error-msg">{emailError}</span>}
          </div>

          <div className="quote-display" style={{ marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-green-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Base Price Quote
            </span>
            <div className="quote-amount">${calculateEstimate(formData)}</div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-green-600)' }}>
              Covers climate-controlled boarding, veterinary checklist validation, and tracking setup.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn btn-back"
              style={{ width: '30%', borderRadius: '0.75rem' }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !!emailError}
              className="btn btn-confirm"
              style={{ width: '70%', borderRadius: '0.75rem' }}
            >
              {isSubmitting ? 'Submitting...' : 'Request Quotation Call'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

/* --- Component 2: Package Booking Form (Used in Book Modal) --- */
export const PackageBookingForm = ({ pkg, pets, onSubmit, isSubmitting }) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?._id || '');
  const [travelDate, setTravelDate] = useState('');
  const [dateError, setDateError] = useState('');

  const handleDateChange = (e) => {
    const val = e.target.value;
    setTravelDate(val);
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setDateError('Booking failed because the selected date is in the past.');
    } else {
      setDateError('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dateError) return;
    onSubmit({
      petId: selectedPetId,
      travelDate
    });
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-600)' }}>
        Booking relocation for <strong>{pkg.destination}</strong>. Package price: <strong style={{ color: 'var(--color-indigo-600)' }}>${pkg.price}</strong>.
      </p>

      {pets.length === 0 ? (
        <div style={{ padding: '1rem', backgroundColor: 'var(--color-red-50)', color: 'var(--color-red-600)', borderRadius: '0.5rem', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          No pets registered. Please close this window, go to <strong>My Pets</strong>, and register your pet first.
        </div>
      ) : (
        <>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="booking-pet-select">Select Pet</label>
            <select 
              id="booking-pet-select"
              value={selectedPetId} 
              onChange={(e) => setSelectedPetId(e.target.value)} 
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
              value={travelDate} 
              onChange={handleDateChange} 
              required 
              className={`form-input ${dateError ? 'form-input-error' : ''}`} 
            />
            {dateError && <span className="form-error-msg">{dateError}</span>}
          </div>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <button 
          type="submit" 
          disabled={pets.length === 0 || !selectedPetId || !travelDate || !!dateError || isSubmitting} 
          className="btn btn-primary" 
          style={{ borderRadius: '0.5rem', padding: '0.6rem 1.5rem' }}
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};
