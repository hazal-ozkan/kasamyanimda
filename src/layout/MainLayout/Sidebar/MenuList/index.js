// ... other imports
import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import MenuItems from '../../../../menu-items/index'; // Import the MenuItems component

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const menuItems = MenuItems(); // Use the MenuItems function to get the correct menu items based on the user role

  const navItems = menuItems?.items?.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
