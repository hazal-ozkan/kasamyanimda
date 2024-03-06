// assets

import { IconBusinessplan, IconUserDollar } from '@tabler/icons-react';
const icons = { IconBusinessplan };
const iconDollar = { IconUserDollar };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const sales = {
  id: 'sales',
  
  type: 'group',
  children: [
    {
      id: 'sales',
      title: 'Satış',
      type: 'item',
      url: '/sales',
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Musteri',
      type: 'item',
      url: '/customer',
      icon: iconDollar.IconUserDollar,
      breadcrumbs: false
    },]
};

export default sales;
