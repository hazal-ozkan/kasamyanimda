// assets

import { IconReportAnalytics } from '@tabler/icons-react';
const icons = { IconReportAnalytics };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reports = {
 id: 'reports',
 title:'Raporlar',
 type: 'group',
 children: [
  {
    id: 'reports',
    title: 'Günlük Rapor',
    type: 'item',
    url: '/reports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
  {
    id: 'reports',
    title: 'Aylık Rapor',
    type: 'item',
    url: '/reports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
  {
    id: 'reports',
    title: 'Yılllık Rapor',
    type: 'item',
    url: '/reports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
   {
     id: 'reports',
     title: 'Ürün Hareketleri Raporu',
     type: 'item',
     url: '/reports',
     icon: icons.IconReportAnalytics,
     breadcrumbs: false
   },
  
   ]
};

export default reports;
