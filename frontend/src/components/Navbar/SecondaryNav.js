import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SecondaryNav = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const links = [
    { label: 'All', value: 'All' },
    { label: "Today's Deals", value: 'Deals' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Books', value: 'Books' },
    { label: 'Toys', value: 'Toys' },
    { label: 'Health', value: 'Health' },
  ];

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
          <button
            key={index}
            className={`btn px-3 py-1 fw-medium ${
              isActive ? 'bg-white border text-dark' : 'bg-transparent border-0 text-dark'
            }`}
            onClick={() => navigate(`/products?category=${encodeURIComponent(link.value)}`)}
            style={{
              fontSize: '0.9rem',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = '#dfe6ed'; // darker hover
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
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
