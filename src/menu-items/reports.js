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
    id: 'dailyReports',
    title: 'Günlük Rapor',
    type: 'item',
    url: '/dailyReports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
  {
    id: 'montlyReports',
    title: 'Aylık Rapor',
    type: 'item',
    url: '/montlyReports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
  {
    id: 'yearlyReports',
    title: 'Yılllık Rapor',
    type: 'item',
    url: '/yearlyReports',
    icon: icons.IconReportAnalytics,
    breadcrumbs: false
  },
   {
     id: 'productsMoveReports',
     title: 'Ürün Hareketleri Raporu',
     type: 'item',
     url: '/productsMoveReports',
     icon: icons.IconReportAnalytics,
     breadcrumbs: false
   },
  
   ]
};

export default reports;
