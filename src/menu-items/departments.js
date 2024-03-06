// assets

 import { IconComponents } from '@tabler/icons-react';
 const icons = { IconComponents };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const departments = {
  id: 'departments',
  
  type: 'group',
  children: [
    {
      id: 'departments',
      title: 'Departmanlar',
      type: 'item',
      url: '/departments',
      icon: icons.IconComponents,
      breadcrumbs: false
    },
    ]
};

export default departments;
