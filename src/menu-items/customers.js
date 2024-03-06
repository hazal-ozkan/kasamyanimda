import { IconUserDollar } from '@tabler/icons-react';
const icons = { IconUserDollar };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const customers = {
  id: 'customers',
  
  type: 'group',
  children: [
    {
      id: 'customers',
     // title: 'MSusteri',
      type: 'item',
      url: '/customers',
      icon: icons.IconUserDollar,

      breadcrumbs: false
    },]
};

export default customers;