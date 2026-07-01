import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { PackageCard } from '../components/PackageCard';
import { QuoteForm } from '../components/BookingForm';
import { getPackages } from '../services/packageService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Plane, Briefcase, Dog, MessageSquare } from '../components/Icons';

export const Home = ({ setView, onSelectPackage, onBookPackage }) => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const pkgs = await getPackages();
        setFeaturedPackages(pkgs.slice(0, 3));
      } catch (err) {
        console.error('Error fetching featured packages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleBookClick = (pkg) => {
    onBookPackage(pkg);
  };

  return (
    <div>
      <Hero onExploreClick={() => setView('packages')} />

      {/* Featured Packages Section */}
      <section style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Featured Pet Packages</h2>
          
          {loading ? (
            <LoadingSpinner message="Fetching featured relocation packages..." />
          ) : (
            <div className="grid-3-col">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  pkg={pkg}
                  onDetailsClick={() => {
                    onSelectPackage(pkg);
                  }}
                  onBookClick={() => handleBookClick(pkg)}
                />
              ))}
            </div>
          )}

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <button onClick={() => setView('packages')} className="btn btn-primary">
              View All Travel Packages
            </button>
          </div>
        </div>
      </section>

      {/* Estimator Section */}
      <section id="estimator" className="py-16" style={{ background: 'var(--color-gray-50)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Quick Quote Calculator</h2>
          <QuoteForm />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '4rem 0', background: 'var(--color-white)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Why Choose PawPaths?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Plane style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
                Door-to-Door Service
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', lineHeight: '1.5', margin: 0 }}>
                We handle all logistics, from pickup at your current home to drop-off at your destination.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Briefcase style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
                Vet & Documentation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', lineHeight: '1.5', margin: 0 }}>
                Our experts manage all required vet checks, permits, and complex international paperwork.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Dog style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
                Comfort Travel
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', lineHeight: '1.5', margin: 0 }}>
                Only approved, pet-safe airlines and premium, climate-controlled ground transport are used.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <MessageSquare style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
                24/7 Support
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', lineHeight: '1.5', margin: 0 }}>
                Dedicated travel coordinators provide real-time updates and support throughout the entire journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
