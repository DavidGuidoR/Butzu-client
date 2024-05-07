import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/NegocioDuenio';
import NegocioEspecif from '../../screens/Negocio';
import PruebaSecure from '../../screens/PruebasSecure'
import CrearNegocioScreen from '../../screens/CrearNegocio';
import MyTabs from './BottomNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

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
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;