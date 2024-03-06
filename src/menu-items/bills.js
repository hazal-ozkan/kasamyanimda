// assets

import { IconReceipt } from '@tabler/icons-react';
const icons = { IconReceipt };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const bills = {
 id: 'bills',
 
 type: 'group',
 children: [
   {
     id: 'bills',
     title: 'Faturalar',
     type: 'item',
     url: '/bills',
     icon: icons.IconReceipt,
     breadcrumbs: false
   },
   ]
};

export default bills;
