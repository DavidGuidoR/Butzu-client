import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Mapa } from '../components/ubicacion/Mapa';
import BarraDeBusqueda from '../components/busqueda/Barra';
import MiComponente from '../components/lista/containerNegocio';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <BarraDeBusqueda/>
      <Mapa style={styles.map}/>
      <MiComponente/>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
     // Agrega un pequeño padding alrededor del contenedor
  },
  map: {
    width: 400,
    height: 250,
    borderRadius: 0, // Hace que los bordes del mapa sean redondeados
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