// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ searchType, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={`Search ${searchType}...`}
      value={query}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;
