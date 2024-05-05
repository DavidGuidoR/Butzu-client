import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Mapa } from '../components/ubicacion/Mapa';
import BarraDeBusqueda from '../components/busqueda/Barra';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <BarraDeBusqueda/>
      <Mapa style={styles.map}/>
      
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20, // Agrega un pequeño padding alrededor del contenedor
  },
  map: {
    width: '80%',
    height: '50%',
    borderRadius: 10, // Hace que los bordes del mapa sean redondeados
    shadowColor: "#000", // Agrega una sombra al mapa
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});