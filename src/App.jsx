import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Modal from './components/Modal';
import ReviewCard from './components/ReviewCard';
import { getPackageById } from './services/packageService';
import { Star } from './components/Icons';
import { LoadingSpinner } from './components/LoadingSpinner';

const AppContent = () => {
  const [view, setView] = useState('home');
  const [feedback, setFeedback] = useState({ message: '', isSuccess: false });
  const [selectedPkg, setSelectedPkg] = useState(null);
  
  // Package Details Modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailedPkgData, setDetailedPkgData] = useState({ package: null, reviews: [] });
  const [loadingDetails, setLoadingDetails] = useState(false);

  const showFeedback = (msg, isSuccess = false) => {
    setFeedback({ message: msg, isSuccess });
    setTimeout(() => {
      setFeedback({ message: '', isSuccess: false });
    }, 4500);
  };

  const handleSelectPackage = async (pkg) => {
    setSelectedPkg(pkg);
    setDetailedPkgData({ package: pkg, reviews: [] });
    setDetailsModalOpen(true);
    setLoadingDetails(true);
    try {
      const data = await getPackageById(pkg._id);
      setDetailedPkgData({ package: data.package, reviews: data.reviews });
    } catch (err) {
      console.error('Error fetching package details reviews:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleBookPackage = (pkg) => {
    setSelectedPkg(pkg);
    setView('booking');
  };

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{ width: '1.1rem', height: '1.1rem', color: i <= floorRating ? '#f59e0b' : '#cbd5e1' }} 
          fill={i <= floorRating ? '#f59e0b' : 'none'}
        />
      );
    }
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>{stars}</span>;
  };

  // Auto-scroll to top on view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="app-container">
      <Navbar currentView={view} setView={setView} />

      {/* Standardized Toast Alerts */}
      {feedback.message && (
        <div className="max-w-7xl mx-auto px-4 w-full" style={{ marginTop: '1.25rem', position: 'relative', zIndex: 60 }}>
          <div className={`alert ${feedback.isSuccess ? 'alert-success' : 'alert-error'}`}>
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      <main>
        {view === 'home' && (
          <Home 
            setView={setView} 
            onSelectPackage={handleSelectPackage} 
            onBookPackage={handleBookPackage} 
          />
        )}
        
        {view === 'packages' && (
          <Packages 
            setView={setView} 
            onSelectPackage={handleSelectPackage} 
            onBookPackage={handleBookPackage} 
            showFeedback={showFeedback}
          />
        )}
        
        {view === 'booking' && (
          <ProtectedRoute setView={setView}>
            <Booking 
              selectedPkg={selectedPkg} 
              setView={setView} 
              showFeedback={showFeedback} 
            />
          </ProtectedRoute>
        )}
        
        {view === 'bookings' && (
          <ProtectedRoute setView={setView}>
            <Dashboard 
              setView={setView} 
              showFeedback={showFeedback} 
            />
          </ProtectedRoute>
        )}
        
        {view === 'pets' && (
          <ProtectedRoute setView={setView}>
            <Pets showFeedback={showFeedback} />
          </ProtectedRoute>
        )}
        
        {view === 'profile' && (
          <ProtectedRoute setView={setView}>
            <Profile showFeedback={showFeedback} />
          </ProtectedRoute>
        )}
        
        {view === 'login' && (
          <Login 
            setView={setView} 
            showFeedback={showFeedback} 
          />
        )}
        
        {view === 'register' && (
          <Register 
            setView={setView} 
            showFeedback={showFeedback} 
          />
        )}
        
        {view === 'admin' && (
          <ProtectedRoute setView={setView} requireAdmin={true}>
            <AdminDashboard showFeedback={showFeedback} />
          </ProtectedRoute>
        )}
      </main>

      <Footer />

      {/* Package Details and Reviews Modal */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title="Destination Itinerary & Reviews"
        maxWidth="650px"
      >
        {detailedPkgData.package && (
          <div>
            <img 
              src={detailedPkgData.package.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'} 
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.25rem', border: '1px solid var(--color-gray-200)' }} 
              alt={detailedPkgData.package.destination} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--color-gray-900)' }}>
                {detailedPkgData.package.destination}
              </h4>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-indigo-600)' }}>
                ${detailedPkgData.package.price}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span className="badge badge-approved" style={{ border: 'none' }}>{detailedPkgData.package.transportType}</span>
              <span className="badge badge-paid" style={{ border: 'none' }}>Allows size: {detailedPkgData.package.petSizeAllowed}</span>
              <span className="badge badge-pending" style={{ border: 'none' }}>Seats Left: {detailedPkgData.package.availableSeats}</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-700)', lineHeight: '1.5', marginBottom: '2rem' }}>
              {detailedPkgData.package.description}
            </p>

            <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '1.5rem' }}>
              <h5 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-gray-900)' }}>
                <span>Customer Testimonials ({detailedPkgData.reviews.length})</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.95rem' }}>
                  {renderStars(detailedPkgData.package.rating)}
                  <span style={{ color: 'var(--color-gray-600)', marginLeft: '0.25rem' }}>
                    {detailedPkgData.package.rating?.toFixed(1) || '0.0'} / 5.0
                  </span>
                </span>
              </h5>

              {loadingDetails ? (
                <div style={{ padding: '2rem 0' }}>
                  <LoadingSpinner message="Fetching customer reviews..." />
                </div>
              ) : detailedPkgData.reviews.length === 0 ? (
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', padding: '1.5rem 0' }}>
                  No reviews have been written for this trip package yet.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {detailedPkgData.reviews.map((rev) => (
                    <ReviewCard key={rev._id} review={rev} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="modal-footer" style={{ borderTop: 'none', padding: '1rem 0 0 0', background: 'transparent' }}>
          <button 
            type="button" 
            onClick={() => setDetailsModalOpen(false)} 
            className="btn btn-secondary" 
            style={{ borderRadius: '0.5rem', padding: '0.5rem 1.5rem' }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
