import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FilterBar } from '../components/FilterBar';
import { PackageCard } from '../components/PackageCard';
import { SkeletonGrid } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { getPackages } from '../services/packageService';
import { PawPrint } from '../components/Icons';

export const Packages = ({ setView, onSelectPackage, onBookPackage, showFeedback }) => {
  const { isAuthenticated } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    petSize: 'All',
    transportType: '',
    rating: '',
    sortBy: ''
  });

  useEffect(() => {
    const fetchFilteredPackages = async () => {
      setLoading(true);
      try {
        const data = await getPackages(filters);
        setPackages(data);
      } catch (err) {
        console.error('Error fetching filtered packages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredPackages();
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      budget: '',
      petSize: 'All',
      transportType: '',
      rating: '',
      sortBy: ''
    });
  };

  const handleBookClick = (pkg) => {
    if (!isAuthenticated) {
      setView('login');
      showFeedback('Please sign in to book a relocation package.', false);
      return;
    }
    onBookPackage(pkg);
  };

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-gray-900)' }}>
          Travel Packages
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '2rem' }}>
          Browse and search customized relocation itineraries for your pets.
        </p>

        {/* Filter Bar */}
        <FilterBar 
          filters={filters} 
          setFilters={setFilters} 
          onClear={handleClearFilters} 
        />

        {loading ? (
          <SkeletonGrid count={6} />
        ) : packages.length === 0 ? (
          <EmptyState 
            icon={PawPrint}
            title="No relocation packages match your criteria"
            description="Try adjusting your budget, selected pet size, transport carrier options, or clearing active filters."
            actionLabel="Reset All Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <div className="grid-3-col">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                pkg={pkg}
                onDetailsClick={() => onSelectPackage(pkg)}
                onBookClick={() => handleBookClick(pkg)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
