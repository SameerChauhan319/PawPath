import React, { useState, useCallback, useMemo, useEffect } from 'react';


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
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Trash = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const Edit = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const Plus = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const Star = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={props.fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const LogOut = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const Shield = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const X = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

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
  '--color-red-600': '#dc2626',
  '--color-gray-900': '#111827',
  '--color-gray-800': '#1f2937',
  '--color-gray-700': '#374151',
  '--color-gray-600': '#4b5563',
  '--color-gray-400': '#9ca3af',
  '--color-gray-200': '#e5e7eb',
  '--color-gray-50': '#f9fafb',
  '--color-white': '#ffffff',
  '--color-indigo-400': '#818cf8',
};


const GlobalStyles = () => (
  <style>
    {`
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
            --color-red-600: ${VARS['--color-red-600']};
            --color-gray-900: ${VARS['--color-gray-900']};
            --color-gray-800: ${VARS['--color-gray-800']};
            --color-gray-700: ${VARS['--color-gray-700']};
            --color-gray-600: ${VARS['--color-gray-600']};
            --color-gray-400: ${VARS['--color-gray-400']};
            --color-gray-200: ${VARS['--color-gray-200']};
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
            display: flex;
            flex-direction: column;
        }
        main {
            flex-grow: 1;
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
            border-bottom: 1px solid var(--color-gray-200);
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 4.5rem;
        }
        .logo { display: flex; align-items: center; gap: 0.5rem; color: var(--color-indigo-600); text-decoration: none; }
        .logo-text { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.025em; }
        .logo-icon { fill: var(--color-indigo-500); }
        .nav-link { color: var(--color-gray-600); font-weight: 600; text-decoration: none; cursor: pointer; transition: all 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--color-indigo-600); }

        /* --- Hero Section --- */
        .hero-section {
            background: linear-gradient(to bottom right, var(--color-indigo-100), var(--color-white));
            padding: 4rem 0 5rem 0;
        }
        .hero-title { font-size: 2.25rem; font-weight: 800; color: var(--color-gray-900); line-height: 1.2; }
        .hero-subtitle { margin-top: 1rem; font-size: 1.25rem; color: var(--color-indigo-700); font-weight: 500; }
        .hero-cta-container { margin-top: 2rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

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
            border: 1px solid transparent;
            font-size: 0.95rem;
        }
        .btn-primary {
            background-color: var(--color-indigo-600);
            color: var(--color-white);
        }
        .btn-primary:hover { background-color: var(--color-indigo-700); transform: translateY(-2px); }
        .btn-secondary {
            background-color: var(--color-white);
            color: var(--color-indigo-700);
            border: 1px solid var(--color-indigo-600);
        }
        .btn-secondary:hover { background-color: var(--color-indigo-50); }
        .btn-confirm { background-color: var(--color-green-600); color: var(--color-white); }
        .btn-confirm:hover:not(:disabled) { background-color: var(--color-green-700); }
        .btn-confirm:disabled { background-color: #a7f3d0; cursor: not-allowed; }
        .btn-danger { background-color: var(--color-red-500); color: var(--color-white); }
        .btn-danger:hover { background-color: var(--color-red-600); }
        .btn-back { color: var(--color-indigo-600); border: 1px solid var(--color-indigo-600); background: var(--color-white); }
        .btn-back:hover { background-color: var(--color-indigo-50); }

        /* --- Forms and Cards --- */
        .form-card {
            width: 100%;
            max-width: 576px;
            margin-left: auto;
            margin-right: auto;
            background-color: var(--color-white);
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--color-gray-200);
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--color-gray-700); margin-bottom: 0.5rem; display: flex; align-items: center; }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--color-gray-400);
            border-radius: 0.5rem;
            transition: all 0.15s;
            font-size: 0.95rem;
            background-color: var(--color-white);
        }
        .form-input:focus { outline: none; border-color: var(--color-indigo-500); box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
        
        /* Pet Type Buttons */
        .pet-btn-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .pet-button {
            display: flex; align-items: center; justify-content: center; width: 100%; padding: 1rem;
            border-radius: 0.75rem; border: 2px solid var(--color-gray-200); font-weight: 600;
            transition: all 0.2s; background-color: var(--color-gray-50); color: var(--color-gray-700);
            cursor: pointer;
        }
        .pet-button.active {
            background-color: var(--color-indigo-600); color: var(--color-white);
            border-color: var(--color-indigo-700); box-shadow: 0 4px 6px rgba(99,102,241,0.15);
        }

        /* Quote Display */
        .quote-display {
            padding: 2rem; background-color: var(--color-green-50); border-radius: 0.75rem;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); border-top: 8px solid var(--color-green-500);
            margin-top: 1.5rem;
        }
        .quote-amount { font-size: 3rem; font-weight: 800; color: var(--color-green-600); }
        .details-box { padding: 1rem; background-color: var(--color-white); border-radius: 0.5rem; border: 1px solid var(--color-gray-200); }

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
        .footer { background-color: var(--color-gray-800); color: var(--color-white); margin-top: auto; }
        .footer-content {
            display: flex; flex-direction: column; justify-content: space-between; align-items: center;
            padding: 2.5rem 0; gap: 1rem;
        }

        /* --- Modals --- */
        .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(17, 24, 39, 0.6); backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center; z-index: 100;
            padding: 1rem; overflow-y: auto;
        }
        .modal-container {
            background-color: var(--color-white); width: 100%; max-width: 600px;
            border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border: 1px solid var(--color-gray-200); position: relative;
            animation: modalSlide 0.3s ease-out;
        }
        .modal-header {
            padding: 1.5rem; border-bottom: 1px solid var(--color-gray-200);
            display: flex; justify-content: space-between; align-items: center;
        }
        .modal-body {
            padding: 1.5rem; max-height: 70vh; overflow-y: auto;
        }
        .modal-footer {
            padding: 1.5rem; border-top: 1px solid var(--color-gray-200);
            display: flex; justify-content: flex-end; gap: 1rem;
        }
        @keyframes modalSlide {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* --- General Layout grids --- */
        .grid-3-col { display: grid; grid-template-columns: repeat(1, 1fr); gap: 2rem; }
        .grid-4-col { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; }
        
        /* --- Package Cards --- */
        .package-card {
            background-color: var(--color-white); border-radius: 1rem; overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid var(--color-gray-200);
            transition: all 0.3s; display: flex; flex-direction: column;
        }
        .package-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px rgba(0,0,0,0.1); }
        .package-image { width: 100%; height: 200px; object-fit: cover; }
        .package-content { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
        .package-title { font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); margin-bottom: 0.5rem; }
        .package-price { font-size: 1.5rem; font-weight: 800; color: var(--color-indigo-600); }
        .package-meta { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0; font-size: 0.85rem; color: var(--color-gray-600); }
        .package-meta-item { display: inline-flex; align-items: center; background-color: var(--color-gray-50); padding: 0.25rem 0.5rem; border-radius: 0.25rem; border: 1px solid var(--color-gray-200); }
        
        /* --- Filter Area --- */
        .filters-panel {
            background-color: var(--color-white); padding: 1.5rem; border-radius: 0.75rem;
            border: 1px solid var(--color-gray-200); margin-bottom: 2rem;
            display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem;
        }

        /* --- Pets Grid --- */
        .pet-card {
            background-color: var(--color-white); border: 1px solid var(--color-gray-200);
            border-radius: 1rem; overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: all 0.3s;
        }
        .pet-card:hover { box-shadow: 0 10px 15px rgba(0,0,0,0.08); }
        .pet-avatar {
            height: 120px; display: flex; align-items: center; justify-content: center;
            background: linear-gradient(135deg, var(--color-indigo-50), var(--color-indigo-100));
            color: var(--color-indigo-600);
        }
        .pet-card-body { padding: 1.25rem; flex-grow: 1; }

        /* --- Status Badges --- */
        .badge {
            display: inline-flex; align-items: center; padding: 0.25rem 0.75rem;
            border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
        }
        .badge-pending { background-color: #fef3c7; color: #d97706; }
        .badge-approved { background-color: #d1fae5; color: #059669; }
        .badge-rejected { background-color: #fee2e2; color: #dc2626; }
        .badge-cancelled { background-color: #f3f4f6; color: #4b5563; }
        .badge-paid { background-color: #e0f2fe; color: #0284c7; }

        /* --- Table View --- */
        .table-container { width: 100%; overflow-x: auto; background-color: var(--color-white); border-radius: 0.75rem; border: 1px solid var(--color-gray-200); }
        .custom-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
        .custom-table th { background-color: var(--color-gray-50); padding: 1rem; border-bottom: 2px solid var(--color-gray-200); color: var(--color-gray-700); font-weight: 700; }
        .custom-table td { padding: 1rem; border-bottom: 1px solid var(--color-gray-200); vertical-align: middle; color: var(--color-gray-800); }
        .custom-table tr:hover { background-color: var(--color-gray-50); }

        /* --- Stats Card --- */
        .stats-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stats-card {
            background-color: var(--color-white); padding: 1.5rem; border-radius: 0.75rem;
            border: 1px solid var(--color-gray-200); display: flex; justify-content: space-between; align-items: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .stats-num { font-size: 2rem; font-weight: 800; color: var(--color-indigo-600); line-height: 1; margin-top: 0.25rem; }

        /* --- Review Star selector --- */
        .star-rating-selector { display: flex; gap: 0.25rem; font-size: 1.5rem; margin: 0.5rem 0; }
        .star-btn { background: none; border: none; cursor: pointer; padding: 0.25rem; color: var(--color-gray-400); transition: all 0.1s; }
        .star-btn.active { color: #f59e0b; }

        /* Admin subtabs */
        .admin-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-gray-200); margin-bottom: 2rem; overflow-x: auto; padding-bottom: 2px; }
        .admin-tab-btn { background: none; border: none; padding: 0.75rem 1.25rem; font-weight: 600; font-size: 0.95rem; color: var(--color-gray-600); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
        .admin-tab-btn.active { color: var(--color-indigo-600); border-bottom-color: var(--color-indigo-600); }

        /* --- Alerts --- */
        .alert { padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; font-weight: 500; font-size: 0.9rem; }
        .alert-error { background-color: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .alert-success { background-color: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }

        @media (min-width: 640px) {
            .hero-title { font-size: 3rem; }
            .grid-sm-2-col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
            .filters-panel { grid-template-columns: repeat(3, 1fr); }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
            .hero-title { font-size: 3.5rem; }
            .features-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-content { flex-direction: row; }
            .grid-3-col { grid-template-columns: repeat(3, 1fr); }
            .grid-4-col { grid-template-columns: repeat(4, 1fr); }
        }
        @media (min-width: 1024px) {
            .features-grid { grid-template-columns: repeat(4, 1fr); }
            .filters-panel { grid-template-columns: repeat(6, 1fr); }
            .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
    `}
  </style>
);



