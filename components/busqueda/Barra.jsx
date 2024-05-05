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
    },
    input: {
      flex: 1,
      backgroundColor: 'lightgray',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 0,
    },
  });

export default BarraDeBusqueda;
