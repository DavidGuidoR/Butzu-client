import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const OptionModal = ({ isVisible, onClose, onEdit, onDelete }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={{ marginBottom: 20 }}>¿Qué acción deseas realizar?</Text>
        <TouchableOpacity onPress={onEdit} style={{ marginBottom: 10 }}>
          <Text style={{ color: 'blue', fontSize: 18 }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={{ color: 'red', fontSize: 18 }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OptionModal;
