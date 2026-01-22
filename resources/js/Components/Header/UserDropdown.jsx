import React, { useState, useRef, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

const UserDropdown = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { post } = useForm();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        className="flex items-center text-gray-700 dark:text-gray-400"
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        type="button"
      >
        <span className="flex items-center justify-center text-center mr-1.5 overflow-hidden rounded-full h-7 w-7 bg-gray-200 text-black dark:bg-gray-700 dark:text-white text-xs font-semibold">
          {user.initials}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user.name}</span>

        {/* Chevron Icon */}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          className="absolute right-0 mt-5 flex w-[220px] flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
        >
          {/* User Info */}
          <div className="px-2 py-1.5">
            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">{user.name}</span>
            <span className="block text-[10px] text-gray-500 dark:text-gray-400">{user.email}</span>
          </div>

          {/* Menu Items */}
          <ul className="flex flex-col gap-0.5 pt-2 pb-2 border-b border-gray-200 dark:border-gray-800">
            <li>
              <Link
                href={route('settings.profile.edit')}
                className="flex items-center gap-2 px-2 py-1.5 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <span className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Edit profile
              </Link>
            </li>
          </ul>

          {/* Sign Out */}
          <form method="POST" onSubmit={handleLogout}>
            <button
              type="submit"
              className="flex items-center w-full gap-2 px-2 py-1.5 mt-1 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <span className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </span>
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;