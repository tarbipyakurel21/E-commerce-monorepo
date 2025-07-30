'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { searchProducts } from '@/services/product'; // Adjust as needed
import 'bootstrap/dist/css/bootstrap.min.css'; // using bootstrap 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
  const categories = ['Electronics', 'Fashion'];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const query = new URLSearchParams();
      query.set('search', searchTerm.trim());
      if (selectedCategory !== 'All') {
        query.set('category', selectedCategory);
      }
      router.push(`/products?${query.toString()}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    const query = new URLSearchParams();
    query.set('search', suggestion);
    if (selectedCategory !== 'All') {
      query.set('category', selectedCategory);
    }
    router.push(`/products?${query.toString()}`);
  };

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      searchProducts(searchTerm)
        .then((res) => {
          const names = res.data.map((p: any) => p.name);
          setSuggestions(names);
          setShowSuggestions(true);
        })
        .catch((err) => {
          console.error('Suggestion fetch error:', err);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return (
    <div
      className="d-flex align-items-stretch w-100"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        height: '38px',
        borderRadius: '8px',
        boxShadow: '0 0 4px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Category Dropdown */}
      <div style={{ flex: '0 0 150px' }}>
        <select
          className="form-select rounded-0 h-100"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input + Suggestions */}
      <div className="position-relative flex-grow-1">
        <input
          type="text"
          className="form-control rounded-0 h-100"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="list-group position-absolute w-100"
            style={{
              top: '100%',
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto',
              borderRadius: '0 0 8px 8px',
            }}
          >
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(s)}
                style={{ cursor: 'pointer' }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        className="btn text-white"
        onClick={handleSearch}
        style={{
          backgroundColor: '#febd69',
          borderRadius: '0',
          minWidth: '60px',
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
