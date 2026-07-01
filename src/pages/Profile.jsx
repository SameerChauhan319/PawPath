import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/authService';
import { ButtonLoader } from '../components/LoadingSpinner';

export const Profile = ({ showFeedback }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!val.trim()) {
      setNameError('Name cannot be left empty.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!val.trim()) {
      setEmailError('Email cannot be left empty.');
    } else if (!validateEmail(val)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val && val.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Name is required.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('A valid email address is required.');
      return;
    }
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedData = await updateProfile(name, email, password);
      updateUser(
        { name: updatedData.name, email: updatedData.email, role: updatedData.role },
        updatedData.token
      );
      showFeedback('Profile updated successfully!', true);
      setPassword('');
    } catch (err) {
      showFeedback(err.message, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4" style={{ maxWidth: '600px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          User Profile
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '2.5rem' }}>
          Review and modify your personal authentication details below.
        </p>

        <div className="form-card" style={{ maxWidth: '100%' }}>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-name">Full Name</label>
              <input 
                type="text" 
                id="prof-name" 
                value={name} 
                onChange={handleNameChange}
                required 
                className={`form-input ${nameError ? 'form-input-error' : ''}`} 
              />
              {nameError && <span className="form-error-msg">{nameError}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-email">Email Address</label>
              <input 
                type="email" 
                id="prof-email" 
                value={email} 
                onChange={handleEmailChange}
                required 
                className={`form-input ${emailError ? 'form-input-error' : ''}`} 
              />
              {emailError && <span className="form-error-msg">{emailError}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-password">Change Password</label>
              <input 
                type="password" 
                id="prof-password" 
                value={password}
                onChange={handlePasswordChange}
                className={`form-input ${passwordError ? 'form-input-error' : ''}`} 
                placeholder="Leave empty to keep current password" 
              />
              {passwordError && <span className="form-error-msg">{passwordError}</span>}
            </div>

            {/* Role */}
            <div className="form-group">
              <label className="form-label">Account Privilege Role</label>
              <input 
                type="text" 
                disabled 
                className="form-input" 
                value={user?.role?.toUpperCase() || ''} 
                style={{ backgroundColor: 'var(--color-gray-100)', color: 'var(--color-gray-700)', fontWeight: 700 }} 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full" 
              style={{ padding: '0.85rem', borderRadius: '0.75rem', marginTop: '1rem' }}
              disabled={isSubmitting || !!nameError || !!emailError || !!passwordError}
            >
              {isSubmitting ? <ButtonLoader label="Saving changes..." /> : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
