import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import LocationIndicator from './LocationIndicator';
import SearchBar from './SearchBar';
import SecondaryNav from './SecondaryNav';
import logo from '../../assets/MyShop.png';
import { useSelector } from 'react-redux';


const TopNav = () => {
  const navigate = useNavigate();
  const cartItems=useSelector(state=>state.cart.items);
  const cartCount=cartItems.length;
  const categories = ['Electronics', 'Fashion', 'Books', 'Toys', 'Health'];

  return (
    <>
    <div className="top-nav d-flex align-items-center justify-content-between px-3 py-2 text-white bg-dark">
  {/* Logo + Location */}
  <div className="d-flex align-items-center">
  <div className="logo d-flex align-items-center me-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
  <img src={logo} alt="MyShop Logo" style={{ height: '40px', marginRight: '10px' }} />
  <h4 className="mb-0">MyShop</h4>
</div>
    <LocationIndicator />
  </div>

  {/* Search Bar */}
  <SearchBar categories={categories} />

  {/* User Actions */}
  <div className="user-actions d-flex align-items-center gap-3">
    <div
      className="d-flex flex-column align-items-start"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/login')}
    >
      <small>Hello, sign in</small>
      <strong>Account & Lists</strong>
    </div>

    <div
      className="d-flex flex-column align-items-start"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/orders')}
    >
      <small>Returns</small>
      <strong>& Orders</strong>
    </div>

    <div
      className="d-flex align-items-center"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/cart')}
    >
      <FaShoppingCart className="me-1" />
      <strong>Cart</strong>
      {cartCount > 0 && (
        <span className="badge bg-success ms-1" style={{ fontSize: '0.7rem' }}>
          {cartCount}
        </span>
      )}
    </div>
  </div>
</div>
 <SecondaryNav />
 </>
  );
};

export default TopNav;
