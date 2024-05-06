import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigator from './src/navigation/Drawer/DrawerNavigator'
import EditItemScreen from './screens/Negocio/EditItemScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Drawer'
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditItemScreen'
          component={EditItemScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
