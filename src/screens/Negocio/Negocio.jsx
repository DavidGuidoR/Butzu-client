import React, { useState } from 'react';
import { View, Button } from 'react-native';
import OptionModal from './OptionModal'; // Importa el componente del modal

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEdit = () => {
    // Lógica para editar
    toggleModal();
  };

  const handleDelete = () => {
    // Lógica para eliminar
    toggleModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Mostrar Modal" onPress={toggleModal} />
      <OptionModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default MainScreen;
