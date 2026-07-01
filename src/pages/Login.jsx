import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import { ButtonLoader } from '../components/LoadingSpinner';

export const Login = ({ setView, showFeedback }) => {
  const { login: setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field Errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
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
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setEmailError('A valid email address is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await login(email, password);
      setSession(response.token, { name: response.name, email: response.email, role: response.role });
      setView('home');
      showFeedback('Logged in successfully!', true);
    } catch (err) {
      showFeedback(err.message || 'Invalid email or password credentials.', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="form-card">
        <h2 className="text-center" style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          Sign In to PawPaths
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              value={email}
              onChange={handleEmailChange}
              required 
              className={`form-input ${emailError ? 'form-input-error' : ''}`} 
              placeholder="e.g. user@pawpaths.com" 
            />
            {emailError && <span className="form-error-msg">{emailError}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input 
              type="password" 
              id="login-password" 
              value={password}
              onChange={handlePasswordChange}
              required 
              className={`form-input ${passwordError ? 'form-input-error' : ''}`} 
              placeholder="••••••••" 
            />
            {passwordError && <span className="form-error-msg">{passwordError}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            style={{ padding: '0.85rem', borderRadius: '0.75rem', marginTop: '1rem' }}
            disabled={isSubmitting || !!emailError || !!passwordError}
          >
            {isSubmitting ? <ButtonLoader label="Verifying session..." /> : 'Sign In'}
          </button>
        </form>
        
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-600)', textAlign: 'center' }}>
          Don't have an account?{' '}
          <span 
            onClick={() => setView('register')} 
            style={{ color: 'var(--color-indigo-600)', fontWeight: 600, cursor: 'pointer' }}
          >
            Create one here
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
