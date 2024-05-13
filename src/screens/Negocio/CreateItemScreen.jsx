import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const CreateItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); // Aquí podrías almacenar la foto del ítem si permites a los usuarios cargar una imagen

  const handleCreateItem = () => {
    // Aquí puedes enviar los datos del nuevo ítem al backend para crearlo
    // Puedes utilizar una función de servicio que interactúe con tu API para enviar una solicitud POST con los datos del nuevo ítem
    // Después de crear el ítem, podrías navegar de regreso a la pantalla anterior o mostrar un mensaje de éxito al usuario
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del ítem"
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Precio del ítem"
        keyboardType="numeric"
      />
      <TextInput
        value={tag}
        onChangeText={setTag}
        placeholder="Etiqueta del ítem"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción del ítem"
        multiline
      />
      {/* Aquí podrías agregar un componente para permitir al usuario cargar una foto para el nuevo ítem */}
      <Button title="Crear Ítem" onPress={handleCreateItem} />
    </View>
  );
};

export default CreateItemScreen;
