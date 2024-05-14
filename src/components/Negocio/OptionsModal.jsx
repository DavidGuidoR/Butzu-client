import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteConfirmationModal from '@components/Negocio/DeleteConfirmationModal';

const ActionModal = ({ isVisible, onClose, onEdit, onDelete, onView, itemId, itemName, itemDescription, itemImg }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Definir estado para controlar la visibilidad del modal de confirmación

  return (
    <Modal visible={isVisible} onBackdropPress={onClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{itemId}</Text>

          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <Text style={styles.buttonText}>Editar</Text>
            <Icon name="edit" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDeleteConfirmation(true)} style={styles.button}> {/* Abrir modal de confirmación de eliminación */}
            <Text style={styles.buttonDeleteText}>Eliminar</Text>
            <Icon name="trash" size={20} color="#f00" />
          </TouchableOpacity>

          <DeleteConfirmationModal
            isVisible={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)} // Cerrar modal de confirmación de eliminación
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
    padding: 20,
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
    marginBottom: 10,
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
