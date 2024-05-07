// SecureForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SecureForm() {
  // Estados para los valores del formulario
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [deleteKey, setDeleteKey] = useState(''); // Nuevo estado para la clave a eliminar
  const [storedData, setStoredData] = useState('');

  // Guardar datos en Secure Store
  async function saveData() {
    if (key && value) {
      await SecureStore.setItemAsync(key, value);
      alert('Datos guardados');
      setKey('');
      setValue('');
      loadStoredData(); // Actualiza la visualización de datos
    } else {
      alert('Por favor, llena ambos campos');
    }
  }

  // Cargar y mostrar datos desde Secure Store
  async function loadStoredData() {
    const allKeys = ['auth_token', 'auth_id'];
    let result = '';

    for (const k of allKeys) {
      const storedValue = await SecureStore.getItemAsync(k);
      result += storedValue ? `${k}: ${storedValue}\n` : '';
    }

    setStoredData(result || 'No hay datos almacenados');
  }

  // Eliminar un ítem específico desde Secure Store
  async function deleteItem() {
    if (deleteKey) {
      await SecureStore.deleteItemAsync(deleteKey);
      alert(`Clave ${deleteKey} eliminada`);
      setDeleteKey('');
      loadStoredData(); // Actualiza la visualización de datos
    } else {
      alert('Por favor, ingresa la clave a eliminar');
    }
  }

  // Cargar datos almacenados en el montaje inicial
  useEffect(() => {
    loadStoredData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Secure Store</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la clave"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el valor"
        value={value}
        onChangeText={setValue}
      />
      <Button title="Guardar" onPress={saveData} />

      <TextInput
        style={styles.input}
        placeholder="Ingrese la clave para eliminar"
        value={deleteKey}
        onChangeText={setDeleteKey}
      />
      <Button title="Eliminar" onPress={deleteItem} />

      <Text style={styles.outputTitle}>Datos Almacenados:</Text>
      <Text style={styles.output}>{storedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  output: {
    marginTop: 10,
    fontSize: 14,
  },
});

