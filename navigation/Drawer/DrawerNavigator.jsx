import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/Home';
import InitialScreen from '../../screens/Initial';
import NegocioScreen from '../../screens/Negocio';
import LoginScreen from '../../screens/Login';
import CreateUserScreen from '../../screens/CreateUser';
import MyTabs from './BottomNavigator';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Crear el Drawer Navigator para el resto de las pantallas
function AppDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Negocio" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

// Integrar ambos navegadores
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthStack">
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AppDrawer" component={AppDrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
