// assets

import { IconShoppingBagSearch } from '@tabler/icons-react';
const icons = { IconShoppingBagSearch };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const products = {
 id: 'products',
 title:'Urunler',
 type: 'group',
 children: [
   {
     id: 'products',
     title: 'Urunler',
     type: 'item',
     url: '/products',
     icon: icons.IconShoppingBagSearch,
     breadcrumbs: false
   },{
    id: 'productEntry',
    title: 'Urun Girisi',
    type: 'item',
    url: '/productEntry',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productOutput',
    title: 'Urun cikisi',
    type: 'item',
    url: '/productOutput',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productRegistration',
    title: 'Urun kayiti',
    type: 'item',
    url: '/productRegistration',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productList',
    title: 'Urun listesi',
    type: 'item',
    url: '/productList',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },
   ]
};

export default products;
