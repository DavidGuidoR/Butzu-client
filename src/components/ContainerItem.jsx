import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

// Importa las imagenes por defecto
const mostrarMas = require('@assets/mostrar-mas-boton.png');
const noImage = require('@assets/no-image.png')
// Obtén el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;


const ContainerItem = ({ photo, name, description, editar, onEditPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image 
        // source={photo ? { uri: photo } : noImage}
        source={noImage}
        style={styles.image}
      />

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
    height: 120
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginLeft: 20
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderStyle: 'dashed',
  },
  description: {
    marginVertical: 10,
  },
  mostrarMas: {
    width: 24,
    height: 24,
  },
});

export default ContainerItem;