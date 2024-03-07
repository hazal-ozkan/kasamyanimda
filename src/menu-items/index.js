import { useEffect, useState } from 'react';
import dashboard from './dashboard';
import sales from './sales';
import departments from './departments';
import bills from './bills';
import products from './products';
import reports from './reports';
import financial from './financial';

// ==============================|| MENU ITEMS ||============================== //

const MenuItems = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(parseJwt(token));
    }
  }, []);

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    const parsedData = JSON.parse(jsonPayload);

    // Rol bilgisini "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" anahtarı üzerinden çıkart
    const role = parsedData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Yeni bir nesne oluşturup rol bilgisini ekleyerek döndür
    return { ...parsedData, role };
  }

  let menuItems = {};

  if (user && user.role === "Kasiyer") {
    menuItems = {
      items: [sales, bills, products]
    };
  } else if (user && user.role === "Muhasebeci") {
    menuItems = {
      items: [bills,financial]
    };
  } else if (user && user.role === "Satış Danışmanı") {
    menuItems = {
      items: [products]
    };
  } else if (user && user.role === "Patron") {
    menuItems = {
      items: [dashboard, sales, departments, bills, products, reports,financial]
    };
  } else if (user && user.role === "Müdür") {
    menuItems = {
      items: [dashboard, sales, bills, products, reports,financial]
    };
  }

  return menuItems;
};

export default MenuItems;
