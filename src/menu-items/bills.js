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
     id: 'incomingBills',
     title: 'Gelen Faturalar',
     type: 'item',
     url: '/incomingBills',
     icon: icons.IconReceipt,
     breadcrumbs: false
   },
   {
    id: 'outcomingBills',
    title: 'Giden Faturalar',
    type: 'item', 
    url: '/outcomingBills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
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
    title: 'E-Fatura Oluştur',
    type: 'item',
    url: '/ebills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
  {
    id: 'createPurchaseBills',
    title: 'Alış Faturası Oluştur',
    type: 'item',
    url: '/createPurchaseBills',
    icon: icons.IconReceipt,
    breadcrumbs: false
  },
   ]
};

export default bills;
