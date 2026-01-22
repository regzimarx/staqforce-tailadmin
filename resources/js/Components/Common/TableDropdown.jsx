import React, { useState, useRef, useEffect } from 'react';
import { createPopper } from '@popperjs/core';

const TableDropdown = ({ button, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const popperInstanceRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && contentRef.current) {
      popperInstanceRef.current = createPopper(buttonRef.current, contentRef.current, {
        placement: 'bottom-end',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ],
      });
    }

    return () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy();
      }
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (popperInstanceRef.current) {
      popperInstanceRef.current.update();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) && 
          contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div ref={buttonRef} onClick={toggle} className="cursor-pointer">
        {button}
      </div>

      <div ref={contentRef} className="z-50 fixed">
        {isOpen && (
          <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark w-40">
            <div className="space-y-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDropdown;