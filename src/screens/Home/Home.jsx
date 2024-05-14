import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Mapa } from '@components/ubicacion/Mapa';
import BarraDeBusqueda from '@components/busqueda/Barra';
import MiComponente from '@components/Negocio/ContainerNegocio';
import Constants from 'expo-constants';
import ButtonCreate from '@/components/Negocio/ButtonCrearNegocio';
import { useNavigation } from '@react-navigation/native';
import buttonPlus from '@assets/plus-button.png';
const apiUrl = Constants.expoConfig.extra.API_URL;


function HomeScreen() {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    fetch(apiUrl + 'negocio/')
      .then(response => response.json())
      .then(data => setNegocios(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const navigation = useNavigation();

    // Función para redirigir a la pantalla de creación
    const navigateToCreateBusiness = () => {
      navigation.navigate('CrearNegocio');
    };

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
      <TouchableOpacity 
        style={styles.button}
        onPress={navigateToCreateBusiness}>
          <Image
            source={buttonPlus}  
            style={styles.buttonText}/>
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
    borderRadius: 35,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 32,
    width: 60,
    height: 60,
    color: 'white',
    fontWeight: 'bold',
  },
});
