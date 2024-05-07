import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import NegocioScreen from '../../screens/NegocioDuenio';
import NegocioEspecif from '../../screens/Negocio';
import LoginScreen from '../../screens/Login';
import PruebaSecure from '../../screens/PruebasSecure'
import CrearNegocioScreen from '../../screens/CrearNegocio';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: 'black', flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20, height: 200 }}>
        <Image source={require('../../assets/ojo.png')} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 50 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: 'white', fontSize: 27, paddingVertical: 20 }}>Usuario</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen 
          name="Login" 
          component={LoginScreen} />
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
      <Drawer.Screen name="Cerrar sesión" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
