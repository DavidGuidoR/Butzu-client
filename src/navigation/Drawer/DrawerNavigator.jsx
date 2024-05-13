import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import HomeScreen from '@screens/Home/Home';
import ProfileScreen from '@screens/Profile';
import NegocioScreen from '@screens/Negocio/NegocioDuenio';
import NegocioEspecif from '@screens/Negocio/NegocioGen';
import LoginScreen from '@screens/Login';
import PruebaSecure from '@screens/PruebasSecure'
import CrearNegocioScreen from '@screens/Negocio/CrearNegocio';
import CreateUserScreen from '@screens/CreateUser';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from '@screens/Home/Initial';
import EditItemScreen from '@screens/Negocio/EditItemScreen'
import CreateItemScreen from '@screens/Negocio/CreateItemScreen'

const ojoImage = require('@assets/ojo.png')
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: 'black', flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20, height: 200 }}>
        <Image source={ojoImage} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 50 }} />
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
      <Drawer.Screen
        name="EditarItem"
        component={EditItemScreen} />
      <Drawer.Screen
        name="Registro"
        component={InitialScreen} />
      <Drawer.Screen
        name="CrearItem"
        component={CreateItemScreen} />
      <Drawer.Screen name="Cerrar sesión" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='EditItemScreen'
        component={EditItemScreen}
      />
    </Stack.Navigator>
  );
}


// Integrar ambos navegadores
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthStack">
      <Stack.Screen name="AppDrawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
