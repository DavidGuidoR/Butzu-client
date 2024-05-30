import React, { useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
    console.log('athenticacion',isAuthenticated);
      if (!isAuthenticated) {
        navigation.navigate('Iniciar sesion');
      }
    }, [isAuthenticated, navigation])
  );

  if (!isAuthenticated) {
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;


