import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';


// Obtén el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

// Importa la imagen local de tres puntos
const mostrarMas = require('../../../assets/mostrar-mas-boton.png');

const MiComponente = ({ photo, business_name, description, editar, onEditPress }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={photo ? { uri: photo } : require('../../../assets/no-image.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{business_name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {editar && (
        <TouchableOpacity onPress={onEditPress}>
          <Image source={mostrarMas} style={styles.mostrarMas} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: screenWidth - 40,
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
  },
  description: {
    color: 'gray',
  },
  mostrarMas: {
    width: 24,
    height: 24,
  },
});

export default MiComponente;
