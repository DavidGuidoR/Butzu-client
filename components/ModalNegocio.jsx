// ActionModal.js
import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

export default function ActionModal({ visible, onClose, onEdit, onDelete, onView }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Button title="Editar" onPress={onEdit} />
          <Button title="Eliminar" onPress={onDelete} />
          <Button title="Ver" onPress={onView} />
          <Button title="Cerrar" onPress={onClose} />
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
});
