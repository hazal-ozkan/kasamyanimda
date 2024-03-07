// assets

import { IconBusinessplan, IconUserDollar } from '@tabler/icons-react';
const icons = { IconBusinessplan };
const iconDollar = { IconUserDollar };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const financial = {
  id: 'financial',
  title:'Mali Hareketler',
  type: 'group',
  children: [
    {
      id: 'incoming',
      title: 'Gelir',
      type: 'item',
      url: '/incoming',
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    },
    {
      id: 'outgoing',
      title: 'Gider',
      type: 'item',
      url: '/outgoing',
      icon: iconDollar.IconUserDollar,
      breadcrumbs: false
    },{
        id: 'types',
        title: 'Gelir/Gider Turleri',
        type: 'item',
        url: '/types',
        icon: iconDollar.IconUserDollar,
        breadcrumbs: false
      },]
};

export default financial;
