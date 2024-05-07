import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/Drawer/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}
