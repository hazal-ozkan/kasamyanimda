import { IconUsers } from '@tabler/icons-react';
const icons = { IconUsers };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const users = {
  id: 'users',
  
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Kullanicilar',
      type: 'item',
      url: '/users',
      icon: icons.IconUsers,

      breadcrumbs: false
    },]
};

export default users;