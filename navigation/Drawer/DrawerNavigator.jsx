import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home';
import NegocioScreen from '../../screens/Negocio';
import PruebaSecure from '../../screens/PruebasSecure'
import MyTabs from './BottomNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Prueba secure" component={PruebaSecure} /> 
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Negocios" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;