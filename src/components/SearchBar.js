// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ searchType, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass updated query to Dashboard
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={`Search ${searchType}...`}
      value={query}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;
