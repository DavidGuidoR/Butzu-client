import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import noImage from '@assets/no-image.png';
import editImage from '@assets/penEdit.png'

const ProductoEditModal = ({ visible, onClose, initialId, initialName, initialPrice, initialTag, initialDescription, initialPhoto, onSave }) => {
  const [id, setId] = useState(initialId);
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [tag, setTag] = useState(initialTag);
  const [description, setDescription] = useState(initialDescription);
  const [photo, setPhoto] = useState(initialPhoto);
  console.log(photo);

  const handleSave = () => {
    onSave({ id, name, price, tag, description, photo });
    onClose();
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.inputTitle}
              placeholder="Nombre del Producto"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.imageContainer}>
            <Image
              source={photo ? { uri: photo } : noImage}
              style={styles.photo}
            />
            <TouchableOpacity onPress={handleImagePick} style={styles.editImageButton}>
              <Image source={(editImage)} style={styles.editImageIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceCategoryContainer}>
            <Text style={styles.priceText}>$</Text>
            <TextInput
              style={styles.inputPrice}
              placeholder="Precio"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputCategory}
              placeholder="Categoría"
              value={tag}
              onChangeText={setTag}
            />
          </View>
          <TextInput
            style={styles.inputDescription}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputTitle: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },
  editImageIcon: {
    width: 20,
    height: 20,
  },
  priceCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    marginRight: 5,
  },
  inputPrice: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
    marginRight: 10,
    fontSize: 16,
  },
  inputCategory: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
    fontSize: 16,
  },
  inputDescription: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#B7F5F2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProductoEditModal;