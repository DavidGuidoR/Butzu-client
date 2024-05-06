import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

function BarraDeBusqueda() {
  const [texto, setTexto] = useState('');
  const [mostrarImagen, setMostrarImagen] = useState(true);

  const handleFocus = () => {
    setMostrarImagen(false);
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        onChangeText={setTexto}
        value={texto}
        placeholder="Buscar..."
        onFocus={handleFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#ededed',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ededed',
    height: 50,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default BarraDeBusqueda;
