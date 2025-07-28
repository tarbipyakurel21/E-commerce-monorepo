import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import LocationIndicator from './LocationIndicator';
import SearchBar from './SearchBar';
import logo from '../../assets/MyShop.png';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';

//Top navigation bar containing search bar and all 
const TopNav = () => {
  // theme for changing to dark or light
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  // use the cart from redux store
  //cartItems is an array of items in cart which state is stored in redux
  const cartItems = useSelector(state => state.cart.items);
  //keep the count of cartlength to update besides the cart
  const cartCount = cartItems.length;

  return (
    <>
      <div className={`top-nav container-fluid py-2 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <div className="row align-items-center gx-2">
          {/* Logo + Location */}
          <div className="col-6 col-md-3 d-flex align-items-center mb-2 mb-md-0">
            <div className="logo d-flex align-items-center me-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src={logo} alt="MyShop Logo" style={{ height: '35px', marginRight: '8px' }} />
              <h5 className="mb-0 d-none d-sm-block">MyShop</h5>
            </div>
            <div className="d-none d-md-block">
               {/* To update the location */}
              <LocationIndicator />
            </div>
          </div>
  
          {/* Search Bar */}
          <div className="col-12 col-md-5 mb-2 mb-md-0">
            <SearchBar/>
          </div>
  
          {/* Login and Register */}
          <div className="col-6 col-md-4 d-flex justify-content-end align-items-center gap-3 flex-wrap">
            <div
              className="d-flex flex-column align-items-start"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              <small>Hello, sign in</small>
              <strong>Account & Lists</strong>
            </div>
          {/* View Orders of user */}
            <div
              className="d-none d-md-flex flex-column align-items-start"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/orders')}
            >
              <small>Returns</small>
              <strong>& Orders</strong>
            </div>
         {/* View Cart items*/}
            <div
              className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart className="me-1" />
              <strong>Cart</strong>
              {cartCount > 0 && (
                <span className="badge bg-success ms-1" style={{ fontSize: '0.7rem' }}>
                   {/* Update the Cart Count number of items in the cart from here */}
                  {cartCount}
                </span>
              )}
            </div>
  
            {/* Theme toggling */}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={toggleTheme}
              title="Toggle Dark/Light Mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default TopNav;
