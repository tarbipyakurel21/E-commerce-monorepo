import React, { createContext, useState, useEffect,useContext } from 'react';

//create the context
export const ThemeContext = createContext();
//export the provider for children to consume
export const ThemeProvider = ({ children }) => {
  
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage the saved theme
    return localStorage.getItem('theme') || 'light';
  });

  // useEffect to set theme whenever theme changes
  useEffect(() => {
    document.body.className = theme; // set body class for global styles
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access in components
export const useTheme = () => useContext(ThemeContext);