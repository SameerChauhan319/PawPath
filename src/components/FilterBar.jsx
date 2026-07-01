import React from 'react';

export const FilterBar = ({ filters, setFilters, onClear }) => {
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters-panel">
      {/* Search Input */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-dest" style={{ fontSize: '0.8rem' }}>Destination</label>
        <input
          type="text"
          id="filter-dest"
          placeholder="e.g. Paris"
          value={filters.destination}
          onChange={(e) => handleFilterChange('destination', e.target.value)}
          className="form-input"
          style={{ padding: '0.5rem' }}
        />
      </div>

      {/* Budget Limit Slider */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-budget" style={{ fontSize: '0.8rem' }}>Max Budget (${filters.budget || 'Max'})</label>
        <input
          type="range"
          id="filter-budget"
          min="500"
          max="3000"
          step="100"
          value={filters.budget || 3000}
          onChange={(e) => handleFilterChange('budget', e.target.value)}
          style={{ width: '100%', accentColor: 'var(--color-indigo-600)', marginTop: '0.5rem' }}
        />
      </div>

      {/* Pet Size Allowed */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-size" style={{ fontSize: '0.8rem' }}>Pet Size Allowed</label>
        <select
          id="filter-size"
          value={filters.petSize}
          onChange={(e) => handleFilterChange('petSize', e.target.value)}
          className="form-input"
          style={{ padding: '0.5rem' }}
        >
          <option value="All">Any Size</option>
          <option value="Small">Small Only</option>
          <option value="Medium">Medium Only</option>
          <option value="Large">Large Only</option>
        </select>
      </div>

      {/* Transport Type */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-transport" style={{ fontSize: '0.8rem' }}>Transport Type</label>
        <select
          id="filter-transport"
          value={filters.transportType}
          onChange={(e) => handleFilterChange('transportType', e.target.value)}
          className="form-input"
          style={{ padding: '0.5rem' }}
        >
          <option value="">Any Transport</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
          <option value="Ground">Ground</option>
        </select>
      </div>

      {/* Minimum Rating */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-rating" style={{ fontSize: '0.8rem' }}>Min Rating</label>
        <select
          id="filter-rating"
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
          className="form-input"
          style={{ padding: '0.5rem' }}
        >
          <option value="">Any Rating</option>
          <option value="4.5">4.5+ ★</option>
          <option value="4.7">4.7+ ★</option>
          <option value="4.9">4.9+ ★</option>
        </select>
      </div>

      {/* Sorting option */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="filter-sort" style={{ fontSize: '0.8rem' }}>Sort By</label>
        <select
          id="filter-sort"
          value={filters.sortBy || ''}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="form-input"
          style={{ padding: '0.5rem' }}
        >
          <option value="">Newest Added</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button 
          type="button"
          onClick={onClear}
          className="btn btn-secondary w-full"
          style={{ padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default FilterBar;
