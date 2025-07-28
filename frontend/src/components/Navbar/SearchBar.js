import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { searchProducts } from '../../api/product'; // Should return product array

// search bar is using url encoding to navigate to products page sending search value 
const SearchBar= ()=> {
  //search term for searching in the bar
   const [searchTerm, setSearchTerm] = useState('');
   //category to search defaults to All
  const [selectedCategory, setSelectedCategory] = useState('All');
  //search suggestions array which will hit search api
  const [suggestions, setSuggestions] = useState([]);
  //show suggestions as we type
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const categories = ['Electronics', 'Fashion'];

  //handle search after search button is clicked or enter is pressed
  const handleSearch = () => {
    if (searchTerm.trim()) {
      //navigate to products page which will use query parameters to run api search based on
      //the passed category and search term from the uri component in useEffect in productspage
      navigate(
        `/products?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`
      );
      setShowSuggestions(false);
    }
  };

  // if key is enter search the item
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  // when pressed on suggestion setSearchTerm as the suggestion and close the suggestion box
  //then search the suggested item from products page 
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    navigate(
      `/products?search=${encodeURIComponent(suggestion)}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  // when searchTerm changes set suggestion by calling searchProducts api search by name
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      searchProducts(searchTerm)
        .then((res) => {
          //store products name in names array then set suggestions array and show
          //suggestions
        const names=res.data.map((p)=>p.name);
          setSuggestions(names);
          setShowSuggestions(true);
        })
        .catch((err) => {
          console.error('Failed to fetch suggestions:', err);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return (<div className="d-flex align-items-stretch w-100" style={{
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    height: '38px',
    borderRadius: '8px',
    boxShadow: '0 0 4px rgba(0,0,0,0.1)'
  }}>
    {/* Dropdown */}
    <div style={{ flex: '0 0 150px' }}>
      <select
        className="form-select rounded-0 h-100"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* Input */}
    <div className="position-relative flex-grow-1">
      <input
        type="text"
        className="form-control rounded-0 h-100"
        placeholder="Search products...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
        {/* suggestions.length should be greater than 0 to ensure we don't 
        show an empty box without suggestion */}
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
      style={{ backgroundColor: '#febd69', borderRadius: '0', minWidth: '60px' }}
    >
      <FaSearch />
    </button>
  </div>
  );
};

export default SearchBar;
