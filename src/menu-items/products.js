// assets

import { IconShoppingBagSearch } from '@tabler/icons-react';
const icons = { IconShoppingBagSearch };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const products = {
 id: 'products',
 title:'Ürünler',
 type: 'group',
 children: [
  {
    id: 'productOutput',
    title: 'Ürün Çıkışı',
    type: 'item',
    url: '/productOutput',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productRegistration',
    title: 'Ürün Kaydı',
    type: 'item',
    url: '/productRegistration',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productList',
    title: 'Ürün Listesi',
    type: 'item',
    url: '/productList',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },
   ]
};

export default products;
