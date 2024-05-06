import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/NegocioDuenio';
import NegocioEspecif from '../../screens/Negocio';
import PruebaSecure from '../../screens/PruebasSecure'
import CrearNegocioScreen from '../../screens/CrearNegocio';
import MyTabs from './BottomNavigator';
import LoginScreen from '../../screens/Login';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  // // Variable para rastrear el estado de autenticación
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Verificar el token en Secure Store
  // useEffect(() => {
  //   async function checkToken() {
  //     const token = await SecureStore.getItemAsync('auth_token');
  //     setIsAuthenticated(!!token);
  //   }

  //   checkToken();
  // }, []);

  return (
    <Drawer.Navigator>
        <Drawer.Screen
          name="Tabs"
          component={MyTabs}
          options={{ drawerItemStyle: { height: 0 } }}
          />
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} />
        <Drawer.Screen 
          name="Login" 
          component={HomeScreen} />
        <Drawer.Screen 
          name="Prueba secure" 
          component={PruebaSecure} />

          <Drawer.Screen 
          name="NegocioEspecif" 
          component={NegocioEspecif} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="CrearNegocio" 
           component={CrearNegocioScreen} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="Negocios" 
          component={NegocioScreen} /> 

      {/* Rutas protegidas */}  
      {/* {isAuthenticated ? (
        <>
          <Drawer.Screen 
          name="NegocioEspecif" 
          component={NegocioEspecif} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="CrearNegocio" 
           component={CrearNegocioScreen} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="Negocios" 
          component={NegocioScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen 
          name="NegocioEspecif" 
          component={LoginScreen} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="CrearNegocio" 
           component={LoginScreen} 
          options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen 
          name="Negocios" 
          component={LoginScreen} />
        </>
      )} */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;