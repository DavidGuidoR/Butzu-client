// ActionModal.js
import React from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';

const editIcon = require('@assets/pen.png'); // Asegúrate de tener estos iconos
const deleteIcon = require('@assets/trash-can.png');
const viewIcon = require('@assets/eye.png');

export default function ActionModal({ visible, onClose, onEdit, onDelete, onView, name }) {
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
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
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
