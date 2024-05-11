import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ContainerNegocio from '../../components/Negocio/ContainerNegocio';
import ActionModal from '../../components/Negocio/ModalNegocio';
import axios from 'axios';

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


  // Función para mostrar modal de opciones
  function openModalWithId(businessId, businessName) {
    setCurrentBusinessId(businessId);
    setCurrentBusinessName(businessName);
    setModalVisible(true);
  }

  // Función para la visualización
  function handleView() {
    setModalVisible(false);
    navigation.navigate('NegocioEspecif', { id: currentBusinessId, edit: false });
  }

  // Funciones para la edición
  function handleEdit() {
    setModalVisible(false);
    navigation.navigate('NegocioEspecif', { id: currentBusinessId, edit: true });
  }

  // Función para eliminar boton
  function handleDelete() {
    setModalVisible(false);
    // Implementar la lógica de eliminación aquí
    console.log('Eliminar negocio con ID:', currentBusinessId);
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

      console.log(token)
      console.log(userId)
      const response = await axios.get(`http://192.168.100.10:3000/negocio/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.length > 0) {
        setData(response.data);
      } else {
        setError('No hay negocios creados aún');
      }
    } catch (err) {
      setError('Error al cargar los negocios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta en cada renderizado
  useEffect(() => {
    if (isFocused) {
    fetchData();
    }
  }, [userId || isFocused]);

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

