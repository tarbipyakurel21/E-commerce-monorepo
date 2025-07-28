import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Categories in the navbar
const SecondaryNav = () => {
  const navigate = useNavigate();
  //use location to search in the current url
  const location=useLocation();
  const links = [
    { label: 'All', value: 'All' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Books', value: 'Books' },
  ];

  // search url for current category to style the current
  const currentCategory = new URLSearchParams(location.search).get('category');

  return (
    <div
    className="secondary-nav px-3 py-2 border-top border-bottom"
    style={{ backgroundColor: '#e7ecf0' }} // light blue-grey
  >
    <div className="d-flex justify-content-center flex-wrap gap-2">
      {links.map((link, index) => {
        const isActive = currentCategory === link.value;

        return (
          // display the link.label according to index map and style according to isActive or not
          <button
            key={index}
            className={`btn px-3 py-1 fw-medium ${isActive ? 'active-category' : ''}`}
            onClick={() => navigate(`/products?category=${encodeURIComponent(link.value)}`)}
            style={{
              fontSize: '0.9rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            
            {link.label}
          </button>
        );
      })}
    </div>
  </div>
);
};

export default SecondaryNav;
