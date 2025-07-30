'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const messages = [
  {
    title: 'Welcome to MyShop',
    desc: 'Created with React & Powered by Spring Boot Microservices',
    image: '/herosection1.jpg',
  },
  {
    title: `What's in your Cart?`,
    desc: 'Managed by Redux',
    image: '/herosection2.jpg',
  },
  {
    title: 'Fast & Secure Checkout',
    desc: 'Powered by Stripe Integration',
    image: '/herosection3.jpg',
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [hasAutoSlid, setHasAutoSlid] = useState(false);

  // Auto-slide ONCE after 4 seconds
  useEffect(() => {
    if (!hasAutoSlid) {
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setHasAutoSlid(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoSlid]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % messages.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + messages.length) % messages.length);
  const current = messages[index];

  return (
    <div className="relative h-[30vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative h-full w-full"
        >
          {/* Background Image */}
          <Image
            src={current.image}
            alt={current.title}
            fill
            quality={100}
            priority
            className="z-0 object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {current.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90">{current.desc}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
        aria-label="Previous Slide"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
        aria-label="Next Slide"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default HeroSection;
