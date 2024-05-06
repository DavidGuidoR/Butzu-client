import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../screens/Home/Home';
import NegocioScreen from '../../../screens/Negocio/Negocio';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2090ff',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#000000' },
      }}
    >
      <Tab.Screen
        name="Home"
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