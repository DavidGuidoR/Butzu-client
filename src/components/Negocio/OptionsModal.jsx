import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteConfirmationModal from '@components/Negocio/DeleteConfirmationModal';
import { useNavigation } from '@react-navigation/native';

const ActionModal = ({ isVisible, onClose, onEdit, onDelete, onView, itemId, itemName, itemDescription, itemImg }) => {

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
    <Modal visible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <Text style={styles.buttonText}>Editar</Text>
            <Icon name="edit" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDeleteConfirmation(true)} style={styles.button}>
            <Text style={styles.buttonDeleteText}>Eliminar</Text>
            <Icon name="trash" size={20} color="#f00" />
          </TouchableOpacity>
          <DeleteConfirmationModal
            isVisible={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={onDelete}
          />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '80%', // Ancho del modal
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
  buttonDeleteText: {
    color: '#f00',
    fontSize: 14,
  },
});

export default ActionModal;
