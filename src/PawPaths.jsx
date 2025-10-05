import React, { useState, useCallback, useMemo } from 'react';
// Removed lucide-react import, icons are now defined as functional components below

// --- SVG Icon Components ---
// Defined as components so they can be passed as props, replacing lucide-react
const Plane = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 17.8 22 22l-4.2-4.2Zm-8.4 0L2 22l7.4-7.4Zm8.4-8.4L22 2l-4.2 4.2Zm-8.4-8.4L2 2l7.4 7.4Z"/><path d="m14 14-2 6-4-4 6-2 6-2-4-4Z"/></svg>
);
const PawPrint = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M12.4 20.4l-2.8 0.4c-1 0.2-2-0.4-2.2-1.4l-0.4-2.8c-0.2-1 0.4-2 1.4-2.2l2.8-0.4c1-0.2 2 0.4 2.2 1.4l0.4 2.8c0.2 1-0.4 2-1.4 2.2Z"/><path d="M9.8 17.2l0.4 2.8c0.2 1-0.4 2-1.4 2.2l-2.8 0.4c-1 0.2-2-0.4-2.2-1.4l-0.4-2.8c-0.2-1 0.4-2 1.4-2.2l2.8-0.4c1-0.2 2 0.4 2.2 1.4Z"/><path d="M14.6 15.4l2.8-0.4c1-0.2 2 0.4 2.2 1.4l0.4 2.8c0.2 1-0.4 2-1.4 2.2l-2.8 0.4c-1 0.2-2-0.4-2.2-1.4l-0.4-2.8c-0.2-1 0.4-2 1.4-2.2Z"/><path d="M16.8 11.6l0.4 2.8c0.2 1-0.4 2-1.4 2.2l-2.8 0.4c-1 0.2-2-0.4-2.2-1.4l-0.4-2.8c-0.2-1 0.4-2 1.4-2.2l2.8-0.4c1-0.2 2 0.4 2.2 1.4Z"/></svg>
);
const MapPin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12z"/><circle cx="12" cy="10" r="3"/></svg>
);
const Calendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const Dog = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5a2 2 0 0 1 4 0v1h-4V5z"/><path d="M8 8.4V7h8v1.4a2 2 0 0 0-2 2v2.8a2 2 0 0 1-4 0V10.4a2 2 0 0 0-2-2z"/><path d="M16 16c0 4-2 6-6 6s-6-2-6-6h12z"/><path d="M18 10a2 2 0 0 0 2-2V7h-4v1a2 2 0 0 0 2 2z"/></svg>
);
const Cat = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s8-5 8-10c0-4-4-8-8-8s-8 4-8 8c0 5 8 10 8 10z"/><path d="M10 4a3 3 0 0 1 4 0"/><path d="M14.5 10.5l-5 5"/><path d="M9.5 10.5l5 5"/></svg>
);
const MessageSquare = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const Briefcase = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const User = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

// Define CSS variables as constants for use in JSX inline styles
const VARS = {
    '--color-indigo-600': '#4f46e5',
    '--color-indigo-700': '#4338ca',
    '--color-indigo-500': '#6366f1',
    '--color-indigo-100': '#eef2ff',
    '--color-indigo-50': '#f5f3ff',
    '--color-green-600': '#10b981',
    '--color-green-700': '#047857',
    '--color-green-500': '#34d399',
    '--color-green-50': '#ecfdf5',
    '--color-red-500': '#ef4444',
    '--color-gray-900': '#111827',
    '--color-gray-800': '#1f2937',
    '--color-gray-700': '#374151',
    '--color-gray-600': '#4b5563',
    '--color-gray-50': '#f9fafb',
    '--color-white': '#ffffff',
    '--color-indigo-400': '#818cf8',
};

// --- Shared Components & Utilities ---

