import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductsPage from './ProductsPage';

// just use the hero section and products page at our homepage
const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <ProductsPage />
      </div>
  );
};

export default HomePage;
