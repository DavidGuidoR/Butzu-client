import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ActionModal from '../../components/Negocio/ModalNegocio';
import axios from 'axios';
import ContainerItem from '../../components/ContainerItem';

function NegocioEspecifScreen({ route}) {
  const {id: businessId, edit } = route.params;
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation();


  // Función para mostrar modal de opciones
  function openModalWithId(itemId, itemName) {
    setCurrentItemId(itemId);
    setCurrentItemName(itemName);
    setModalVisible(true);
  }

  // Función para la visualización
  function handleView() {
    setModalVisible(false);
    navigation.navigate('ItemView', { id: currentItemId, edit: false });
  }

  // Funciones para la edición
  function handleEdit() {
    setModalVisible(false);
    navigation.navigate('ItemEdit', { id: currentItemId, edit: true });
  }

  // Función para eliminar boton
  function handleDelete() {
    setModalVisible(false);
    // Implementar la lógica de eliminación aquí
    console.log('Eliminar negocio con ID:', currentItemId);
  }

  // Función para hacer la solicitud con encabezado
  const fetchData = async () => {
    setLoading(true);
    try {
      let token = await SecureStore.getItemAsync('auth_token');
      let userId = await SecureStore.getItemAsync('auth_id');
      if (!token || !userId) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
        userId =  '65f3a9dd8ffad84cd731ff20'
      }
      const response = await axios.get(`http://192.168.100.11:3000/negocio/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setBusinessData(response.data.negocio);
        if(response.data.negocio.items)
          {
            setItemData(response.data.negocio.items);
          }
      } else {
        setError('Error al consultar el negocio');
      }
    } catch (err) {
      setError('Error al cargar el negocio: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta en cada renderizado
  useEffect(() => {
    if (isFocused) {
    fetchData();
    }
  }, [businessId || isFocused]);

  return (
    
    <View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <Text style = {styles.text}>Negocio nombre: </Text>
      {itemData && itemData.map((item, index) => (
      
        <ContainerItem
          key={index}
          photo={item.photo}
          name={item.name}
          description={item.description}
          editar={true}
          onEditPress={() => openModalWithId(item._id, item.name)}
        />
      ))}
    </ScrollView>
    <ActionModal
    name={currentItemName}
    visible={isModalVisible}
    onClose={() => setModalVisible(false)}
    onEdit={handleEdit}
    onDelete={handleDelete}
    onView={handleView}
  />
  
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centrado vertical del contenedor principal
  },
  scrollView: {
    width: '100%',
    marginVertical: 20,
  },
  view: {

  },
  text: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'grey', 
    paddingBottom: 5,
    marginHorizontal: 25,
    color: '#5b5b5b'
  },
});

export default NegocioEspecifScreen;
