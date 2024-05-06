import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/Negocio';
import { useAddress } from '../../components/ubicacion/useAddress';

const Tab = createBottomTabNavigator();

function MyTabs() {
  // Usar el hook useAddress para obtener la dirección
  const address = useAddress();

  // Crear una cadena de texto con la dirección
  const direccion = address ? `${address.street}, ${address.city}, ${address.region}` : 'Cargando...';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen 
        name={direccion} // Usar la dirección como el nombre de la pestaña
        component={HomeScreen} 
        options={{ tabBarBadge: 3 }} // Opcional: agrega una insignia al ícono
      />
      <Tab.Screen 
        name="Negocio" 
        component={NegocioScreen} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={NegocioScreen} 
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/ojo.png')} // Ruta de la imagen
              style={{ width: 24, height: 24 }} // Estilo de la imagen
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
