import React,{useContext}from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/Navbar/TopNav';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentPage from './pages/PaymentPage';
import { ThemeContext } from './context/ThemeContext';
import './styles/app.css'
import SecondaryNav from './components/Navbar/SecondaryNav';
import OAuthSuccessPage from './pages/OAuthSuccessPage.js';

function App() {

  const { theme } = useContext(ThemeContext);
  // use all the routes to display different pages over here 
  //also have the toast container to display from anywhere using react toast
  return (
    <div className={`app ${theme}`}>
      <TopNav />
      {/* Categories navigation */}
      <SecondaryNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccessPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Footer />
    </div>
  );
}

export default App;
