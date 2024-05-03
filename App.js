import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/Drawer/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}
