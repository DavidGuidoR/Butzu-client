import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EditItemScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Introduce texto aquí"
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Introduce texto aquí"
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Introduce texto aquí"
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditItemScreen;
