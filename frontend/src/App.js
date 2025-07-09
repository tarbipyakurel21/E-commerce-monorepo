import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/Navbar/TopNav';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './pages/FooterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
       <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
       <Route path="/product/:id" element={<ProductDetailPage />} />
       <Route path="/payment/:orderId" element={<PaymentPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Footer/>
    </>
     );
};

export default App;
