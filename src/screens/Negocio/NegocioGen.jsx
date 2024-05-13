import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ActionModal from '@components/Negocio/ModalNegocio';
import axios from 'axios';
import ContainerItem from '@components/ContainerItem';
import EditModal from '@components/Negocio/ModalEditNegocio';
import Constants from 'expo-constants';
import noImage from '@assets/no-image.png';
import editImage from '@assets/penEdit.png';
import editImageWhite from '@assets/pen-edit-white.png';
import plusAdd from '@assets/plus-square.png';
import tickButton from '@assets/tick-button.png';
import qrButton from '@assets/QR.png';
import pdfButton from '@assets/docs.png';
import { Button } from 'react-native-web';
const apiUrl = Constants.expoConfig.extra.API_URL;
const screenWidth = Dimensions.get('window').width;


function NegocioEspecifScreen({ route}) {
  const {id: businessId, edit } = route.params;
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editField, setEditField] = useState('');


  function openEditModal(field) {
    setEditField(field);
    console.log(field);
    setEditValue(businessData[field]);
    setEditModalVisible(true);
  }

  function applyLocalChanges() {
    setBusinessData(prevData => ({
      ...prevData,
      [editField]: editValue
    }));
    setEditModalVisible(false);
  }
  
  async function confirmEdits() {
    const token = await SecureStore.getItemAsync('auth_token');
    const headers = { Authorization: `Bearer ${token}` };
    const body = { [editField]: businessData[editField] };
    
    try {
      await axios.patch(`${apiUrl}negocio/${businessId}`, body, { headers });
      console.log('Negocio actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando el negocio:', error);
    }
  }
  

  function openModalWithId(itemId, itemName) {
    setCurrentItemId(itemId);
    setCurrentItemName(itemName);
    setModalVisible(true);
  }

  function generatePDF() {
    console.log('boton PDF presionado');
  }

  function generateQR() {
    console.log('boton QR presionado');
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
      const response = await axios.get(apiUrl +`negocio/${businessId}`, {
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
  }, [businessId, isFocused, edit]);

  return (
    
    <View>
       {loading ? (
      <Text>Cargando datos, por favor espere...</Text>
    ) : (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View>
        <Image
          source={{uri: businessData.banner}}
          style={styles.imageBanner}
          resizeMode="stretch"/>
        {edit ? (
        <TouchableOpacity
          style={{position: 'absolute', bottom: 20, right: 20 }}
          onPress={() => openEditModal('banner')}
         >
            <Image
              source={editImageWhite}
              style={{width:30, height:35}}/>
        </TouchableOpacity>): null}
      </View>
      <View
        style={styles.viewTitle}>
        <View>
          <Image
            source={{uri:businessData.photo}}
            style={styles.imageLogo}/>
            {edit ? (
        <TouchableOpacity
          style={{position: 'absolute', bottom: 5, right:5 }}
          onPress={() => openEditModal('photo')}
          >
            <Image
              source={editImageWhite}
              style={{width:20, height:20}}/>
        </TouchableOpacity>): null}
        </View>
        <Text style = {styles.textName}>{businessData.business_name}</Text>
        {edit ? (
        <TouchableOpacity
          onPress={() => openEditModal('business_name')}
          >
            <Image
              source={editImage}
              style={{width:20, height:20}}
              />
        </TouchableOpacity>): null}
      </View>
      <View
        style={{flex:1, justifyContent: 'center', flexDirection: 'row'}}>
        <Text
          style={styles.textDescription}>
            {businessData.description}
        </Text>
        {edit ? (
        <TouchableOpacity
          onPress={() => openEditModal('description')}
          >
            <Image
              source={editImage}
              style={{width:20, height:20}}/>
          </TouchableOpacity>): null}
      </View>
      {edit ? (
      <View
        style={styles.viewAgregar}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}>
          <Image
            source={plusAdd}
            style={{width:20, height:20, marginHorizontal:10}}/>
          <Text>Agregar Producto</Text>
        </TouchableOpacity>
      </View>): null}
      {itemData && itemData.map((item, index) => (
      
        <ContainerItem
          key={index}
          photo={item.photo}
          name={item.name}
          description={item.description}
          price = {item.price}
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

    <EditModal
      visible={editModalVisible}
      onClose={() => setEditModalVisible(false)}
      field={editField}
      value={editValue}
      onChange={setEditValue}
      onSave={applyLocalChanges}
    />
  {edit ? (
  <View
        style={{flex:1, flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center', position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity
          style={styles.touchableWhiteButton}>
              <Image
                source={qrButton}
                style={styles.buttonQr}
                />
            </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableWhiteButton}>
              <Image
                source={pdfButton}
                style={styles.buttonPDF}
                resizeMode="contain"/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmEdits}
              >
              <Image
                source={tickButton}
                style={styles.buttonConfirm}/>
            </TouchableOpacity>
        </View>
        ): null}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  viewTitle: {
    flex:1,
    width: screenWidth - 40,
    flexWrap: 'wrap',
    justifyContent:'center',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    padding: 'auto'
  },
  viewAgregar: {
    flex:1,
    width: screenWidth - 30,
    flexWrap: 'wrap',
    justifyContent:'flex-end',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    padding: 'auto'
  },
  imageBanner: {
    width: '100%',
    aspectRatio: 7/3,
    marginBottom:10
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
    marginHorizontal:15
  },
  textDescription: {
    fontFamily: 'monospace',
    fontSize: 15,
    color: '#5b5b5b',
    marginHorizontal:15
  },
  buttonQr:{
    width: 30,
    height: 30,
  },
  buttonPDF:{
    width: 30,
    height: 30,  
  },
  touchableWhiteButton:{
    width: 60,
    height: 60,
    marginLeft:20,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,              
  },
  buttonConfirm:{
    width: 60,
    height: 60,
    marginLeft:20, 
  }  
});

export default NegocioEspecifScreen;
