// assets

import { IconReceipt } from '@tabler/icons-react';
const icons = { IconReceipt };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const bills = {
 id: 'bills',
 title: 'Faturalar',
 type: 'group',
 children: [

  {
    id: 'PurchaseBills',
    title: 'Alış Faturaları',
    type: 'item',
    url: '/PurchaseBills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
  {
    id: 'ebills',
    title: 'E-Faturalar ',
    type: 'item',
    url: '/ebills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
 
   ]
};

export default bills;
