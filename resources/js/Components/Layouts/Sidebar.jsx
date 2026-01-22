import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { useSidebar } from '../../Contexts/SidebarContext';
import { MenuHelper } from '../Helpers/MenuHelper';

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState({
    type: 'main',
    index: null,
  });
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});
  const lastOpenedSubmenuRef = useRef(null);

  const handleLinkClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const menuGroups = React.useMemo(() => MenuHelper.getMenuGroups(), []);

  const isActive = useCallback(
    (path) => {
      const current = window.location.pathname;
      const normalizedPath = path.replace(/^\//, '');
      return current === path || current === normalizedPath;
    },
    []
  );

  useEffect(() => {
    let submenuMatched = false;
    menuGroups.forEach((menuGroup, groupIndex) => {
      const menuType = 'main';
      const items = menuGroup.items;
      items.forEach((item, index) => {
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu({ type: 'main', index: null });
    }
  }, [menuGroups, isActive]);

  useEffect(() => {
    if (openSubmenu.index !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      const isOpen = prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index;

      const prevKey = lastOpenedSubmenuRef.current;
      const newKey = isOpen ? null : `${menuType}-${index}`;

      // Store the new submenu key before we change state
      lastOpenedSubmenuRef.current = newKey;

      // Check if this is a NEW submenu (not re-opening the same one)
      if (!isExpanded && !isHovered && newKey && newKey !== prevKey) {
        // Schedule sidebar expansion
        setTimeout(() => toggleSidebar(), 0);
      }

      if (isOpen) {
        return { type: menuType, index: null };
      }
      return { type: menuType, index };
    });
  };

  const getIconSvg = (iconName) => {
    const icons = {
      dashboard: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 3.33337C2.5 2.87311 2.87289 2.50021 3.33315 2.50021H8.33315C8.79341 2.50021 9.16631 2.87311 9.16631 3.33337V7.50004C9.16631 7.9603 8.79341 8.33337 8.33315 8.33337H3.33315C2.87289 8.33337 2.5 7.96048 2.5 7.50021V3.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.8337 2.50021C10.3734 2.50021 10.0005 2.87311 10.0005 3.33337V16.6667C10.0005 17.127 10.3734 17.5 10.8337 17.5H16.667C17.1272 17.5 17.5001 17.127 17.5001 16.6667V7.50004C17.5001 7.03978 17.1272 6.66671 16.667 6.66671H10.8337V2.50021Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };

    return icons[iconName] || <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" /></svg>;
  };

  const renderMenuItems = (items, menuType, groupIndex) => (
    <ul className="flex flex-col gap-2">
      {items.map((item, itemIndex) => (
        <li key={item.name}>
          {item.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(itemIndex, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === itemIndex
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === itemIndex
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {getIconSvg(item.icon)}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{item.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <svg
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === itemIndex
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              )}
            </button>
          ) : (
            item.path && (
              <Link
                href={item.path}
                onClick={handleLinkClick}
                className={`menu-item group ${
                  isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(item.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {getIconSvg(item.icon)}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
              </Link>
            )
          )}
          {item.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${itemIndex}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === itemIndex
                    ? `${subMenuHeight[`${menuType}-${itemIndex}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-0.5 ml-8">
                {item.subItems.map((subItem, subItemIndex) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        onClick={handleLinkClick}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-pro-active"
                                : "menu-dropdown-badge-pro-inactive"
                            } menu-dropdown-badge-pro`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-12 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${
          isExpanded || isMobileOpen
            ? "w-[260px]"
            : isHovered
            ? "w-[260px]"
            : "w-[70px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
      >
        <Link href={route('home')} replace={false} className="hidden lg:block">
          {isExpanded || isHovered ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={130}
                height={35}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={130}
                height={35}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={28}
              height={28}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-4">
          <div className="flex flex-col gap-3">
            {menuGroups.map((menuGroup, groupIndex) => (
              <div key={groupIndex}>
                <h2
                  className={`mb-2 text-xs uppercase flex leading-[16px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    <span>{menuGroup.title}</span>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="currentColor" />
                    </svg>
                  )}
                </h2>
                {renderMenuItems(menuGroup.items, 'main', groupIndex)}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;