import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function BarraDeBusqueda() {
  const [texto, setTexto] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTexto}
        value={texto}
        placeholder="Buscar..."
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
    borderColor: 0,
    width: 200, // Define el ancho del input
    height: 50, // Define la altura del input
    paddingHorizontal: 10, // Ajusta el padding horizontal dentro del input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Sombras para Android
    elevation: 2,
  },
});

export default BarraDeBusqueda;
