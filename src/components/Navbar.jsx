import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PawPrint, LogOut, UserIcon, Shield } from './Icons';

export const Navbar = ({ currentView, setView }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setView('home');
    setMobileMenuOpen(false);
  };

  const navigateTo = (viewName) => {
    setView(viewName);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="max-w-7xl mx-auto px-4 header-content">
        <div onClick={() => navigateTo('home')} className="logo" style={{ cursor: 'pointer' }}>
          <PawPrint className="logo-icon" style={{ width: '2rem', height: '2rem' }} />
          <span className="logo-text">PawPaths</span>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          className="nav-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <line x1="18" y1="6" x2="6" y2="18"></line>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <nav className="nav-links-desktop">
          <span onClick={() => navigateTo('home')} className={`nav-link ${currentView === 'home' ? 'active' : ''}`}>Home</span>
          <span onClick={() => navigateTo('packages')} className={`nav-link ${currentView === 'packages' ? 'active' : ''}`}>Packages</span>

          {isAuthenticated ? (
            <>
              <span onClick={() => navigateTo('bookings')} className={`nav-link ${currentView === 'bookings' ? 'active' : ''}`}>Bookings</span>
              <span onClick={() => navigateTo('pets')} className={`nav-link ${currentView === 'pets' ? 'active' : ''}`}>My Pets</span>
              <span onClick={() => navigateTo('profile')} className={`nav-link ${currentView === 'profile' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <UserIcon style={{ width: '1rem', height: '1rem' }} /> Profile
              </span>
              
              {isAdmin && (
                <span onClick={() => navigateTo('admin')} className={`nav-link ${currentView === 'admin' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-indigo-600)' }}>
                  <Shield style={{ width: '1rem', height: '1rem' }} /> Admin Panel
                </span>
              )}
              
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
                <LogOut style={{ width: '0.9rem', height: '0.9rem' }} /> Log Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => navigateTo('login')} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Sign In</button>
              <button onClick={() => navigateTo('register')} className="btn btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}>Register</button>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Links */}
      {mobileMenuOpen && (
        <nav className="mobile-nav-menu">
          <span onClick={() => navigateTo('home')} className={`nav-link ${currentView === 'home' ? 'active' : ''}`}>Home</span>
          <span onClick={() => navigateTo('packages')} className={`nav-link ${currentView === 'packages' ? 'active' : ''}`}>Packages</span>

          {isAuthenticated ? (
            <>
              <span onClick={() => navigateTo('bookings')} className={`nav-link ${currentView === 'bookings' ? 'active' : ''}`}>Bookings</span>
              <span onClick={() => navigateTo('pets')} className={`nav-link ${currentView === 'pets' ? 'active' : ''}`}>My Pets</span>
              <span onClick={() => navigateTo('profile')} className={`nav-link ${currentView === 'profile' ? 'active' : ''}`}>Profile</span>
              
              {isAdmin && (
                <span onClick={() => navigateTo('admin')} className={`nav-link ${currentView === 'admin' ? 'active' : ''}`} style={{ color: 'var(--color-indigo-600)' }}>
                  Admin Control Panel
                </span>
              )}
              
              <button onClick={handleLogout} className="btn btn-secondary w-full" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                <LogOut style={{ width: '1rem', height: '1rem' }} /> Log Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={() => navigateTo('login')} className="btn btn-secondary w-full">Sign In</button>
              <button onClick={() => navigateTo('register')} className="btn btn-primary w-full">Register</button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
export default Navbar;
