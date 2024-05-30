import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const EditModal = ({ visible, onClose, field, value, onChange, onSave }) => {
  const isText = field === 'description' || field === 'business_name';

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan activar los permisos para acceder a esta funcion');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>✖️</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit {field}</Text>
          {isText ? (
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={onChange}
              placeholder={`Enter new ${field}`}
            />
          ) : (
            <>
              <Image
                source={{ uri: value }}
                style={styles.previewImage}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleImageSelection}>
                <Text style={styles.saveButtonText}>Seleccionar imagen</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewImage: {
    width: '100%',
    height: 200, // Ajusta según sea necesario
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center'
  },
  saveButtonText: {
    color: 'white', // Texto en color blanco
    fontSize: 16
  }
});

export default EditModal;
