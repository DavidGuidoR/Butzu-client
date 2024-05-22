import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteConfirmationModal from '@components/Negocio/DeleteConfirmationModal';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';


const editIcon = require('@assets/pen.png'); // Asegúrate de tener estos iconos
const deleteIcon = require('@assets/trash-can.png');
const viewIcon = require('@assets/eye.png');

export default function EditItemModal({ visible, onClose, onEdit, onDelete, onView, name }) {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigation = useNavigation();

  const handleEdit = () => {
    onEdit(); // Corregir esta línea
    navigation.navigate('EditItemScreen');
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.buttonTextDelete}>Eliminar</Text>
          <Icon name="trash" size={20} color="#e00" />
        </TouchableOpacity>

        <DeleteConfirmationModal
          isVisible={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5
  },
  buttonText: {
    color: '#000', fontSize: 14
  },
  buttonTextDelete: {
    color: '#e00', fontSize: 14
  },
  icon: {
    width: 20,
    height: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
