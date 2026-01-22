import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* Simple grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="flex flex-col items-center max-w-xs relative z-10">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  className="dark:hidden"
                />
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo-dark.svg"
                  alt="Logo"
                  className="hidden dark:block"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Modern Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}