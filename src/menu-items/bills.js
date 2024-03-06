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
     id: 'bills',
     title: 'Gelen Faturalar',
     type: 'item',
     url: '/bills',
     icon: icons.IconReceipt,
     breadcrumbs: false
   },
   {
    id: 'bills',
    title: 'Giden Faturalar',
    type: 'item',
    url: '/bills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
  {
    id: 'bills',
    title: 'Alış Faturaları',
    type: 'item',
    url: '/bills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
  {
    id: 'bills',
    title: 'E-Fatura Oluştur',
    type: 'item',
    url: '/bills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
  {
    id: 'bills',
    title: 'Alış Faturası Oluştur',
    type: 'item',
    url: '/bills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
   ]
};

export default bills;
