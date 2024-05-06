import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../../screens/Home/Home';
import NegocioScreen from '../../../screens/Negocio/Negocio';
import MyTabs from './BottomNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Negocio" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;