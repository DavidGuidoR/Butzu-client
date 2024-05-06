import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const DeleteConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text style={{ marginBottom: 20 }}>¿Estás seguro de que deseas eliminar este ítem?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onConfirm} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;
