import React from 'react';

function SearchBar({ searchQuery, onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search by name"
      value={searchQuery}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
