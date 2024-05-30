import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';

const editIcon = require('@assets/pen.png'); // Asegúrate de tener estos iconos
const deleteIcon = require('@assets/trash-can.png');
const viewIcon = require('@assets/eye.png');

const ActionModal = ({ visible, onClose, onEdit, onDelete, onView, name }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{name}</Text>

          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Image source={editIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Image source={deleteIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onView}>
            <Image source={viewIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ActionModal;
