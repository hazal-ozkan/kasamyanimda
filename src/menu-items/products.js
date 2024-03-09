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
    title: 'Stok Çıkışı',
    type: 'item',
    url: '/productOutput',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },{
    id: 'productRegistration',
    title: 'Stok Girişi',
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
  {
    id: 'variantList',
    title: 'Varyasyon Listesi',
    type: 'item',
    url: '/variantList',
    icon: icons.IconShoppingBagSearch,
    breadcrumbs: false
  },
   ]
};

export default products;
