import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/Negocio';

const Tab = createBottomTabNavigator();

function MyTabs() {



  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen 
        name="a" 
        component={HomeScreen} 
        options={{ tabBarBadge: 3 }} // Opcional: agrega una insignia al ícono
      />
      <Tab.Screen 
        name="Negocio" 
        component={NegocioScreen} 
      />
    </Tab.Navigator>
  );
}

export default MyTabs;