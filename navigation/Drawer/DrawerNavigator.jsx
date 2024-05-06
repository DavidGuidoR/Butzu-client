import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/Negocio';
import MyTabs from './BottomNavigator';

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
      <Drawer.Screen name="Negocios" component={MyTabs} />
      <Drawer.Screen name="Perfil" component={HomeScreen} />
      <Drawer.Screen name="Cerrar sesión" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
