// assets

import { IconBusinessplan, IconUserDollar } from '@tabler/icons-react';
const icons = { IconBusinessplan };
const iconDollar = { IconUserDollar };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const sales = {
  id: 'sales',
  title:'Satış',
  type: 'group',
  children: [
    {
      id: 'sales',
      title: 'Satış Ekranı',
      type: 'item',
      url: '/sales',
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Müşteri',
      type: 'item',
      url: '/customer',
      icon: iconDollar.IconUserDollar,
      breadcrumbs: false
    },]
};

export default sales;
