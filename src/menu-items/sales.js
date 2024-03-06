// assets

import { IconBusinessplan } from '@tabler/icons-react';
const icons = { IconBusinessplan };
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
    },]
};

export default sales;
