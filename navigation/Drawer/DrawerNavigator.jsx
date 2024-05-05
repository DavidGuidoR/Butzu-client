import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/Home';
import InitialScreen from '../../screens/Initial';
import NegocioScreen from '../../screens/Negocio';
import MyTabs from './BottomNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Initial'>
      <Drawer.Screen name="Initial" component={InitialScreen} />
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Negocio" component={NegocioScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;