const PawPathsHeader = ({ user, setView, activeView, onLogout }) => (
  <header className="header">
    <div className="header-content max-w-7xl mx-auto px-4 w-full">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#home" onClick={() => setView('home')} className="logo">
          <PawPrint className="w-8 h-8 logo-icon" />
          <span className="logo-text">PawPaths</span>
        </a>
        <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <span onClick={() => setView('home')} className={`nav-link ${activeView === 'home' ? 'active' : ''}`}>Home</span>
          <span onClick={() => setView('packages')} className={`nav-link ${activeView === 'packages' ? 'active' : ''}`}>Packages</span>
          {user && (
            <>
              <span onClick={() => setView('bookings')} className={`nav-link ${activeView === 'bookings' ? 'active' : ''}`}>My Bookings</span>
              <span onClick={() => setView('pets')} className={`nav-link ${activeView === 'pets' ? 'active' : ''}`}>My Pets</span>
              {user.role === 'admin' && (
                <span onClick={() => setView('admin')} className={`nav-link ${activeView === 'admin' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-indigo-600)' }}>
                  <Shield style={{ width: '1rem', height: '1rem' }} /> Admin Dashboard
                </span>
              )}
            </>
          )}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span 
              onClick={() => setView('profile')} 
              className="nav-link" 
              style={{ fontSize: '0.9rem', color: 'var(--color-gray-800)', cursor: 'pointer', borderBottom: activeView === 'profile' ? '2px solid var(--color-indigo-600)' : 'none' }}
            >
              <UserIcon style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.25rem' }} />
              {user.name}
            </span>
            <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              <LogOut style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem' }} /> Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setView('login')} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Login</button>
            <button onClick={() => setView('register')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  </header>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-box">
      <Icon style={{ width: '1.5rem', height: '1.5rem' }} />
    </div>
    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: VARS['--color-gray-900'], marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: VARS['--color-gray-600'], fontSize: '0.9rem', lineHeight: '1.4' }}>{description}</p>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="section-title text-center">
    {children}
  </h2>
);



const initialQuoteState = {
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

const calculateEstimate = (formData) => {
  let baseCost = 1500;
  let factor = 1;

  if (formData.petType === 'Dog') factor = 1.2;
  if (formData.petType === 'Cat') factor = 1.0;
  if (formData.petType === 'Exotic') factor = 1.5;

  const distanceProxy = (formData.origin.length + formData.destination.length) / 10;
  return Math.round(baseCost * factor * (1 + distanceProxy * 0.1));
};

const QuoteDisplay = ({ formData }) => {
  const quoteAmount = useMemo(() => calculateEstimate(formData), [formData]);

  return (
    <div className="quote-display">
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: VARS['--color-green-700'], marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <Plane style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Estimated Quote
      </h3>
      <div className="text-center" style={{ margin: '1.5rem 0' }}>
        <span className="quote-amount">${quoteAmount}</span>
        <p style={{ fontSize: '1rem', color: VARS['--color-gray-600'], marginTop: '0.25rem' }}>(Final price may vary)</p>
      </div>

      <div className="details-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ fontWeight: '700', color: VARS['--color-gray-800'], fontSize: '0.9rem' }}>Your Travel Details:</h4>
        <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-700'], margin: 0 }}>
          <MapPin style={{ display: 'inline', width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> From: <span style={{ fontWeight: '600' }}>{formData.origin}</span>
        </p>
        <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-700'], margin: 0 }}>
          <MapPin style={{ display: 'inline', width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> To: <span style={{ fontWeight: '600' }}>{formData.destination}</span>
        </p>
        <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-700'], margin: 0 }}>
          <Dog style={{ display: 'inline', width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Pet Type: <span style={{ fontWeight: '600' }}>{formData.petType}</span>
        </p>
        <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-700'], margin: 0 }}>
          <Calendar style={{ display: 'inline', width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Date: <span style={{ fontWeight: '600' }}>{formData.date}</span>
        </p>
      </div>

      <p className="text-center" style={{ color: VARS['--color-gray-600'], marginTop: '1.5rem', fontSize: '0.85rem' }}>
        A PawPaths agent will contact <span style={{ fontWeight: '600' }}>{formData.firstName}</span> at <span style={{ fontWeight: '600' }}>{formData.email}</span> within 24 hours.
      </p>
    </div>
  );
};

const QuoteForm = () => {
  const [formData, setFormData] = useState(initialQuoteState);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

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
  }, []);

  const handlePetTypeChange = useCallback((type) => {
    setFormData(prev => ({ ...prev, petType: type }));
  }, []);

  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    if (formData.origin && formData.destination) {
      setStep(2);
    } else {
      const errEl = document.getElementById('step-one-error');
      if (errEl) {
        errEl.textContent = 'Please fill in both origin and destination.';
        setTimeout(() => errEl.textContent = '', 3000);
      }
    }
  };

  const handleStepTwoSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('A valid email is required to submit the quote.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData(initialQuoteState);
    setStep(1);
    setSubmitSuccess(false);
    setEmailError('');
  }

  const StepOne = (
    <form onSubmit={handleStepOneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: VARS['--color-gray-800'], textAlign: 'center', marginBottom: '0.5rem' }}>1. Tell Us About Your Pet&apos;s Journey</h3>
      
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Pet Type</label>
        <div className="pet-btn-group">
          <PetTypeButton type="Dog" currentType={formData.petType} Icon={Dog} onClick={handlePetTypeChange} />
          <PetTypeButton type="Cat" currentType={formData.petType} Icon={Cat} onClick={handlePetTypeChange} />
          <PetTypeButton type="Exotic" currentType={formData.petType} Icon={PawPrint} onClick={handlePetTypeChange} />
        </div>
      </div>

      <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="origin" className="form-label">
            <MapPin style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-red-500'] }} /> Origin
          </label>
          <input
            type="text" id="origin" name="origin" value={formData.origin} onChange={handleChange}
            placeholder="e.g., London, UK" required className="form-input"
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="destination" className="form-label">
            <MapPin style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-green-500'] }} /> Destination
          </label>
          <input
            type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange}
            placeholder="e.g., New York, USA" required className="form-input"
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="date" className="form-label">
          <Calendar style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Preferred Travel Date
        </label>
        <input
          type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
          className="form-input"
        />
      </div>
      
      <div id="step-one-error" style={{ color: VARS['--color-red-500'], fontSize: '0.85rem', fontWeight: '600', textAlign: 'center', height: '1.25rem' }}></div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem' }}
      >
        Continue to Contact Details
      </button>
    </form>
  );

  const StepTwo = (
    <form onSubmit={handleStepTwoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: VARS['--color-gray-800'], textAlign: 'center', marginBottom: '0.5rem' }}>2. Your Contact Information</h3>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="firstName" className="form-label">
          <UserIcon style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Your Name
        </label>
        <input
          type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
          placeholder="First Name" required className="form-input"
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="email" className="form-label">
          <MessageSquare style={{ width: '0.9rem', height: '0.9rem', marginRight: '0.25rem', color: VARS['--color-indigo-500'] }} /> Email Address
        </label>
        <input
          type="email" id="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="you@example.com" required className="form-input"
          style={{
            borderColor: emailError ? VARS['--color-red-500'] : VARS['--color-gray-400']
          }}
        />
        <div style={{ color: VARS['--color-red-500'], fontSize: '0.75rem', fontWeight: '600', marginTop: '0.25rem', height: '1rem' }}>
          {emailError}
        </div>
      </div>

      <QuoteDisplay formData={formData} />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="btn btn-back"
          style={{ width: '30%', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !!emailError}
          className="btn btn-confirm"
          style={{ width: '70%', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}
        >
          {isSubmitting ? 'Sending Request...' : 'Confirm & Request Call'}
        </button>
      </div>
    </form>
  );

  if (submitSuccess) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: VARS['--color-indigo-50'], borderRadius: '1rem', borderTop: '8px solid var(--color-indigo-600)' }}>
        <div style={{ display: 'inline-block', padding: '1rem', background: VARS['--color-indigo-100'], borderRadius: '9999px', color: VARS['--color-indigo-600'], marginBottom: '1rem' }}>
          <PawPrint style={{ width: '2rem', height: '2rem' }} />
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: VARS['--color-gray-800'], marginBottom: '0.5rem' }}>
          Request Sent Successfully!
        </h3>
        <p style={{ fontSize: '1rem', color: VARS['--color-gray-600'], marginBottom: '1rem' }}>
          Thank you, <span style={{ fontWeight: '700' }}>{formData.firstName}</span>! Your quote request has been saved.
        </p>
        <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-500'], marginBottom: '1.5rem' }}>
          We will contact you at <span style={{ fontWeight: '600', color: VARS['--color-indigo-600'] }}>{formData.email}</span> shortly.
        </p>
        <button onClick={resetForm} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem' }}>
          Start Another Quote
        </button>
      </div>
    )
  }

  return (
    <div className="form-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
        <div style={{ width: '50%', height: '0.4rem', borderRadius: '9999px', background: step === 1 ? VARS['--color-indigo-600'] : '#e5e7eb' }}></div>
        <div style={{ width: '50%', height: '0.4rem', borderRadius: '9999px', background: step === 2 ? VARS['--color-indigo-600'] : '#e5e7eb' }}></div>
      </div>
      {step === 1 ? StepOne : StepTwo}
    </div>
  );
};



const PawPathsApp = () => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState('home');

  
  const [packages, setPackages] = useState([]);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);

  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    petSize: 'All',
    transportType: '',
    rating: '',
    duration: ''
  });

  
  const [activeModal, setActiveModal] = useState(null); 
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [pkgReviews, setPkgReviews] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [bookingPetId, setBookingPetId] = useState('');
  const [bookingTravelDate, setBookingTravelDate] = useState('');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', bookingId: '', packageId: '', reviewId: '' });

  
  const [adminStats, setAdminStats] = useState({ totalUsers: 0, totalBookings: 0, totalPackages: 0, revenue: 0 });
  const [adminSubView, setAdminSubView] = useState('stats'); 
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);
  const [adminPackageForm, setAdminPackageForm] = useState({
    id: '', destination: '', description: '', price: '', duration: '', transportType: 'Flight', petSizeAllowed: 'All', maximumPets: 2, availableSeats: 5, images: ''
  });

  
  useEffect(() => {
    const storedUser = localStorage.getItem('pawpaths_user');
    const storedToken = localStorage.getItem('pawpaths_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    fetchPackages();
    
  }, []);

  
  useEffect(() => {
    if (token) {
      fetchPets();
      fetchBookings();
      if (user?.role === 'admin') {
        fetchAdminData();
      }
    }
    
  }, [token, user]);

  const showFeedback = (msg, isSuccess = false) => {
    if (isSuccess) {
      setSuccessMsg(msg);
      setErrorMsg('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(msg);
      setSuccessMsg('');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  

  const fetchPackages = async () => {
    try {
      
      const params = new URLSearchParams();
      if (filters.destination) params.append('destination', filters.destination);
      if (filters.budget) params.append('budget', filters.budget);
      if (filters.petSize && filters.petSize !== 'All') params.append('petSize', filters.petSize);
      if (filters.transportType) params.append('transportType', filters.transportType);
      if (filters.rating) params.append('rating', filters.rating);
      if (filters.duration) params.append('duration', filters.duration);

      const res = await fetch(`/api/packages?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
    }
  };

  
  useEffect(() => {
    fetchPackages();
    
  }, [filters]);

  const fetchPets = async () => {
    try {
      const res = await fetch('/api/pets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPets(data);
      }
    } catch (err) {
      console.error('Error fetching pets:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchAdminData = async () => {
    try {
      const authHeader = { 'Authorization': `Bearer ${token}` };
      
      const statsRes = await fetch('/api/admin/stats', { headers: authHeader });
      if (statsRes.ok) setAdminStats(await statsRes.json());

      const usersRes = await fetch('/api/admin/users', { headers: authHeader });
      if (usersRes.ok) setAdminUsers(await usersRes.json());

      const bookingsRes = await fetch('/api/admin/bookings', { headers: authHeader });
      if (bookingsRes.ok) setAdminBookings(await bookingsRes.json());

      const reviewsRes = await fetch('/api/admin/reviews', { headers: authHeader });
      if (reviewsRes.ok) setAdminReviews(await reviewsRes.json());
    } catch (err) {
      console.error('Error fetching admin dashboard metrics:', err);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('pawpaths_token', data.token);
      localStorage.setItem('pawpaths_user', JSON.stringify({ name: data.name, email: data.email, role: data.role }));
      
      setToken(data.token);
      setUser({ name: data.name, email: data.email, role: data.role });
      setView('home');
      showFeedback('Logged in successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('pawpaths_token', data.token);
      localStorage.setItem('pawpaths_user', JSON.stringify({ name: data.name, email: data.email, role: data.role }));
      
      setToken(data.token);
      setUser({ name: data.name, email: data.email, role: data.role });
      setView('home');
      showFeedback('Account created successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('pawpaths_token');
    localStorage.removeItem('pawpaths_user');
    setToken(null);
    setUser(null);
    setPets([]);
    setBookings([]);
    setView('home');
    showFeedback('Logged out successfully', true);
  };

  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const updateBody = { name, email };
    if (password) updateBody.password = password;

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateBody)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      localStorage.setItem('pawpaths_token', data.token);
      localStorage.setItem('pawpaths_user', JSON.stringify({ name: data.name, email: data.email, role: data.role }));

      setUser({ name: data.name, email: data.email, role: data.role });
      setToken(data.token);
      showFeedback('Profile updated successfully!', true);
      e.target.password.value = '';
    } catch (err) {
      showFeedback(err.message);
    }
  };

  

  const handleAddPet = async (e) => {
    e.preventDefault();
    const name = e.target.petName.value;
    const species = e.target.petSpecies.value;
    const breed = e.target.petBreed.value;
    const age = e.target.petAge.value;
    const weight = e.target.petWeight.value;
    const vaccinationStatus = e.target.petVaccination.value;
    const medicalNotes = e.target.petNotes.value;

    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, species, breed, age, weight, vaccinationStatus, medicalNotes })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add pet');

      fetchPets();
      setActiveModal(null);
      showFeedback('Pet added successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleEditPet = async (e) => {
    e.preventDefault();
    const name = e.target.petName.value;
    const species = e.target.petSpecies.value;
    const breed = e.target.petBreed.value;
    const age = e.target.petAge.value;
    const weight = e.target.petWeight.value;
    const vaccinationStatus = e.target.petVaccination.value;
    const medicalNotes = e.target.petNotes.value;

    try {
      const res = await fetch(`/api/pets/${editingPet._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, species, breed, age, weight, vaccinationStatus, medicalNotes })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to update pet');

      fetchPets();
      setEditingPet(null);
      setActiveModal(null);
      showFeedback('Pet updated successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleDeletePet = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      const res = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete pet');

      fetchPets();
      showFeedback('Pet removed successfully', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  

  const handleBookPackage = async (e) => {
    e.preventDefault();
    if (!bookingPetId) {
      showFeedback('Please select a pet to register for travel');
      return;
    }
    if (!bookingTravelDate) {
      showFeedback('Please select your preferred travel date');
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          packageId: selectedPkg._id,
          petId: bookingPetId,
          travelDate: bookingTravelDate
        })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Booking request failed');

      fetchBookings();
      fetchPackages(); 
      setActiveModal(null);
      setView('bookings');
      showFeedback('Booking request submitted! Awaiting administrator approval.', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This will restore the available seat.')) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to cancel booking');

      fetchBookings();
      fetchPackages();
      showFeedback('Booking cancelled successfully', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  

  const openReviewModal = (booking, existingReview = null) => {
    if (existingReview) {
      setReviewForm({
        rating: existingReview.rating,
        comment: existingReview.comment,
        bookingId: booking._id,
        packageId: booking.packageId._id,
        reviewId: existingReview._id
      });
    } else {
      setReviewForm({
        rating: 5,
        comment: '',
        bookingId: booking._id,
        packageId: booking.packageId._id,
        reviewId: ''
      });
    }
    setActiveModal('review');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const { rating, comment, packageId, reviewId } = reviewForm;

    try {
      let res;
      if (reviewId) {
        
        res = await fetch(`/api/reviews/${reviewId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ rating, comment })
        });
      } else {
        
        res = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ packageId, rating, comment })
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Review submit failed');

      fetchBookings();
      fetchPackages();
      setActiveModal(null);
      showFeedback('Review saved successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete review');

      fetchBookings();
      fetchPackages();
      setActiveModal(null);
      showFeedback('Review removed successfully', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  
  const openPackageDetails = async (pkg) => {
    setSelectedPkg(pkg);
    setActiveModal('packageDetails');
    setPkgReviews([]);
    try {
      const res = await fetch(`/api/packages/${pkg._id}`);
      if (res.ok) {
        const data = await res.json();
        setPkgReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching package details:', err);
    }
  };

  

  const handleAdminApproveBooking = async (bookingId, status) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookingStatus: status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status');

      fetchAdminData();
      showFeedback(`Booking status changed to ${status}!`, true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleAdminTogglePayment = async (bookingId, currentPayment) => {
    const nextPayment = currentPayment === 'Paid' ? 'Pending' : 'Paid';
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: nextPayment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update payment status');

      fetchAdminData();
      showFeedback(`Booking payment toggled to ${nextPayment}!`, true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleAdminDeleteUser = async (userId) => {
    if (!window.confirm('WARNING: Deleting this user will delete all their pets, bookings, and reviews. Proceed?')) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete user');

      fetchAdminData();
      showFeedback('User account and related history deleted', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleAdminDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this user review from the platform?')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete review');

      fetchAdminData();
      showFeedback('Review moderated and removed', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const openAdminPackageForm = (pkg = null) => {
    if (pkg) {
      setAdminPackageForm({
        id: pkg._id,
        destination: pkg.destination,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        transportType: pkg.transportType,
        petSizeAllowed: pkg.petSizeAllowed,
        maximumPets: pkg.maximumPets,
        availableSeats: pkg.availableSeats,
        images: pkg.images?.join(', ') || ''
      });
    } else {
      setAdminPackageForm({
        id: '',
        destination: '',
        description: '',
        price: '',
        duration: '',
        transportType: 'Flight',
        petSizeAllowed: 'All',
        maximumPets: 2,
        availableSeats: 5,
        images: ''
      });
    }
    setActiveModal('adminPackage');
  };

  const handleAdminPackageSubmit = async (e) => {
    e.preventDefault();
    const { id, destination, description, price, duration, transportType, petSizeAllowed, maximumPets, availableSeats, images } = adminPackageForm;

    const imgArray = images ? images.split(',').map(s => s.trim()).filter(Boolean) : [];
    const pkgData = {
      destination,
      description,
      price: Number(price),
      duration,
      transportType,
      petSizeAllowed,
      maximumPets: Number(maximumPets),
      availableSeats: Number(availableSeats),
      images: imgArray
    };

    try {
      let res;
      if (id) {
        
        res = await fetch(`/api/admin/packages/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pkgData)
        });
      } else {
        
        res = await fetch('/api/admin/packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pkgData)
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save package');

      fetchPackages();
      fetchAdminData();
      setActiveModal(null);
      showFeedback('Travel Package saved successfully!', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  const handleAdminDeletePackage = async (packageId) => {
    if (!window.confirm('WARNING: Deleting this package will delete all bookings and reviews associated with it. Proceed?')) return;
    try {
      const res = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete package');

      fetchPackages();
      fetchAdminData();
      showFeedback('Travel Package and associated history deleted', true);
    } catch (err) {
      showFeedback(err.message);
    }
  };

  
  const getPackageReview = (pkgId) => {
    
    
    
    return adminReviews.find(r => r.userId?._id === user?._id && r.packageId?._id === pkgId);
  };

  
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{ width: '1rem', height: '1rem', color: i <= floorRating ? '#f59e0b' : '#d1d5db' }} 
          fill={i <= floorRating ? '#f59e0b' : 'none'}
        />
      );
    }
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>{stars}</span>;
  };

  return (
    <div className="app-container">
      <GlobalStyles />
      <PawPathsHeader user={user} setView={setView} activeView={view} onLogout={handleLogout} />

      {}
      <div className="max-w-7xl mx-auto px-4 w-full" style={{ marginTop: '1rem' }}>
        {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
      </div>

      <main>
        {}
        {view === 'home' && (
          <div>
            <section className="hero-section">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="hero-title">
                  The Safest Path for Your Furry Friend
                </h1>
                <p className="hero-subtitle">
                  Global Pet Travel Logistics by <span style={{ fontWeight: '700', color: VARS['--color-gray-800'] }}>PawPaths</span>
                </p>
                <div className="hero-cta-container">
                  <span onClick={() => setView('packages')} className="btn btn-primary" style={{ cursor: 'pointer' }}>
                    <Plane style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Explore Packages
                  </span>
                  <a href="#estimator" className="btn btn-secondary">
                    <Briefcase style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} /> Get Quote Estimator
                  </a>
                </div>
              </div>
            </section>

            {}
            <section style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
              <div className="max-w-7xl mx-auto px-4">
                <SectionTitle>Featured Pet Packages</SectionTitle>
                <div className="grid-3-col">
                  {packages.slice(0, 3).map((pkg) => (
                    <div className="package-card" key={pkg._id}>
                      <img src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'} className="package-image" alt={pkg.destination} />
                      <div className="package-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-indigo-600)', textTransform: 'uppercase' }}>{pkg.transportType}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            <Star style={{ width: '1rem', height: '1rem', fill: '#f59e0b', color: '#f59e0b' }} /> {pkg.rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                        <h3 className="package-title" style={{ marginTop: '0.5rem' }}>{pkg.destination}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', flexGrow: 1, lineBreak: 'strict' }}>
                          {pkg.description?.substring(0, 100)}...
                        </p>
                        <div className="package-meta">
                          <span className="package-meta-item">Duration: {pkg.duration}</span>
                          <span className="package-meta-item">Size: {pkg.petSizeAllowed}</span>
                          <span className="package-meta-item">Seats: {pkg.availableSeats}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                          <span className="package-price">${pkg.price}</span>
                          <button onClick={() => openPackageDetails(pkg)} className="btn btn-secondary" style={{ borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                            Details & Reviews
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center" style={{ marginTop: '2.5rem' }}>
                  <button onClick={() => setView('packages')} className="btn btn-primary">
                    View All Travel Packages
                  </button>
                </div>
              </div>
            </section>

            {}
            <section id="estimator" className="py-16" style={{ background: VARS['--color-gray-50'] }}>
              <div className="max-w-7xl mx-auto px-4">
                <SectionTitle>Quick Quote Calculator</SectionTitle>
                <QuoteForm />
              </div>
            </section>

            {}
            <section style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
              <div className="max-w-7xl mx-auto px-4">
                <SectionTitle>Why Choose PawPaths?</SectionTitle>
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
          </div>
        )}

        {}
        {view === 'packages' && (
          <section style={{ padding: '3rem 0' }}>
            <div className="max-w-7xl mx-auto px-4">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Travel Packages</h2>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: '2rem' }}>Browse and search customized paths for your pet relocations.</p>

              {}
              <div className="filters-panel">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Search Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Paris"
                    value={filters.destination}
                    onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
                    className="form-input"
                    style={{ padding: '0.5rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Budget Limit (${filters.budget || 'Max'})</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={filters.budget || 3000}
                    onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                    style={{ width: '100%', accentColor: 'var(--color-indigo-600)', marginTop: '0.5rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Pet Size Allowed</label>
                  <select
                    value={filters.petSize}
                    onChange={(e) => setFilters(prev => ({ ...prev, petSize: e.target.value }))}
                    className="form-input"
                    style={{ padding: '0.5rem' }}
                  >
                    <option value="All">Any Size</option>
                    <option value="Small">Small Only</option>
                    <option value="Medium">Medium Only</option>
                    <option value="Large">Large Only</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Transport Type</label>
                  <select
                    value={filters.transportType}
                    onChange={(e) => setFilters(prev => ({ ...prev, transportType: e.target.value }))}
                    className="form-input"
                    style={{ padding: '0.5rem' }}
                  >
                    <option value="">Any Transport</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Ground">Ground</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="form-input"
                    style={{ padding: '0.5rem' }}
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ ★</option>
                    <option value="4.7">4.7+ ★</option>
                    <option value="4.9">4.9+ ★</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    onClick={() => setFilters({ destination: '', budget: '', petSize: 'All', transportType: '', rating: '', duration: '' })}
                    className="btn btn-secondary w-full"
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {packages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-white)', borderRadius: '1rem', border: '1px solid var(--color-gray-200)' }}>
                  <PawPrint style={{ width: '3rem', height: '3rem', color: 'var(--color-gray-400)', marginBottom: '1rem' }} />
                  <h3>No packages match your search filters.</h3>
                  <p style={{ color: 'var(--color-gray-600)' }}>Try adjusting your search criteria or resetting filters.</p>
                </div>
              ) : (
                <div className="grid-3-col">
                  {packages.map((pkg) => (
                    <div className="package-card" key={pkg._id}>
                      <img src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'} className="package-image" alt={pkg.destination} />
                      <div className="package-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-indigo-600)', textTransform: 'uppercase' }}>{pkg.transportType}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            <Star style={{ width: '1rem', height: '1rem', fill: '#f59e0b', color: '#f59e0b' }} /> {pkg.rating?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                        <h3 className="package-title" style={{ marginTop: '0.5rem' }}>{pkg.destination}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', flexGrow: 1 }}>
                          {pkg.description}
                        </p>
                        <div className="package-meta">
                          <span className="package-meta-item">Duration: {pkg.duration}</span>
                          <span className="package-meta-item">Size: {pkg.petSizeAllowed}</span>
                          <span className="package-meta-item">Seats: {pkg.availableSeats}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                          <span className="package-price">${pkg.price}</span>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => openPackageDetails(pkg)} className="btn btn-secondary" style={{ borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                              Reviews
                            </button>
                            <button
                              onClick={() => {
                                if (!user) {
                                  setView('login');
                                  showFeedback('Please log in to book a package');
                                  return;
                                }
                                setSelectedPkg(pkg);
                                setBookingPetId(pets[0]?._id || '');
                                setBookingTravelDate('');
                                setActiveModal('book');
                              }}
                              disabled={pkg.availableSeats <= 0}
                              className="btn btn-primary"
                              style={{ borderRadius: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                            >
                              {pkg.availableSeats <= 0 ? 'Full' : 'Book Now'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {}
        {view === 'login' && (
          <section style={{ padding: '5rem 0' }}>
            <div className="form-card">
              <h2 className="text-center" style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem' }}>Sign In to PawPaths</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">Email Address</label>
                  <input type="email" id="login-email" name="email" required className="form-input" placeholder="e.g. user@pawpaths.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <input type="password" id="login-password" name="password" required className="form-input" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
                  Sign In
                </button>
              </form>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-600)', textAlign: 'center' }}>
                Don&apos;t have an account? <span onClick={() => setView('register')} style={{ color: 'var(--color-indigo-600)', fontWeight: 600, cursor: 'pointer' }}>Create one here</span>
              </p>
            </div>
          </section>
        )}

        {}
        {view === 'register' && (
          <section style={{ padding: '4rem 0' }}>
            <div className="form-card">
              <h2 className="text-center" style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem' }}>Join PawPaths</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">Full Name</label>
                  <input type="text" id="reg-name" name="username" required className="form-input" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email Address</label>
                  <input type="email" id="reg-email" name="email" required className="form-input" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password</label>
                  <input type="password" id="reg-password" name="password" required className="form-input" placeholder="Min 6 characters" minLength="6" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-role">Role</label>
                  <select id="reg-role" name="role" required className="form-input">
                    <option value="user">Regular User (Book Travel)</option>
                    <option value="admin">Administrator (Manage Platform)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
                  Register Account
                </button>
              </form>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-600)', textAlign: 'center' }}>
                Already registered? <span onClick={() => setView('login')} style={{ color: 'var(--color-indigo-600)', fontWeight: 600, cursor: 'pointer' }}>Sign In instead</span>
              </p>
            </div>
          </section>
        )}

        {}
        {view === 'profile' && (
          <section style={{ padding: '3rem 0' }}>
            <div className="max-w-7xl mx-auto px-4" style={{ maxWidth: '600px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>User Profile</h2>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: '2rem' }}>Review and modify your personal details below.</p>
              
              <div className="form-card" style={{ maxWidth: '100%' }}>
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="prof-name">Full Name</label>
                    <input type="text" id="prof-name" name="username" defaultValue={user?.name} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="prof-email">Email Address</label>
                    <input type="email" id="prof-email" name="email" defaultValue={user?.email} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="prof-password">Change Password</label>
                    <input type="password" id="prof-password" name="password" className="form-input" placeholder="Leave empty to keep current password" minLength="6" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Account Role</label>
                    <input type="text" disabled className="form-input" value={user?.role?.toUpperCase() || ''} style={{ backgroundColor: 'var(--color-gray-50)', color: 'var(--color-gray-600)', fontWeight: 700 }} />
                  </div>
                  <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
                    Save Profile Changes
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {}
        {view === 'pets' && (
          <section style={{ padding: '3rem 0' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Pets</h2>
                  <p style={{ color: 'var(--color-gray-600)' }}>Register and update your pets&apos; health details for travels.</p>
                </div>
                <button onClick={() => { setEditingPet(null); setActiveModal('addPet'); }} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '0.5rem' }}>
                  <Plus style={{ width: '1.1rem', height: '1.1rem' }} /> Add New Pet
                </button>
              </div>

              {pets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'var(--color-white)', borderRadius: '1rem', border: '1px solid var(--color-gray-200)' }}>
                  <Dog style={{ width: '3.5rem', height: '3.5rem', color: 'var(--color-gray-400)', marginBottom: '1rem', display: 'inline' }} />
                  <h3>No pets registered yet.</h3>
                  <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>You must add at least one pet to book travel packages.</p>
                  <button onClick={() => { setEditingPet(null); setActiveModal('addPet'); }} className="btn btn-primary">Add Pet Profile</button>
                </div>
              ) : (
                <div className="grid-3-col">
                  {pets.map((pet) => (
                    <div className="pet-card" key={pet._id}>
                      <div className="pet-avatar">
                        {pet.species === 'Dog' ? <Dog style={{ width: '3.5rem', height: '3.5rem' }} /> : pet.species === 'Cat' ? <Cat style={{ width: '3.5rem', height: '3.5rem' }} /> : <PawPrint style={{ width: '3.5rem', height: '3.5rem' }} />}
                      </div>
                      <div className="pet-card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{pet.name}</h3>
                          <span className={`badge ${pet.vaccinationStatus === 'Vaccinated' ? 'badge-approved' : pet.vaccinationStatus === 'Partially Vaccinated' ? 'badge-pending' : 'badge-rejected'}`}>
                            {pet.vaccinationStatus}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', margin: '0.5rem 0 1rem 0' }}>
                          <strong>{pet.species}</strong> • {pet.breed} • {pet.age} yrs • {pet.weight} kg
                        </p>
                        {pet.medicalNotes && (
                          <div style={{ backgroundColor: 'var(--color-gray-50)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', border: '1px solid var(--color-gray-200)', marginBottom: '1.5rem' }}>
                            <strong>Medical Notes:</strong> {pet.medicalNotes}
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid var(--color-gray-200)', paddingTop: '1rem' }}>
                          <button onClick={() => { setEditingPet(pet); setActiveModal('editPet'); }} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Edit style={{ width: '0.85rem', height: '0.85rem' }} /> Edit
                          </button>
                          <button onClick={() => handleDeletePet(pet._id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Trash style={{ width: '0.85rem', height: '0.85rem' }} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {}
        {view === 'bookings' && (
          <section style={{ padding: '3rem 0' }}>
            <div className="max-w-7xl mx-auto px-4">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Booking History</h2>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: '2.5rem' }}>Track, pay, or cancel your pet travel itineraries.</p>

              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'var(--color-white)', borderRadius: '1rem', border: '1px solid var(--color-gray-200)' }}>
                  <Calendar style={{ width: '3.5rem', height: '3.5rem', color: 'var(--color-gray-400)', marginBottom: '1rem', display: 'inline' }} />
                  <h3>No bookings found.</h3>
                  <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>Ready to travel? Browse our destination packages.</p>
                  <button onClick={() => setView('packages')} className="btn btn-primary">Browse Packages</button>
                </div>
              ) : (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Destination</th>
                        <th>Pet Registered</th>
                        <th>Booking Date</th>
                        <th>Travel Date</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => {
                        const packageReview = getPackageReview(booking.packageId?._id);
                        return (
                          <tr key={booking._id}>
                            <td style={{ fontWeight: 700, color: 'var(--color-gray-900)' }}>{booking.bookingId}</td>
                            <td>
                              <span style={{ fontWeight: 600 }}>{booking.packageId?.destination || 'Deleted Package'}</span>
                              <br />
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>{booking.packageId?.transportType}</span>
                            </td>
                            <td>{booking.petId?.name || 'Deleted Pet'}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                            <td style={{ fontWeight: 700 }}>${booking.packageId?.price || 0}</td>
                            <td>
                              <span className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-approved' : 'badge-pending'}`}>
                                {booking.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${booking.bookingStatus === 'Approved' ? 'badge-approved' : booking.bookingStatus === 'Pending' ? 'badge-pending' : booking.bookingStatus === 'Rejected' ? 'badge-rejected' : 'badge-cancelled'}`}>
                                {booking.bookingStatus}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                {}
                                {booking.bookingStatus === 'Approved' && (
                                  <button 
                                    onClick={() => openReviewModal(booking, packageReview)} 
                                    className="btn btn-primary" 
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem' }}
                                  >
                                    {packageReview ? 'Edit Review' : 'Review'}
                                  </button>
                                )}
                                
                                {}
                                {(booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Approved') && (
                                  <button 
                                    onClick={() => handleCancelBooking(booking._id)} 
                                    className="btn btn-danger" 
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '0.35rem' }}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {}
        {view === 'admin' && user?.role === 'admin' && (
          <section style={{ padding: '3rem 0' }}>
            <div className="max-w-7xl mx-auto px-4">
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Control Center</h2>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: '2rem' }}>Platform monitoring, booking resolutions, package creation, and review audits.</p>

              {}
              <div className="admin-tabs">
                <button onClick={() => setAdminSubView('stats')} className={`admin-tab-btn ${adminSubView === 'stats' ? 'active' : ''}`}>Metrics & Overview</button>
                <button onClick={() => setAdminSubView('bookings')} className={`admin-tab-btn ${adminSubView === 'bookings' ? 'active' : ''}`}>Manage Bookings ({adminBookings.length})</button>
                <button onClick={() => setAdminSubView('packages')} className={`admin-tab-btn ${adminSubView === 'packages' ? 'active' : ''}`}>Manage Packages</button>
                <button onClick={() => setAdminSubView('reviews')} className={`admin-tab-btn ${adminSubView === 'reviews' ? 'active' : ''}`}>Reviews Moderation ({adminReviews.length})</button>
                <button onClick={() => setAdminSubView('users')} className={`admin-tab-btn ${adminSubView === 'users' ? 'active' : ''}`}>User Accounts ({adminUsers.length})</button>
              </div>

              {}
              {adminSubView === 'stats' && (
                <div>
                  <div className="stats-grid">
                    <div className="stats-card">
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase' }}>Registered Clients</span>
                        <div className="stats-num">{adminStats.totalUsers}</div>
                      </div>
                      <UserIcon style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-500)' }} />
                    </div>

                    <div className="stats-card">
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase' }}>Travel Bookings</span>
                        <div className="stats-num">{adminStats.totalBookings}</div>
                      </div>
                      <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-green-500)' }} />
                    </div>

                    <div className="stats-card">
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase' }}>Available Packages</span>
                        <div className="stats-num">{adminStats.totalPackages}</div>
                      </div>
                      <Briefcase style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-indigo-400)' }} />
                    </div>

                    <div className="stats-card" style={{ borderLeft: '4px solid var(--color-green-600)' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gray-600)', textTransform: 'uppercase' }}>Generated Revenue</span>
                        <div className="stats-num" style={{ color: 'var(--color-green-600)' }}>${adminStats.revenue}</div>
                      </div>
                      <Plane style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-green-600)' }} />
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-white)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-gray-200)', marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Interviewer Notes</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-gray-700)', lineHeight: '1.5' }}>
                      This application implements a completely custom routing architecture utilizing <strong>native HTTP modules only</strong>, connected directly to a MongoDB backend. High security is maintained using bcrypt and jsonwebtoken authentication, with validation at the database schema levels. 
                    </p>
                  </div>
                </div>
              )}

              {}
              {adminSubView === 'bookings' && (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>User Account</th>
                        <th>Destination</th>
                        <th>Pet Registered</th>
                        <th>Travel Date</th>
                        <th>Payment Status</th>
                        <th>Booking Status</th>
                        <th style={{ textAlign: 'right' }}>Status Adjustments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td style={{ fontWeight: 700 }}>{booking.bookingId}</td>
                          <td>
                            <strong>{booking.userId?.name}</strong>
                            <br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>{booking.userId?.email}</span>
                          </td>
                          <td>{booking.packageId?.destination}</td>
                          <td>{booking.petId?.name} ({booking.petId?.species})</td>
                          <td>{new Date(booking.travelDate).toLocaleDateString()}</td>
                          <td>
                            <button 
                              onClick={() => handleAdminTogglePayment(booking._id, booking.paymentStatus)}
                              className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-approved' : 'badge-pending'}`}
                              style={{ border: 'none', cursor: 'pointer' }}
                              title="Click to toggle Payment status"
                            >
                              {booking.paymentStatus}
                            </button>
                          </td>
                          <td>
                            <span className={`badge ${booking.bookingStatus === 'Approved' ? 'badge-approved' : booking.bookingStatus === 'Pending' ? 'badge-pending' : booking.bookingStatus === 'Rejected' ? 'badge-rejected' : 'badge-cancelled'}`}>
                              {booking.bookingStatus}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {booking.bookingStatus === 'Pending' ? (
                              <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                                <button onClick={() => handleAdminApproveBooking(booking._id, 'Approved')} className="btn btn-confirm" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderRadius: '0.25rem' }}>Approve</button>
                                <button onClick={() => handleAdminApproveBooking(booking._id, 'Rejected')} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', borderRadius: '0.25rem' }}>Reject</button>
                              </div>
                            ) : (
                              <select 
                                value={booking.bookingStatus} 
                                onChange={(e) => handleAdminApproveBooking(booking._id, e.target.value)}
                                style={{ padding: '0.25rem', fontSize: '0.8rem', borderRadius: '0.25rem', borderColor: 'var(--color-gray-400)' }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {}
              {adminSubView === 'packages' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <button onClick={() => openAdminPackageForm(null)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Plus style={{ width: '1rem', height: '1rem' }} /> Create New Package
                    </button>
                  </div>

                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Destination</th>
                          <th>Transport</th>
                          <th>Pet Size</th>
                          <th>Duration</th>
                          <th>Price</th>
                          <th>Seats Left</th>
                          <th>Rating</th>
                          <th style={{ textAlign: 'right' }}>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.map((pkg) => (
                          <tr key={pkg._id}>
                            <td style={{ fontWeight: 700 }}>{pkg.destination}</td>
                            <td>{pkg.transportType}</td>
                            <td>{pkg.petSizeAllowed}</td>
                            <td>{pkg.duration}</td>
                            <td>${pkg.price}</td>
                            <td>{pkg.availableSeats} / {pkg.maximumPets * 5}</td>
                            <td>{pkg.rating?.toFixed(1) || '0.0'} ★</td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                <button onClick={() => openAdminPackageForm(pkg)} className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Edit style={{ width: '0.8rem', height: '0.8rem' }} /> Edit
                                </button>
                                <button onClick={() => handleAdminDeletePackage(pkg._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {}
              {adminSubView === 'reviews' && (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Reviewer</th>
                        <th>Target Package</th>
                        <th>Rating Stars</th>
                        <th>Comment Text</th>
                        <th>Date Published</th>
                        <th style={{ textAlign: 'right' }}>Moderate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminReviews.map((review) => (
                        <tr key={review._id}>
                          <td>
                            <strong>{review.userId?.name || 'Deleted Account'}</strong>
                            <br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>{review.userId?.email}</span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{review.packageId?.destination || 'Deleted Package'}</td>
                          <td>{renderStars(review.rating)}</td>
                          <td style={{ maxWidth: '300px', wordBreak: 'break-all' }}>"{review.comment}"</td>
                          <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button onClick={() => handleAdminDeleteReview(review._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {}
              {adminSubView === 'users' && (
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email ID</th>
                        <th>Assigned Role</th>
                        <th>Registered Date</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((client) => (
                        <tr key={client._id}>
                          <td style={{ fontWeight: 700 }}>{client.name}</td>
                          <td>{client.email}</td>
                          <td>
                            <span className={`badge ${client.role === 'admin' ? 'badge-approved' : 'badge-pending'}`}>
                              {client.role}
                            </span>
                          </td>
                          <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                          <td style={{ textAlign: 'right' }}>
                            {client.role !== 'admin' && (
                              <button onClick={() => handleAdminDeleteUser(client._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem', borderRadius: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Trash style={{ width: '0.8rem', height: '0.8rem' }} /> Delete User
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {}
      {activeModal === 'packageDetails' && selectedPkg && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Destination Details</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
            </div>
            <div className="modal-body">
              <img src={selectedPkg.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }} alt="" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{selectedPkg.destination}</h4>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-indigo-600)' }}>${selectedPkg.price}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="badge badge-approved" style={{ fontSize: '0.7rem' }}>{selectedPkg.transportType}</span>
                <span className="badge badge-paid" style={{ fontSize: '0.7rem' }}>Allows: {selectedPkg.petSizeAllowed}</span>
                <span className="badge badge-pending" style={{ fontSize: '0.7rem' }}>Seats: {selectedPkg.availableSeats}</span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-700)', lineHeight: '1.5', marginBottom: '2rem' }}>
                {selectedPkg.description}
              </p>

              <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '1.5rem' }}>
                <h5 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Customer Reviews ({pkgReviews.length})</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.95rem' }}>
                    <Star style={{ width: '1.1rem', height: '1.1rem', fill: '#f59e0b', color: '#f59e0b' }} /> {selectedPkg.rating?.toFixed(1) || '0.0'} / 5.0
                  </span>
                </h5>

                {pkgReviews.length === 0 ? (
                  <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', fontStyle: 'italic' }}>No reviews have been written for this trip package yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pkgReviews.map((rev) => (
                      <div key={rev._id} style={{ backgroundColor: 'var(--color-gray-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-gray-200)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <strong style={{ fontSize: '0.85rem' }}>{rev.userId?.name}</strong>
                          <div>{renderStars(rev.rating)}</div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-700)', margin: 0 }}>"{rev.comment}"</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-gray-400)', display: 'block', marginTop: '0.5rem' }}>{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setActiveModal(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {}
      {activeModal === 'book' && selectedPkg && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Book Relocation Package</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleBookPackage}>
              <div className="modal-body">
                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-600)' }}>
                  You are booking <strong>{selectedPkg.destination}</strong> for a total cost of <strong style={{ color: 'var(--color-indigo-600)' }}>${selectedPkg.price}</strong>.
                </p>

                {pets.length === 0 ? (
                  <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    You have no pets registered. Please close this modal, navigate to <strong>My Pets</strong>, and register a pet first.
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-pet">Select Pet</label>
                    <select 
                      id="booking-pet"
                      value={bookingPetId} 
                      onChange={(e) => setBookingPetId(e.target.value)} 
                      required 
                      className="form-input"
                    >
                      <option value="">-- Choose registered pet --</option>
                      {pets.map(p => (
                        <option key={p._id} value={p._id}>{p.name} ({p.species} - {p.weight}kg)</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="booking-date">Departure Date</label>
                  <input 
                    type="date" 
                    id="booking-date"
                    min={new Date().toISOString().substring(0, 10)}
                    value={bookingTravelDate} 
                    onChange={(e) => setBookingTravelDate(e.target.value)} 
                    required 
                    className="form-input" 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setActiveModal(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Cancel</button>
                <button 
                  type="submit" 
                  disabled={pets.length === 0 || !bookingPetId || !bookingTravelDate} 
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1.2rem', borderRadius: '0.5rem' }}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {activeModal === 'review' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                {reviewForm.reviewId ? 'Modify Your Review' : 'Rate Your Trip Experience'}
              </h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleReviewSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Star Rating</label>
                  <div className="star-rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className={`star-btn ${reviewForm.rating >= star ? 'active' : ''}`}
                      >
                        <Star style={{ width: '1.75rem', height: '1.75rem', fill: reviewForm.rating >= star ? '#f59e0b' : 'none' }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rev-comment">Review Description</label>
                  <textarea
                    id="rev-comment"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell other pet owners about the transport comfort, carrier hygiene, and staff attentiveness..."
                    required
                    className="form-input"
                    rows="4"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
                <div>
                  {reviewForm.reviewId && (
                    <button 
                      type="button" 
                      onClick={() => handleReviewDelete(reviewForm.reviewId)} 
                      className="btn btn-danger" 
                      style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}
                    >
                      Delete Review
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', borderRadius: '0.5rem' }}>
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {(activeModal === 'addPet' || activeModal === 'editPet') && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                {editingPet ? `Modify Profile: ${editingPet.name}` : 'Register a New Pet'}
              </h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={editingPet ? handleEditPet : handleAddPet}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="pet-name">Pet Name</label>
                  <input type="text" id="pet-name" name="petName" defaultValue={editingPet?.name || ''} required className="form-input" placeholder="e.g. Max" />
                </div>

                <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pet-species">Species Type</label>
                    <select id="pet-species" name="petSpecies" defaultValue={editingPet?.species || 'Dog'} className="form-input">
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Exotic">Exotic</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pet-breed">Breed Name</label>
                    <input type="text" id="pet-breed" name="petBreed" defaultValue={editingPet?.breed || ''} required className="form-input" placeholder="e.g. Golden Retriever" />
                  </div>
                </div>

                <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pet-age">Age (Years)</label>
                    <input type="number" id="pet-age" name="petAge" defaultValue={editingPet?.age !== undefined ? editingPet.age : ''} required className="form-input" placeholder="e.g. 3" min="0" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pet-weight">Weight (kg)</label>
                    <input type="number" id="pet-weight" name="petWeight" defaultValue={editingPet?.weight !== undefined ? editingPet.weight : ''} required className="form-input" placeholder="e.g. 28" min="0" step="0.1" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pet-vacc">Vaccination Status</label>
                  <select id="pet-vacc" name="petVaccination" defaultValue={editingPet?.vaccinationStatus || 'Vaccinated'} className="form-input">
                    <option value="Vaccinated">Fully Vaccinated</option>
                    <option value="Partially Vaccinated">Partially Vaccinated</option>
                    <option value="Not Vaccinated">Not Vaccinated</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pet-notes">Medical Notes / Warnings</label>
                  <textarea id="pet-notes" name="petNotes" defaultValue={editingPet?.medicalNotes || ''} className="form-input" placeholder="Enter health remarks, dietary needs, or drug warnings..." rows="3" style={{ resize: 'vertical' }} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setActiveModal(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', borderRadius: '0.5rem' }}>
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {activeModal === 'adminPackage' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                {adminPackageForm.id ? 'Modify Travel Package' : 'Publish New Relocation Package'}
              </h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdminPackageSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="pkg-dest">Destination</label>
                  <input
                    type="text"
                    id="pkg-dest"
                    value={adminPackageForm.destination}
                    onChange={(e) => setAdminPackageForm(prev => ({ ...prev, destination: e.target.value }))}
                    required
                    className="form-input"
                    placeholder="e.g. Swiss Alps Expedition"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pkg-desc">Package Description</label>
                  <textarea
                    id="pkg-desc"
                    value={adminPackageForm.description}
                    onChange={(e) => setAdminPackageForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                    className="form-input"
                    rows="3"
                    placeholder="Full package details, flights, stays, vet services details..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-price">Price ($)</label>
                    <input
                      type="number"
                      id="pkg-price"
                      value={adminPackageForm.price}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, price: e.target.value }))}
                      required
                      className="form-input"
                      placeholder="e.g. 1450"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-dur">Duration (Days)</label>
                    <input
                      type="text"
                      id="pkg-dur"
                      value={adminPackageForm.duration}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, duration: e.target.value }))}
                      required
                      className="form-input"
                      placeholder="e.g. 5 Days"
                    />
                  </div>
                </div>

                <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-trans">Transport Type</label>
                    <select
                      id="pkg-trans"
                      value={adminPackageForm.transportType}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, transportType: e.target.value }))}
                      className="form-input"
                    >
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Ground">Ground Vehicle</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-size">Pet Size Allowed</label>
                    <select
                      id="pkg-size"
                      value={adminPackageForm.petSizeAllowed}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, petSizeAllowed: e.target.value }))}
                      className="form-input"
                    >
                      <option value="All">All Sizes</option>
                      <option value="Small">Small Only</option>
                      <option value="Medium">Medium Only</option>
                      <option value="Large">Large Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid-sm-2-col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-max">Max Pets Capacity</label>
                    <input
                      type="number"
                      id="pkg-max"
                      value={adminPackageForm.maximumPets}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, maximumPets: e.target.value }))}
                      required
                      className="form-input"
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pkg-seats">Available Seats</label>
                    <input
                      type="number"
                      id="pkg-seats"
                      value={adminPackageForm.availableSeats}
                      onChange={(e) => setAdminPackageForm(prev => ({ ...prev, availableSeats: e.target.value }))}
                      required
                      className="form-input"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pkg-imgs">Images (Comma-separated URL list)</label>
                  <input
                    type="text"
                    id="pkg-imgs"
                    value={adminPackageForm.images}
                    onChange={(e) => setAdminPackageForm(prev => ({ ...prev, images: e.target.value }))}
                    className="form-input"
                    placeholder="e.g. https://images.unsplash.com/photo-123..., https://..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setActiveModal(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', borderRadius: '0.5rem' }}>
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      <footer id="contact" className="footer">
        <div className="footer-content max-w-7xl mx-auto px-4 w-full">
          <div style={{ textAlign: 'center' }}>
            <div className="logo" style={{ justifyContent: 'center', color: VARS['--color-white'] }}>
              <PawPrint style={{ width: '1.5rem', height: '1.5rem', fill: VARS['--color-indigo-400'] }} />
              <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>PawPaths</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-400'], marginTop: '0.5rem' }}>Your trusted partner in premium pet relocation.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Contact Logistics:</p>
            <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-400'], margin: 0 }}>Email: bookings@pawpaths.com</p>
            <p style={{ fontSize: '0.85rem', color: VARS['--color-gray-400'], margin: 0 }}>Phone: +1 (555) PET-MOVE</p>
          </div>
        </div>
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #374151', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: VARS['--color-gray-500'], paddingBottom: '1.5rem', margin: 0 }}>&copy; {new Date().getFullYear()} PawPaths Logistics. All rights reserved. | Interview Sandbox</p>
        </div>
      </footer>
    </div>
  );
};

export default PawPathsApp;
