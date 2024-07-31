// assets
import { IconBrandChrome, IconHelp, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconSettings };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.IconSettings, // Using IconSettings for the Settings menu item
      breadcrumbs: false
    }
  ]
};

export default other;
