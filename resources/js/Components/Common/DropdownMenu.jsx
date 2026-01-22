import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = ({ children, button }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div ref={dropdownRef} className="relative h-fit">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {button}
      </div>
      
      {openDropDown && (
        <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark">
          <div className="space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;