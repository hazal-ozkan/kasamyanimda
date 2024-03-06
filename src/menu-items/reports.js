// assets

import { IconReportAnalytics } from '@tabler/icons-react';
const icons = { IconReportAnalytics };


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reports = {
 id: 'reports',
 
 type: 'group',
 children: [
   {
     id: 'reports',
     title: 'Raporlar',
     type: 'item',
     url: '/reports',
     icon: icons.IconReportAnalytics,
     breadcrumbs: false
   },
   ]
};

export default reports;
