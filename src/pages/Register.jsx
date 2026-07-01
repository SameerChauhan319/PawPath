import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/authService';
import { ButtonLoader } from '../components/LoadingSpinner';

export const Register = ({ setView, showFeedback }) => {
  const { login: setSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
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
      setNameError('Full name is required.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!val.trim()) {
      setEmailError('Email is required.');
    } else if (!validateEmail(val)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (!val) {
      setPasswordError('Password is required.');
    } else if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Full name is required.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('A valid email address is required.');
      return;
    }
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await register(name, email, password, role);
      setSession(response.token, { name: response.name, email: response.email, role: response.role });
      setView('home');
      showFeedback('Account created successfully!', true);
    } catch (err) {
      showFeedback(err.message || 'Registration failed.', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="form-card">
        <h2 className="text-center" style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          Join PawPaths
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input 
              type="text" 
              id="reg-name" 
              value={name}
              onChange={handleNameChange}
              required 
              className={`form-input ${nameError ? 'form-input-error' : ''}`} 
              placeholder="e.g. John Doe" 
            />
            {nameError && <span className="form-error-msg">{nameError}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input 
              type="email" 
              id="reg-email" 
              value={email}
              onChange={handleEmailChange}
              required 
              className={`form-input ${emailError ? 'form-input-error' : ''}`} 
              placeholder="john@example.com" 
            />
            {emailError && <span className="form-error-msg">{emailError}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input 
              type="password" 
              id="reg-password" 
              value={password}
              onChange={handlePasswordChange}
              required 
              className={`form-input ${passwordError ? 'form-input-error' : ''}`} 
              placeholder="Min 6 characters" 
            />
            {passwordError && <span className="form-error-msg">{passwordError}</span>}
          </div>

          {/* Role */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-role">Account Type</label>
            <select 
              id="reg-role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required 
              className="form-input"
            >
              <option value="user">Regular User (Book Travel)</option>
              <option value="admin">Administrator (Manage Platform)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            style={{ padding: '0.85rem', borderRadius: '0.75rem', marginTop: '1rem' }}
            disabled={isSubmitting || !!nameError || !!emailError || !!passwordError}
          >
            {isSubmitting ? <ButtonLoader label="Creating account..." /> : 'Register Account'}
          </button>
        </form>
        
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-600)', textAlign: 'center' }}>
          Already registered?{' '}
          <span 
            onClick={() => setView('login')} 
            style={{ color: 'var(--color-indigo-600)', fontWeight: 600, cursor: 'pointer' }}
          >
            Sign In instead
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
