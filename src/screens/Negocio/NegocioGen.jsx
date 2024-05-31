import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import ContainerItem from '@components/ContainerItem';
import EditModal from '@components/Negocio/ModalEditNegocio';
import SuccessModal from '@/components/Negocio/ModalEditConfirm';
import Constants from 'expo-constants';
import noImage from '@assets/no-image.png';
import editImage from '@assets/penEdit.png';
import editImageWhite from '@assets/pen-edit-white.png';
import plusAdd from '@assets/plus-square.png';
import tickButton from '@assets/tick-button.png';
import qrButton from '@assets/QR.png';
import pdfButton from '@assets/docs.png';
import { Button } from 'react-native-web';
import WaveBottomColor from '@/vectores/WaveBottomColor';
import WaveTopColor from '@/vectores/WaveTopColor';
import ProductoModal from '@components/Negocio/ProductoModal';
import ProductoEditModal from '@components/Negocio/ProductoEditModal';
const apiUrl = Constants.expoConfig.extra.API_URL;
const screenWidth = Dimensions.get('window').width;
import ColorPickerWheel from '@/components/pickers/ColorPickerWheel';
import ActionModal from '@components/Negocio/ModalNegocio';


function NegocioEspecifScreen({ route }) {
  const { id: businessId, edit } = route.params;
  const isFocused = useIsFocused();
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentItemName, setCurrentItemName] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [editState, setEdit] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editField, setEditField] = useState('');
  const [originalBusinessData, setOriginalBusinessData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProductoModalVisible, setProductoModalVisible] = useState(false);
  const [isProductoEditModalVisible, setProductoEditModalVisible] = useState(false);
  const [colorTop, setColorTop] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openEditItemModal = (item) => {
    setCurrentItem(item);
    setProductoEditModalVisible(true);
  };

  const onSelectColor = ({ hex }) => {
    setColorTop(hex);
    setBusinessData(prevData => ({
      ...prevData,
      color_top: hex
    }));
  };

  function openEditModal(field) {
    setEditField(field);
    setEditValue(businessData[field]);
    setEditModalVisible(true);
  }

  function getChangedFields() {
    const changes = {};
    Object.keys(businessData).forEach(key => {
      if (businessData[key] !== originalBusinessData[key] && businessData[key] !== undefined) {
        changes[key] = businessData[key];
      }
    });
    return changes;
  }

  function applyLocalChanges() {
    setBusinessData(prevData => ({
      ...prevData,
      [editField]: editValue
    }));
    console.log(editField)
    console.log(editValue)
    setEditModalVisible(false);
  }

  async function confirmEdits() {
    let hasImages = false;
    const formData = new FormData();
    const metadata = {};
    const body = getChangedFields();

    function appendImage(type, imageUrl) {
      if (!imageUrl || !body[type]) return;

      hasImages = true;

      const imageName = imageUrl.split('/').pop();
      const imageType = `image/${imageName.split('.').pop()}`;

      formData.append('images', {
        uri: imageUrl,
        name: imageName,
        type: imageType
      });

      if (type === 'photo') {
        metadata.profileImage = imageName;
      } else if (type === 'banner') {
        metadata.bannerImage = imageName;
      } else if (type === 'background_photo') {
        metadata.backgroundImage = imageName;
      }
    }


    appendImage('photo', businessData.photo);
    appendImage('banner', businessData.banner);
    appendImage('background_photo', businessData.background_photo);

    if (Object.keys(metadata).length > 0) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    Object.keys(body).forEach(key => {
      if (key !== 'photo' && key !== 'banner' && key !== 'background_photo') {
        formData.append(key, body[key]);
      }
    });
    let token = await SecureStore.getItemAsync('auth_token');
    if (!token) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    console.log(headers)
    console.log(formData)
    console.log(businessId)
    // Realiza la solicitud PATCH si hay cambios
    if (hasImages || Object.keys(body).length > 0) {
      try {
        await axios.patch(`${apiUrl}negocio/edit/${businessId}`, formData, { headers });
        setEdit(false);
        setSuccessModalVisible(true);

      } catch (error) {
        console.error('Error actualizando el negocio:', error);
      }
    } else {
      setEdit(false);
    }
  }



  function openModalWithId(item) {
    setCurrentItem(item)
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
    setModalVisible(false)
    setProductoEditModalVisible(true);
    
  }

  // Función para eliminar boton
  function handleDelete() {
    setModalVisible(false);
    // Implementar la lógica de eliminación aquí
    console.log('Eliminar negocio con ID:', currentItemId);
  }

  // ------------ ITEMS -------------

  const handleEditItem = async (editedItem) => {
    setProductoEditModalVisible(false);
    try {
      let token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
      }

      const formData = new FormData();
      formData.append('name', editedItem.name);
      formData.append('price', editedItem.price);
      formData.append('tag', editedItem.tag);
      formData.append('description', editedItem.description);

      if (editedItem.photo && editedItem.photo !== currentItem.photo) {
        const photoUriParts = editedItem.photo.split('.');
        const fileType = photoUriParts[photoUriParts.length - 1];
        formData.append('images', {
          uri: editedItem.photo,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      await axios.patch(`${apiUrl}items/${editedItem.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setItemData(prevItems => prevItems.map(item => item._id === editedItem.id ? editedItem : item));
    } catch (error) {
      console.error('Error editando el item:', error);
    }
  };
  // Función para eliminar boton
  async function handleDeleteItem() {
    setModalVisible(false);
    try {
      let token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
      }
      await axios.delete(`${apiUrl}items/${currentItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemData(prevItems => prevItems.filter(item => item._id !== currentItemId));
      console.log('Item eliminado con ID:', currentItemId);
    } catch (error) {
      console.error('Error eliminando el item:', error);
    }
  }

  // Función para agregar un nuevo producto
  const handleSaveNewItem = async (newItem) => {
    setProductoModalVisible(false);
    try {
      let token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
      }
  
      const formData = new FormData();
      formData.append('negocio_id', businessId);
      formData.append('name', newItem.name);
      formData.append('price', newItem.price);
      formData.append('tag', newItem.tag);
      formData.append('description', newItem.description);
  
      if (newItem.photo) {
        const photoUriParts = newItem.photo.split('.');
        const fileType = photoUriParts[photoUriParts.length - 1];
        formData.append('images', {
          uri: newItem.photo,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
  
      const response = await axios.post(`${apiUrl}items/create/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setItemData(prevItems => [...prevItems, response.data.item]);
    } catch (error) {
      console.error('Error agregando el item:', error);
    }
  };

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
        // Guardamos estado inicial para cambios en patch en caso de ser dueño
        setOriginalBusinessData(response.data.negocio);
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
      setEdit(edit);
      fetchData();
    }
  }, [businessId, isFocused, edit]);

  return (
    <>
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando datos, por favor espere...</Text>
      ) : (
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <ImageBackground source={{ uri: businessData.background_photo }} style={styles.backgroundImage}></ImageBackground>
          
          <View>
            <Image
              source={{ uri: businessData.banner }}
              style={styles.imageBanner}
              resizeMode="stretch" />
            {editState ? (
              <TouchableOpacity
                style={{ position: 'absolute', bottom: 20, right: 20 }}
                onPress={() => openEditModal('banner')}
              >
                <Image
                  source={editImageWhite}
                  style={{ width: 30, height: 35 }} />
              </TouchableOpacity>) : null}
          </View>
          <View style={styles.waveContainer}>
            <WaveTopColor color={businessData.color_top} width={screenWidth} height={400} style={styles.waveTop} />
            <View
              style={styles.viewTitle}>
              <View>
                <Image
                  source={{ uri: businessData.photo }}
                  style={styles.imageLogo} />
                {editState ? (
                  <TouchableOpacity
                    style={{ position: 'absolute', bottom: 5, right: 5 }}
                    onPress={() => openEditModal('photo')}
                  >
                    <Image
                      source={editImageWhite}
                      style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>) : null}
              </View>
              <Text style={styles.textName}>{businessData.business_name}</Text>
              {editState ? (
                <TouchableOpacity
                  onPress={() => openEditModal('business_name')}
                >
                  <Image
                    source={editImage}
                    style={{ width: 20, height : 20 }}
                  />
                </TouchableOpacity>) : null}
            </View>
            <ColorPickerWheel 
              onCompleteSelect={onSelectColor}
              onPressModal={() => setShowModal(true)}
              showModal={showModal}
              setShowModal={() => setShowModal(false)}
              styleButton={{ position: 'absolute', bottom: 70, left: 150 }}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <View style={styles.textDescriptionContainer}>
              <Text
                style={styles.textDescription}>
                {businessData.description}
              </Text>
            </View>
            {editState ? (
              <TouchableOpacity
                onPress={() => openEditModal('description')}
              >
                <Image
                  source={editImage}
                  style={{ width: 20, height: 20 }} />
              </TouchableOpacity>) : null}
          </View>
          {editState ? (
            <View
              style={styles.viewAgregar}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => setProductoModalVisible(true)}
                >
                <Image
                  source={plusAdd}
                  style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text>Agregar Producto</Text>
              </TouchableOpacity>
            </View>) : null}
          {itemData && itemData.slice().reverse().map((item, index) => (
            <React.Fragment key={index}>
              <ContainerItem
                key={index}
                photo={item.photo}
                name={item.name}
                description={item.description}
                price={item.price}
                editar={true}
                onEditPress={() => openModalWithId(item)}
              />
            </React.Fragment>
          ))}
          <WaveBottomColor color={businessData.color_top} width={screenWidth} height={200} style={styles.waveBottom} />
        </ScrollView>
      )}

      <EditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        field={editField}
        value={editValue}
        onChange={setEditValue}
        onSave={applyLocalChanges}
      />

      <ProductoModal
        visible={isProductoModalVisible}
        onClose={() => setProductoModalVisible(false)}
        onSave={handleSaveNewItem}
      />
      
      <SuccessModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      />

      {currentItem && (
        <ProductoEditModal
          visible={isProductoEditModalVisible}
          onClose={() => setProductoEditModalVisible(false)}
          initialId = {currentItem.id}
          initialName={currentItem.name}
          initialPrice={currentItem.price}
          initialTag={currentItem.tag}
          initialDescription={currentItem.description}
          initialPhoto={currentItem.photo}
          onSave={handleEditItem}
        />
        )}
      
        <ActionModal
        name={''}
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      {editState ? (
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', position: 'absolute', bottom: 20, right: 20 }}>
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
              resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmEdits}
          >
            <Image
              source={tickButton}
              style={styles.buttonConfirm} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  viewTitle: {
    position: 'absolute',
    top: 50,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAgregar: {
    flex: 1,
    width: 180,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  imageBanner: {
    width: '100%',
    aspectRatio: 7 / 3,
  },
  imageLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  waveContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  waveTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  waveBottom: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  textName: {
    fontFamily: 'monospace',
    fontSize: 20,
    color: '#5b5b5b',
    marginHorizontal: 15,
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  textDescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 5,
  },
  textDescription: {
    fontFamily: 'monospace',
    fontSize: 15,
    color: '#5b5b5b',
    backgroundColor: 'withe'
  },
  buttonQr: {
    width: 30,
    height: 30,
  },
  buttonPDF: {
    width: 30,
    height: 30,
  },
  touchableWhiteButton: {
    width: 60,
    height: 60,
    marginLeft: 20,
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
  buttonConfirm: {
    width: 60,
    height: 60,
    marginLeft: 20,
  }
});

export default NegocioEspecifScreen;
