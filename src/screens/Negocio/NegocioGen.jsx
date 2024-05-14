import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ActionModal from '@components/Negocio/ModalNegocio';
import axios from 'axios';
import ContainerItem from '@components/ContainerItem';
import Constants from 'expo-constants';
import noImage from '@assets/no-image.png';
import editImage from '@assets/penEdit.png'
import { Button } from 'react-native-web';
const apiUrl = Constants.expoConfig.extra.API_URL;


function NegocioEspecifScreen({ route }) {
  const { id: businessId, edit } = route.params;
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    navigation.navigate('EditItem', { id: currentItemId, edit: true });
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
        userId = '65f3a9dd8ffad84cd731ff20'
      }
      const response = await axios.get(apiUrl + `negocio/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setBusinessData(response.data.negocio);
        if (response.data.negocio.items) {
          setItemData(response.data.negocio.items);
        }
      } else {
        setError('Error al consultar el negocio');
      }
      setLoading(false);
    } catch (err) {
      setError('Error al cargar el negocio: ' + err.message);
      setLoading(false);
    }
  };

  // Se ejecuta en cada renderizado
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [businessId, isFocused]);

  return (

    <View>
      {loading ? (
        <Text>Cargando datos, por favor espere...</Text>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={{ uri: businessData.banner }}
            style={styles.imageBanner}
            resizeMode="stretch" />
          <View
            style={styles.viewTitle}>
            <Image
              source={{ uri: businessData.photo }}
              style={styles.imageLogo} />
            <Text style={styles.textName}>{businessData.business_name}</Text>
            <TouchableOpacity>
              <Image
                source={editImage}
                style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
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
      )}
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
  },
  viewTitle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  imageBanner: {
    width: '100%',
    aspectRatio: 7 / 3,
    marginBottom: 10
  },
  imageLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textName: {
    fontFamily: 'monospace',
    fontSize: 20,
    color: '#5b5b5b',
    marginHorizontal: 15
  },
});

export default NegocioEspecifScreen;
