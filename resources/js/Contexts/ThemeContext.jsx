import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    updateDOMTheme(initialTheme);
  }, []);

  const updateDOMTheme = (themeValue) => {
    const html = document.documentElement;
    const body = document.body;
    
    if (themeValue === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark', 'bg-gray-900');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark', 'bg-gray-900');
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      updateDOMTheme(newTheme);
      return newTheme;
    });
  }, []);

  const value = {
    theme,
    toggleTheme,
    setTheme: (newTheme) => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      updateDOMTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};