import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteConfirmationModal from '../../src/components/Negocio/DeleteConfirmationModal';
import { useNavigation } from '@react-navigation/native';

const OptionModal = ({ isVisible, onClose, onEdit, onDelete }) => {
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
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <TouchableOpacity onPress={handleEdit} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: '#000', fontSize: 14 }}>Editar</Text>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: '#e00', fontSize: 14 }}>Eliminar</Text>
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
};

export default OptionModal;
