import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Sales from 'views/sales';
import Customer from 'views/sales/customers';
import Users from 'views/users';
import Departments from 'views/departments';
import Bills from 'views/bills';
import Products from 'views/products';
import Reports from 'views/reports';
import ProductEntry from 'views/products/productEntry';
import ProductOutput from 'views/products/productOutput';
import ProductRegistration from 'views/products/productRegistration';
import ProductList from 'views/products/productList';
import IncomingBills from 'views/bills/incomingBills';
import OutcomingBills from 'views/bills/outcomingBills';
import PurchaseBills from 'views/bills/purchaseBills';
import EBills from 'views/bills/eBills';
import CreatePurchaseBills from 'views/bills/createPurchaseBills';
import DailyReports from 'views/reports/dailyReports';
import MontlyReports from 'views/reports/montlyReports';
import YearlyReports from 'views/reports/yearlyReports';
import ProductsMoveReports from 'views/reports/productsMoveReports';










// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'sales',
      element: <Sales />
    },
    {
      path: 'customer',
      element: <Customer />
    },
    {
      path: 'bills',
      element: <Bills />
    },
    {
      path: 'departments',
      element: <Departments />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'reports',
      element: <Reports />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'productEntry',
      element: <ProductEntry />
    },
    {
      path: 'productOutput',
      element: <ProductOutput />
    },{
      path: 'incomingBills',
      element: <IncomingBills />
    },{
      path: 'outcomingBills',
      element: <OutcomingBills />
    },{
      path: 'purchaseBills',
      element: <PurchaseBills />
    },{
      path: 'eBills',
      element: <EBills />
    },{
      path: 'createPurchaseBills',
      element: <CreatePurchaseBills />
    },
    {
      path: 'productRegistration',
      element: <ProductRegistration />
    },
    {
      path: 'productList',
      element: <ProductList />
    },{
      path: 'dailyReports',
      element: <DailyReports />
    },{
      path: 'montlyReports',
      element: <MontlyReports />
    },{
      path: 'yearlyReports',
      element: <YearlyReports />
    },{
      path: 'productsMoveReports',
      element: <ProductsMoveReports />
    },
  ]
};

export default MainRoutes;
