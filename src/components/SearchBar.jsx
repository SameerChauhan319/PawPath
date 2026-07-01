import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = 'Search destinations...' }) => {
  return (
    <div className="form-group" style={{ marginBottom: 0, width: '100%' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        style={{ padding: '0.6rem 1rem' }}
        aria-label={placeholder}
      />
    </div>
  );
};
export default SearchBar;
