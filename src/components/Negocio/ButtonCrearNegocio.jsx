import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

buttonPlus = require('../../../assets/plus-button.png')

export default function ButtonCreate() {

    const navigation = useNavigation();

    // Función para redirigir a la pantalla de creación
    const navigateToCreateBusiness = () => {
      navigation.navigate('CrearNegocio');
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={navigateToCreateBusiness} style={styles.button}>
          <Image source={buttonPlus} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 60, 
      height: 60,
      borderRadius: 30, 
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    image: {
      width: 60, 
      height: 60,
      tintColor: 'black', 
    },
  });