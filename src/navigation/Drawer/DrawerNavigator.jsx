import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import HomeScreen from '@screens/Home/Home';
import ProfileScreen from '@screens/Profile';
import NegocioScreen from '@screens/Negocio/NegocioDuenio';
import NegocioEspecif from '@screens/Negocio/NegocioGen';
import LoginScreen from '@screens/Login';
import PruebaSecure from '@screens/PruebasSecure';
import CrearNegocioScreen from '@screens/Negocio/CrearNegocio';
import CreateUserScreen from '@screens/CreateUser';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from '@screens/Home/Initial';
import EditItemScreen from '@screens/Negocio/EditItemScreen';
import * as SecureStore from 'expo-secure-store';
import PrivateRoute from './AuthVerify';

const ojoImage = require('@assets/ojo.png');
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}

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

function MainStackNavigator({ isAuthenticated }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NegocioEspecif" component={NegocioEspecif} />
      <Stack.Screen name="CrearNegocio"> 
        {
          props => <PrivateRoute {...props} 
          component={CrearNegocioScreen} isAuthenticated={isAuthenticated}/>
        }
      </Stack.Screen>
{/*       
      <Stack.Screen name="Iniciar sesion" component={LoginScreen} /> */}
      <Stack.Screen name="EditItemScreen" component={EditItemScreen} /> 
      <Stack.Screen name="Registro" component={CreateUserScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = useCallback(async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
    console.log('token verificado', token);
  }, []);

  function DrawerContent(props) {
    const isDrawerOpen = useDrawerStatus() === 'open';

    useEffect(() => {
      if (isDrawerOpen) {
        checkToken();
      }
    }, [isDrawerOpen, checkToken]);

    
    return <CustomDrawerContent {...props} />;
  }

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Inicio">
        {props => <MainStackNavigator {...props} isAuthenticated={isAuthenticated} />}
      </Drawer.Screen>
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="Negocios" component={NegocioScreen} />
          <Drawer.Screen name="Cerrar sesión" component={NegocioScreen} />
        </>
      ) : (
        <Drawer.Screen name="Iniciar sesion" component={LoginScreen} />
      )}
      <Drawer.Screen name="Prueba secure" component={PruebaSecure} />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;



