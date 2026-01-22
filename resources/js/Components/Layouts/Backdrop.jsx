import React from 'react';
import { useSidebar } from '../../Contexts/SidebarContext';

const Backdrop = () => {
  const { isMobileOpen, setMobileOpen } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div 
      onClick={() => setMobileOpen(false)}
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
    ></div>
  );
};

export default Backdrop;