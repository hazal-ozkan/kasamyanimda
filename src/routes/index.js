import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect,useState } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  const routes = user ? [MainRoutes] : [AuthenticationRoutes];

  return useRoutes(routes);
  
}
