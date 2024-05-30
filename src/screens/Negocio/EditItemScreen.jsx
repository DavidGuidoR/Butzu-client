import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const EditItemScreen = ({ route, navigation }) => {
  const { itemId, itemName, itemPrice, itemTag, itemDescription, itemPhoto } = route.params; // Obtener datos del ítem a editar

  const [name, setName] = useState(itemName);
  const [price, setPrice] = useState(itemPrice);
  const [tag, setTag] = useState(itemTag);
  const [description, setDescription] = useState(itemDescription);
  const [photo, setPhoto] = useState(itemPhoto);

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos actualizados del ítem al backend para guardar los cambios
    // Puedes utilizar una función de servicio que interactúe con tu API para enviar una solicitud PUT o PATCH con los nuevos datos del ítem
    // Después de guardar los cambios, podrías navegar de regreso a la pantalla anterior o mostrar un mensaje de éxito al usuario
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del ítem"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Introduce texto aquí"
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.label}>Precio:</Text>
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
      {/* Aquí puedes agregar un componente para permitir al usuario cargar una nueva foto para el ítem */}
      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
};

export default EditItemScreen;
