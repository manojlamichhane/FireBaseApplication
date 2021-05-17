import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigation from './HomeNavigation';
import ProfileScreen from '../Screens/ProfileScreen';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={props => <ProfileScreen {...props} />}>
      <Drawer.Screen name="drawer" component={HomeNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
