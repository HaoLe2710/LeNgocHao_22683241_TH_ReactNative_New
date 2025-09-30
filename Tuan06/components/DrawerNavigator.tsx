import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import DrawerHomeScreen from '../pages/DrawerHomeScreen';
import DrawerProfileScreen from '../pages/DrawerProfileScreen';
import SettingsScreen from '../pages/SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 300,
        },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        drawerItemStyle: {
          marginVertical: 4,
          borderRadius: 8,
        },
        drawerActiveBackgroundColor: '#E3F2FD',
      }}
    >
      <Drawer.Screen 
        name="DrawerHome" 
        component={DrawerHomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="DrawerProfile" 
        component={DrawerProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;