import React, { useEffect,useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';

// Display different messages with animations
const messages=[
  { title: 'Welcome to MyShop By Tarbi', desc: 'Created with React & Powered by Spring Boot Microservices' },
  { title: `What's in your Cart?`, desc: 'Managed by Redux+Context API' },
  { title: 'Fast & Secure Checkout', desc: 'Powered by Stripe Integration' }
];

//animations
const HeroSection = () => {
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    //setIndex 0,1,2 auto rotation through prev logic
const interval=setInterval(()=>{
  setIndex(prev=>(prev+1)% messages.length);
},3000);  // runs every three seconds
  return ()=>clearInterval(interval);
},[]);

return (
  <div
  className="hero-section d-flex align-items-center justify-content-center text-center text-white"
  style={{
    backgroundColor: '#004466',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
    padding: '2rem'
  }}>  
<AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 className="display-4" >
          {messages[index].title}
        </motion.h1>
        <motion.p className="lead">
          {messages[index].desc}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      </motion.div>
      </motion.div>
    </AnimatePresence>
  </div>
);
};

export default HeroSection;
