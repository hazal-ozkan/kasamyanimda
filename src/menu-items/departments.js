// assets

 import { IconComponents } from '@tabler/icons-react';
 import { IconUsers } from '@tabler/icons-react';
 const icons = { IconComponents,IconUsers };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const departments = {
  id: 'departments',
  title:'Şirket',
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
    {
      id: 'users',
      title: 'Kullanıcılar',
      type: 'item',
      url: '/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    ]
};

export default departments;
