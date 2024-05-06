import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Mapa } from '../components/ubicacion/Mapa';
import BarraDeBusqueda from '../components/busqueda/Barra';
import MiComponente from '../components/lista/containerNegocio';

function HomeScreen() {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    fetch('http://192.168.3.7:3000/negocio/')
      .then(response => response.json())
      .then(data => setNegocios(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BarraDeBusqueda/>
        <View style={styles.container2}>
          <Mapa style={styles.map}/>
        </View>
        
        <View style={styles.container}>
          {negocios.map(negocio => (
            <MiComponente
              key={negocio._id} 
              photo={negocio.photo}
              business_name={negocio.business_name}
              description={negocio.description}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 35,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});
