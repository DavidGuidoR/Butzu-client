import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ContainerNegocio from '../components/ContainerNegocio';
import ActionModal from '../components/ModalNegocio';
import axios from 'axios';
import ButtonCreate from '../components/ButtonCrearNegocio';

function NegocioScreen() {
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const [currentBusinessName, setCurrentBusinessName] = useState(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation();

  // Función para obtener el token y el ID desde Secure Store
  async function loadTokenAndId() {
    const fetchedToken = await SecureStore.getItemAsync('auth_token');
    const fetchedUserId = await SecureStore.getItemAsync('auth_id');

    // Asignar valores al estado local
    setToken(fetchedToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM');
    setUserId(fetchedUserId || '65f3a9dd8ffad84cd731ff20');

    await fetchBusinesses();
  }

  // Función para mostrar modal de opciones
  function openModalWithId(businessId, businessName) {
    setCurrentBusinessId(businessId);
    setCurrentBusinessName(businessName);
    setModalVisible(true);
  }

  // Función para la visualización
  function handleView() {
    setModalVisible(false);
    navigation.navigate('Negocio', { id: currentBusinessId, edit: false });
  }

  // Funciones para la edición
  function handleEdit() {
    setModalVisible(false);
    navigation.navigate('Negocio', { id: currentBusinessId, edit: true });
  }

  // Función para eliminar boton
  function handleDelete() {
    setModalVisible(false);
    // Implementar la lógica de eliminación aquí
    console.log('Eliminar negocio con ID:', currentBusinessId);
  }

  // Función para hacer la solicitud con encabezado
  async function fetchBusinesses() {
    // Asegúrate de que el token y el userId están establecidos
    if (!token) {
      setError('No hay token disponible');
      setLoading(false);
      return;
    }

    try {
      // Realizar la solicitud con el encabezado de autorización
      console.log(token);
      const response = await axios.get(`http://10.31.10.14:3000/negocio/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar el estado según la respuesta
      if (response.data && response.data.length > 0) {
        setData(response.data);
      } else {
        setError('No hay negocios creados aún');
      }
    } catch (err) {
      console.log(err);
      setError('Error al cargar los negocios');
    } finally {
      setLoading(false);
    }
  }

  // Llamar a `loadTokenAndId` y `fetchBusinesses` cada vez que la pantalla está enfocada
  useEffect(() => {
    if (isFocused) {;
      loadTokenAndId();
    }
  }, [isFocused]);

  return (
    
    <View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Textos para confirmar Secure Store */}
      {/* <Text>ID ALMACENADO: {userId}</Text>
      <Text>TOKEN ALMACENADO: {token}</Text> */}
      <Text style = {styles.text}>Negocios creados</Text>
      {/* <Text style = {styles.text}>Negocio id: {currentBusinessId}</Text> */}
      {data && data.map((negocio, index) => (
      
        <ContainerNegocio
          key={index}
          photo={negocio.photo}
          business_name={negocio.business_name}
          description={negocio.description}
          editar={true}
          onEditPress={() => openModalWithId(negocio._id, negocio.business_name)}
        />
      ))}
    </ScrollView>
    <ActionModal
    name={currentBusinessName}
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

export default NegocioScreen;

