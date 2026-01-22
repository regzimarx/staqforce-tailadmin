import React from 'react';

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img 
              className="mx-auto h-12 w-auto dark:hidden" 
              src="/images/logo/logo.svg" 
              alt="Logo" 
            />
            <img 
              className="mx-auto h-12 w-auto hidden dark:block" 
              src="/images/logo/logo-dark.svg" 
              alt="Logo" 
            />
          </a>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GuestLayout;