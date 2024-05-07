import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';


// Obtén el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

const MiComponente = ({ photo, business_name, description }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: photo || '../assets/no-image.png'}} // Reemplaza con el path de tu imagen
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{business_name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row', // Alinea los elementos hijos en una fila
    padding: 12,
    backgroundColor: '#ffffff', // Fondo blanco para el contenedor
    borderRadius: 20, // Bordes redondeados
    alignItems: 'center', // Centra los elementos verticalmente
    justifyContent: 'center',
    shadowColor: '#000', // Sombra para el contenedor
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Establecer el ancho al ancho de la pantalla menos un margen deseado
    width: screenWidth - 40, // por ejemplo, 20 de margen a cada lado
    alignSelf: 'center', // Asegúrate de que el contenedor se centre en la pantalla
  },
  image: {
    width: 50, // Ancho de la imagen
    height: 50, // Altura de la imagen
    borderRadius: 25, // Hace la imagen circular
  },
  textContainer: {
    flex: 1, // Toma el espacio restante en el contenedor
    margin:10, // Margen entre la imagen y el texto
  },
  title: {
    fontWeight: 'bold', // Negrita para el título
    fontSize: 18,
    paddingBottom:10 // Tamaño de fuente para el título
  },
  description: {
    color: 'gray', // Color gris para la descripción
  },
});

export default MiComponente;
