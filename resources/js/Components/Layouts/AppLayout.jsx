import React from 'react';
import { usePage } from '@inertiajs/react';
import { useSidebar } from '../../Contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Backdrop from './Backdrop';
import Preloader from '../Common/Preloader';

const AppLayout = ({ children }) => {
  const { props } = usePage();
  const { auth } = props;
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <Preloader />
      <div>
        <Sidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[260px]" : "lg:ml-[70px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <Header user={auth.user} />
        <div className="p-2 mx-auto max-w-[--breakpoint-2xl] md:p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;