// The GlobalStyles component holds all the CSS, ensuring no external files are needed.
const GlobalStyles = () => (
  <style>
    {`
        /* --- CSS Variables for Easy Theming --- */
        :root {
            --color-indigo-600: ${VARS['--color-indigo-600']};
            --color-indigo-700: ${VARS['--color-indigo-700']};
            --color-indigo-500: ${VARS['--color-indigo-500']};
            --color-indigo-100: ${VARS['--color-indigo-100']};
            --color-indigo-50: ${VARS['--color-indigo-50']};
            --color-green-600: ${VARS['--color-green-600']};
            --color-green-700: ${VARS['--color-green-700']};
            --color-green-500: ${VARS['--color-green-500']};
            --color-green-50: ${VARS['--color-green-50']};
            --color-red-500: ${VARS['--color-red-500']};
            --color-gray-900: ${VARS['--color-gray-900']};
            --color-gray-800: ${VARS['--color-gray-800']};
            --color-gray-700: ${VARS['--color-gray-700']};
            --color-gray-600: ${VARS['--color-gray-600']};
            --color-gray-50: ${VARS['--color-gray-50']};
            --color-white: ${VARS['--color-white']};
            --color-indigo-400: ${VARS['--color-indigo-400']};
        }

        .app-container {
            min-height: 100vh;
            background-color: var(--color-gray-50);
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .max-w-7xl { max-width: 1280px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        .text-center { text-align: center; }
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .shadow-2xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .w-full { width: 100%; }
        .transition { transition: all 0.3s ease; }

        /* --- Header --- */
        .header {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(4px);
            position: sticky;
            top: 0;
            z-index: 50;
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { display: flex; align-items: center; gap: 0.5rem; color: var(--color-indigo-600); }
        .logo-text { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.025em; }
        .logo-icon { fill: var(--color-indigo-500); }
        .nav-link { color: var(--color-gray-600); font-weight: 500; text-decoration: none; }
        .nav-link:hover { color: var(--color-indigo-600); }

        /* --- Hero Section --- */
        .hero-section {
            background: linear-gradient(to bottom right, var(--color-indigo-100), var(--color-white));
            padding: 4rem 0 5rem 0;
        }
        .hero-title { font-size: 2.25rem; font-weight: 800; color: var(--color-gray-900); line-height: 1.2; }
        .hero-subtitle { margin-top: 1rem; font-size: 1.25rem; color: var(--color-indigo-700); font-weight: 500; }
        .hero-cta-container { margin-top: 2rem; display: flex; justify-content: center; gap: 1rem; }

        /* --- Buttons --- */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-primary {
            background-color: var(--color-indigo-600);
            color: var(--color-white);
            border: 1px solid transparent;
        }
        .btn-primary:hover { background-color: var(--color-indigo-700); transform: translateY(-2px); }
        .btn-secondary {
            background-color: var(--color-white);
            color: var(--color-indigo-700);
            border: 1px solid var(--color-indigo-600);
        }
        .btn-secondary:hover { background-color: var(--color-indigo-50); }
        .btn-confirm { background-color: var(--color-green-600); color: var(--color-white); border: none; }
        .btn-confirm:hover:not(:disabled) { background-color: var(--color-green-700); }
        .btn-confirm:disabled { background-color: #90f0c0; cursor: not-allowed; }
        .btn-back { color: var(--color-indigo-600); border: 1px solid var(--color-indigo-600); background: var(--color-white); }
        .btn-back:hover { background-color: var(--color-indigo-50); }

        /* --- Forms and Cards --- */
        .form-card {
            width: 100%;
            max-width: 576px;
            margin-left: auto;
            margin-right: auto;
            background-color: var(--color-white);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-size: 0.875rem; font-weight: 500; color: var(--color-gray-700); margin-bottom: 0.5rem; display: flex; align-items: center; }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            transition: all 0.15s;
        }
        .form-input:focus { outline: none; border-color: var(--color-indigo-500); box-shadow: 0 0 0 1px var(--color-indigo-500); }
        
        /* Pet Type Buttons */
        .pet-btn-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .pet-button {
            display: flex; align-items: center; justify-content: center; width: 100%; padding: 1rem;
            border-radius: 0.75rem; border: 2px solid var(--color-indigo-200); font-weight: 600;
            transition: all 0.2s; background-color: var(--color-indigo-50); color: var(--color-indigo-700);
        }
        .pet-button.active {
            background-color: var(--color-indigo-600); color: var(--color-white);
            border-color: var(--color-indigo-700); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Quote Display */
        .quote-display {
            padding: 2rem; background-color: var(--color-green-50); border-radius: 0.75rem;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); border-top: 8px solid var(--color-green-500);
            margin-top: 1.5rem;
        }
        .quote-amount { font-size: 3rem; font-weight: 800; color: var(--color-green-600); }
        .details-box { padding: 1rem; background-color: var(--color-white); border-radius: 0.5rem; border: 1px solid #e5e7eb; }

        /* Features */
        .section-title { font-size: 2.25rem; font-weight: 800; color: var(--color-gray-900); margin-bottom: 2.5rem; }
        .features-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 2rem; }
        .feature-card {
            background-color: var(--color-white); padding: 1.5rem; border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); transition: all 0.3s;
            border-top: 4px solid var(--color-indigo-400);
        }
        .feature-card:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); transform: scale(1.02); }
        .feature-icon-box {
            display: flex; align-items: center; justify-content: center; height: 3rem; width: 3rem;
            border-radius: 9999px; background-color: var(--color-indigo-100); color: var(--color-indigo-600);
            margin-bottom: 1rem;
        }

        /* Footer */
        .footer { background-color: var(--color-gray-800); color: var(--color-white); margin-top: 3rem; }
        .footer-content {
            display: flex; flex-direction: column; justify-content: space-between; align-items: center;
            padding: 2.5rem 0; gap: 1rem;
        }

        /* --- Responsiveness (Media Queries) --- */
        @media (min-width: 640px) { /* sm breakpoint */
            .px-sm { padding-left: 1.5rem; padding-right: 1.5rem; }
            .hero-title { font-size: 3rem; }
            .grid-sm-2-col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
        @media (min-width: 768px) { /* md breakpoint */
            .hero-title { font-size: 4rem; }
            .features-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-content { flex-direction: row; }
        }
        @media (min-width: 1024px) { /* lg breakpoint */
            .features-grid { grid-template-columns: repeat(4, 1fr); }
            .px-lg { padding-left: 2rem; padding-right: 2rem; }
        }
    `}
  </style>
);

const PawPathsHeader = () => (
  <header className="header">
    <div className="header-content max-w-7xl mx-auto px-4 px-sm px-lg">
      <div className="logo">
        <PawPrint className="w-8 h-8 logo-icon" />
        <span className="logo-text">PawPaths</span>
      </div>
      <nav className="hidden sm:block">
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#quote" className="nav-link">Get Quote</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>
      {/* Mobile Menu Icon */}
      <button className="sm:hidden" style={{ padding: '0.5rem', color: VARS['--color-indigo-600'], background: VARS['--color-indigo-50'], borderRadius: '9999px', border: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </header>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-box">
      <Icon style={{ width: '1.5rem', height: '1.5rem' }} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: VARS['--color-gray-900'], marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: VARS['--color-gray-600'] }}>{description}</p>
  </div>
);

const SectionTitle = ({ id, children }) => (
  <h2 id={id} className="section-title text-center">
    {children}
  </h2>
);

// --- Booking Form Logic and State ---

const initialState = {
  petType: 'Dog',
  origin: '',
  destination: '',
  date: new Date().toISOString().substring(0, 10),
  firstName: '',
  email: '',
};

const PetTypeButton = ({ type, currentType, Icon, onClick }) => (
    <button
        type="button"
        onClick={() => onClick(type)}
        className={`pet-button ${currentType === type ? 'active' : ''}`}
    >
        <Icon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
        {type}
    </button>
);

const QuoteDisplay = ({ formData }) => {
    const calculateEstimate = () => {
        let baseCost = 1500;
        let factor = 1;

        if (formData.petType === 'Dog') factor = 1.2;
        if (formData.petType === 'Cat') factor = 1.0;
        if (formData.petType === 'Exotic') factor = 1.5;

        // Simple distance proxy based on location length
        const distanceProxy = (formData.origin.length + formData.destination.length) / 10;
        const finalEstimate = Math.round(baseCost * factor * (1 + distanceProxy * 0.1));
        return finalEstimate;
    };

    const quoteAmount = useMemo(() => calculateEstimate(), [formData]);

    return (
        <div className="quote-display">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: VARS['--color-green-700'], marginBottom: '1rem' }} className="flex-center">
                <Plane style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} /> Estimated Quote
            </h3>
            <div className="text-center" style={{ margin: '1.5rem 0' }}>
                <span className="quote-amount">${quoteAmount}</span>
                <p style={{ fontSize: '1.125rem', color: VARS['--color-gray-600'], marginTop: '0.5rem' }}>(Final price may vary)</p>
            </div>

            <div className="details-box" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ fontWeight: '600', color: VARS['--color-gray-800'] }}>Your Travel Details:</h4>
                <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-700'] }}>
                    <MapPin style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> From: <span style={{ fontWeight: '500' }}>{formData.origin}</span>
                </p>
                <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-700'] }}>
                    <MapPin style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> To: <span style={{ fontWeight: '500' }}>{formData.destination}</span>
                </p>
                <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-700'] }}>
                    <Dog style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Pet Type: <span style={{ fontWeight: '500' }}>{formData.petType}</span>
                </p>
                <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-700'] }}>
                    <Calendar style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Date: <span style={{ fontWeight: '500' }}>{formData.date}</span>
                </p>
            </div>

            <p className="text-center" style={{ color: VARS['--color-gray-600'], marginTop: '1.5rem' }}>
                A PawPaths agent will contact <span style={{ fontWeight: '600' }}>{formData.firstName}</span> at <span style={{ fontWeight: '600' }}>{formData.email}</span> within 24 hours to finalize your itinerary.
            </p>
        </div>
    );
};

const QuoteForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState(''); // New state for email error

  const validateEmail = (email) => {
    // Basic email regex pattern
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time email validation feedback
    if (name === 'email') {
        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }
  }, []);

  const handlePetTypeChange = useCallback((type) => {
    setFormData(prev => ({ ...prev, petType: type }));
  }, []);

  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    if (formData.origin && formData.destination) {
      setStep(2);
    } else {
      // Custom Error Message (replaces alert)
      document.getElementById('step-one-error').textContent = 'Please fill in both origin and destination.';
      setTimeout(() => document.getElementById('step-one-error').textContent = '', 3000);
    }
  };

  const handleStepTwoSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
        setEmailError('A valid email is required to submit the quote.');
        return;
    }
    
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // In a real app, you would send formData to a backend/database here
        console.log('Quote Request Submitted:', formData);
    }, 1500);
  };

  const resetForm = () => {
      setFormData(initialState);
      setStep(1);
      setSubmitSuccess(false);
      setEmailError('');
  }

  const StepOne = (
    <form onSubmit={handleStepOneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: VARS['--color-gray-800'], textAlign: 'center', marginBottom: '1rem' }}>1. Tell Us About Your Pet's Journey</h3>
        
        <div className="form-group">
            <label className="form-label">Pet Type</label>
            <div className="pet-btn-group">
                <PetTypeButton type="Dog" currentType={formData.petType} Icon={Dog} onClick={handlePetTypeChange} />
                <PetTypeButton type="Cat" currentType={formData.petType} Icon={Cat} onClick={handlePetTypeChange} />
                <PetTypeButton type="Exotic" currentType={formData.petType} Icon={PawPrint} onClick={handlePetTypeChange} />
            </div>
        </div>

        <div className="grid-sm-2-col" style={{ gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="origin" className="form-label">
                    <MapPin style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-red-500'] }} /> Origin
                </label>
                <input
                    type="text" id="origin" name="origin" value={formData.origin} onChange={handleChange}
                    placeholder="e.g., London, UK" required className="form-input"
                />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="destination" className="form-label">
                    <MapPin style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-green-500'] }} /> Destination
                </label>
                <input
                    type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange}
                    placeholder="e.g., New York, USA" required className="form-input"
                />
            </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="date" className="form-label">
                <Calendar style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Preferred Travel Date
            </label>
            <input
                type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
                className="form-input"
            />
        </div>
        
        <div id="step-one-error" style={{ color: VARS['--color-red-500'], fontSize: '0.875rem', fontWeight: '500', textAlign: 'center', height: '1.25rem' }}></div>

        <button
            type="submit"
            className="btn btn-primary w-full"
            style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', textTransform: 'uppercase' }}
        >
            Continue to Contact Details
        </button>
    </form>
  );

  const StepTwo = (
    <form onSubmit={handleStepTwoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: VARS['--color-gray-800'], textAlign: 'center', marginBottom: '1rem' }}>2. Your Contact Information</h3>

        <div className="form-group">
            <label htmlFor="firstName" className="form-label">
                <User style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Your Name
            </label>
            <input
                type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                placeholder="First Name" required className="form-input"
            />
        </div>

        <div className="form-group">
            <label htmlFor="email" className="form-label">
                <MessageSquare style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Email Address
            </label>
            <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="you@example.com" required className="form-input"
                // Conditional styling for error state
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: emailError ? `1px solid ${VARS['--color-red-500']}` : '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    transition: 'all 0.15s',
                }}
            />
             {/* Display email error message */}
            <div style={{ color: VARS['--color-red-500'], fontSize: '0.75rem', fontWeight: '500', marginTop: '0.25rem', height: '1.25rem' }}>
                {emailError}
            </div>
        </div>

        <QuoteDisplay formData={formData} />

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1rem' }}>
            <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-back"
                style={{ width: '33.33%', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}
            >
                Back
            </button>
            <button
                type="submit"
                disabled={isSubmitting || !!emailError}
                className="btn btn-confirm"
                style={{ width: '66.66%', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}
            >
                {isSubmitting ? 'Sending Request...' : 'Confirm & Request Call'}
            </button>
        </div>
    </form>
  );

  if (submitSuccess) {
    return (
        <div style={{ padding: '2rem', textAlign: 'center', background: VARS['--color-indigo-50'], borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderTop: '8px solid var(--color-indigo-600)' }}>
            <div style={{ display: 'inline-block', padding: '1rem', background: VARS['--color-indigo-100'], borderRadius: '9999px', color: VARS['--color-indigo-600'], marginBottom: '1.5rem' }}>
                <PawPrint style={{ width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: VARS['--color-gray-800'], marginBottom: '0.75rem' }}>
                Request Sent Successfully!
            </h3>
            <p style={{ fontSize: '1.125rem', color: VARS['--color-gray-600'], marginBottom: '1.5rem' }}>
                Thank you, <span style={{ fontWeight: '600' }}>{formData.firstName}</span>! Your pet's path is being planned.
            </p>
            <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-500'], marginBottom: '2rem' }}>
                We have emailed a summary of your quote request to <span style={{ fontWeight: '500', color: VARS['--color-indigo-600'] }}>{formData.email}</span>.
            </p>
            <button
                onClick={resetForm}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem' }}
            >
                Start Another Quote
            </button>
        </div>
    )
  }

  return (
    <div className="form-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
            <div style={{ width: '50%', height: '0.5rem', borderRadius: '9999px', background: step === 1 ? VARS['--color-indigo-600'] : '#e5e7eb' }}></div>
            <div style={{ width: '50%', height: '0.5rem', borderRadius: '9999px', background: step === 2 ? VARS['--color-indigo-600'] : '#e5e7eb' }}></div>
        </div>
        {step === 1 ? StepOne : StepTwo}
    </div>
  );
};


