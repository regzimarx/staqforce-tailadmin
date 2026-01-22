export const MenuHelper = {
  getMainNavItems: () => {
    return [
      {
        icon: 'dashboard',
        name: 'Dashboard',
        path: route('dashboard'),
      },
    ];
  },

  getAdministrationItems: () => {
    return [
      {
        icon: 'charts',
        name: 'User Management',
        subItems: [
          {
            name: 'Users',
            path: route('users.index'),
            pro: false
          },
        ],
      },
    ];
  },

  getMenuGroups: () => {
    return [
      {
        title: 'Menu',
        items: MenuHelper.getMainNavItems()
      },
      {
        title: 'Administration',
        items: MenuHelper.getAdministrationItems()
      }
    ];
  }
};