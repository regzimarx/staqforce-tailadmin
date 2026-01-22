import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoaded(false), 350);
    };

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', handleLoad);
    } else {
      handleLoad();
    }

    return () => {
      window.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, []);

  if (!loaded) return null;

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Preloader;