// --- Main Application Component ---
const PawPathsApp = () => {
  return (
    <div className="app-container">
      {/* Inject all custom CSS here */}
      <GlobalStyles />
      <PawPathsHeader />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="max-w-7xl mx-auto px-4 px-sm px-lg text-center">
            <h1 className="hero-title">
                The Safest Path for Your Furry Friend
            </h1>
            <p className="hero-subtitle">
                Global Pet Travel Logistics by <span style={{ fontWeight: '700', color: VARS['--color-gray-800'] }}>PawPaths</span>
            </p>
            <div className="hero-cta-container">
                <a href="#quote" className="btn btn-primary">
                    <Plane style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Get a Free Quote
                </a>
                <a href="#services" className="btn btn-secondary">
                    <Briefcase style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Our Services
                </a>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="quote" className="py-16 py-24" style={{ background: VARS['--color-gray-50'] }}>
          <div className="max-w-7xl mx-auto px-4 px-sm px-lg">
            <SectionTitle>
                Plan Your Pet's Journey
            </SectionTitle>
            <QuoteForm />
          </div>
        </section>

        {/* Features Section */}
        <section id="services" className="py-16 py-24" style={{ background: VARS['--color-white'] }}>
          <div className="max-w-7xl mx-auto px-4 px-sm px-lg">
            <SectionTitle>
                Why Choose PawPaths?
            </SectionTitle>
            <div className="features-grid">
              <FeatureCard
                icon={Plane}
                title="Door-to-Door Service"
                description="We handle all logistics, from pickup at your current home to drop-off at your destination."
              />
              <FeatureCard
                icon={Briefcase}
                title="Vet & Documentation"
                description="Our experts manage all required vet checks, permits, and complex international paperwork."
              />
              <FeatureCard
                icon={Dog}
                title="Comfort Travel"
                description="Only approved, pet-safe airlines and premium, climate-controlled ground transport are used."
              />
              <FeatureCard
                icon={MessageSquare}
                title="24/7 Support"
                description="Dedicated travel coordinators provide real-time updates and support throughout the entire journey."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content max-w-7xl mx-auto px-4 px-sm px-lg">
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ justifyContent: 'center', color: VARS['--color-white'] }}>
                <PawPrint style={{ width: '1.5rem', height: '1.5rem', fill: VARS['--color-indigo-400'] }} />
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>PawPaths</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-400'] }}>Your trusted partner in pet relocation.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>Contact Us:</p>
            <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-400'] }}>Email: info@pawpaths.com</p>
            <p style={{ fontSize: '0.875rem', color: VARS['--color-gray-400'] }}>Phone: +1 (555) PET-MOVE</p>
          </div>
        </div>
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #374151', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: VARS['--color-gray-500'], paddingBottom: '1rem' }}>&copy; {new Date().getFullYear()} PawPaths. All rights reserved. | Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default PawPathsApp;
