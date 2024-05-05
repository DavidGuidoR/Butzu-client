import React from 'react';
import { View, Text } from 'react-native';
import { useLocation } from './useLocation'; // Asegúrate de importar el hook desde la ubicación correcta



export function Mapa() {
  const location = useLocation();

  return (
    <View>
      <Text>Hola, desde el Negocioooooo</Text>
      {location && (
        <Text>Latitud: {location.coords.latitude}, Longitud: {location.coords.longitude}</Text>
      )}
    </View>
  );
}
