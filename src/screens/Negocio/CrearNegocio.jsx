import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, Button, Dimensions, Modal, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import noImage from '@assets/no-image.png';
import plusImage from '@assets/plus.png';
import tickButton from '@assets/tick-button.png';
import ColorPickerWheel from '@/components/pickers/ColorPickerWheel';
import WaveBottomColor from '@/vectores/WaveBottomColor';
import WaveTopColor from '@/vectores/WaveTopColor';
import businessValidationSchema from '@/utils/validacionesNegocio';
import { useNavigation } from '@react-navigation/native';
const apiUrl = Constants.expoConfig.extra.API_URL;
import Constants from 'expo-constants';
import axios from 'axios';

const CrearNegocioScreen = () => {
  
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      user_id: '',
      business_name: '',
      description: '',
      tag: '',
      color_top: '#000',
      tag_color: '',
      tag_font: '',
      item_font: '',
      num_int: '',
      num_ext: '',
      city: '',
      street: '',
      zip_code: '',
      state: '',
      country: '',
    },
    validationSchema: businessValidationSchema,
    onSubmit: async values => {
      try {
        await handleSubmit(values);
      } catch (error) {
        console.error('Error al crear el negocio:', error);
      }
    },
  });


  useEffect(() => {
    if (successModalVisible) {
      setTimeout(() => {
        setSuccessModalVisible(false);
        navigation.navigate('Home');
      }, 2000);
    }
    const fetchUserId = async () => {
      let storedUserId = await SecureStore.getItemAsync('auth_id');
      if (!storedUserId) {
        storedUserId = '65f3a9dd8ffad84cd731ff20';
      }
      formik.setFieldValue('user_id', storedUserId);
    };
    fetchUserId();
  }, [successModalVisible]);

  const handleImagePick = async (setter, aspect) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

     if (!result.canceled && result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  const onSelectColor = ({ hex }) => {
    formik.setFieldValue('color_top', hex);
  };

  const getMimeType = (uri) => {
    const fileExtension = uri.split('.').pop();
    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  };

  
  const handleSubmit = async (values) => {
    console.log('Valores del formulario:', values); // Log de monitoreo
    setLoading(true);
  
    const formData = new FormData();
    const metadata = {};
  
    const appendImage = async (type, imageUrl) => {
      if (!imageUrl) return;
  
      const imageName = imageUrl.split('/').pop();
      const imageType = getMimeType(imageUrl);
      
      const filePath = imageUrl.replace('file://', '');
      const fileStats = await RNFS.stat(filePath);
  
      const imageData = {
        uri: imageUrl,
        name: imageName,
        type: imageType,
        size: fileStats.size,
      };
  
      formData.append('images', imageData);
  
      if (type === 'profilePhoto') {
        metadata.profileImage = imageName;
      } else if (type === 'bannerPhoto') {
        metadata.bannerImage = imageName;
      } else if (type === 'backgroundPhoto') {
        metadata.backgroundImage = imageName;
      }
    };
  
    await appendImage('profilePhoto', values.profilePhoto);
    await appendImage('bannerPhoto', values.bannerPhoto);
    await appendImage('backgroundPhoto', values.backgroundPhoto);
  
    if (Object.keys(metadata).length > 0) {
      formData.append('metadata', JSON.stringify(metadata));
    }
  
    // Asegúrate de que solo un user_id se está enviando
    formData.append('user_id', values.user_id);
  
    Object.keys(values).forEach((key) => {
      if (
        key !== 'profilePhoto' &&
        key !== 'bannerPhoto' &&
        key !== 'backgroundPhoto' &&
        key !== 'metadata' &&
        key !== 'user_id' &&
        values[key] !== ''
      ) {
        formData.append(key, values[key]);
      }
    });
  
    let token = await SecureStore.getItemAsync('auth_token');
    if (!token) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.G_SwrKpXhr33H0xf-R6nQfIhUTA0Kd8vkJh5FEKXPLM';
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
  
    try {
      const url = `${apiUrl}negocio/create`;
      const response = await axios.post(url, formData, { headers });
      console.log('Formulario enviado exitosamente', response.data); 
      setSuccessModalVisible(true);
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta de la API:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados:', error.response.headers);
      } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
      console.error('Error de configuración:', error.config);
    } finally {
      setLoading(false);
    }
  };
  
 
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageBannerContainer}>
          <Image source={formik.values.bannerPhoto ? { uri: formik.values.bannerPhoto } : noImage} style={styles.imageBanner} resizeMode="stretch" />
          <TouchableOpacity style={styles.addButton} onPress={() => handleImagePick(uri => formik.setFieldValue('bannerPhoto', uri), [2, 1])}>
            <Image source={plusImage} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTitleContainer}>
          <WaveTopColor color={formik.values.color_top} width={screenWidth} height={400} style={styles.waveTop} />
          <View style={styles.viewTitle}>
            <View>
              <Image source={formik.values.profilePhoto ? { uri: formik.values.profilePhoto } : noImage} style={styles.imageLogo} resizeMode="contain" />
              <TouchableOpacity style={styles.plusIcon} onPress={() => handleImagePick(uri => formik.setFieldValue('profilePhoto', uri), [1, 1])}>
                <Image source={plusImage} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del negocio"
                value={formik.values.business_name}
                onChangeText={formik.handleChange('business_name')}
                onBlur={formik.handleBlur('business_name')} 
                underlineColorAndroid="transparent"
              />
              {formik.touched.business_name && formik.errors.business_name ? <Text style={styles.errorText}>{formik.errors.business_name}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Categorías"
                value={formik.values.tag}
                onChangeText={formik.handleChange('tag')}
                onBlur={formik.handleBlur('tag')}
                underlineColorAndroid="transparent"
              />
              {formik.touched.tag && formik.errors.tag ? <Text style={styles.errorText}>{formik.errors.tag}</Text> : null}
            </View>
            <ColorPickerWheel 
              onCompleteSelect={onSelectColor}
              onPressModal={() => setShowModal(true)}
              showModal={showModal}
              setShowModal={() => setShowModal(false)}
              styleButton={{ position: 'absolute', top: 80, right: 40 }}
            />
          </View>
          <TextInput
            style={styles.inputDescription}
            placeholder="Descripción"
            value={formik.values.description}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            underlineColorAndroid="transparent"
            multiline
          />
          {formik.touched.description && formik.errors.description ? <Text style={[styles.errorText, {marginLeft:30}]}>{formik.errors.description}</Text> : null}
        </View>
        <View style={styles.imageBackgroundContainer}>
          <Image source={formik.values.backgroundPhoto ? { uri: formik.values.backgroundPhoto } : noImage} style={styles.imageBackground} resizeMode="stretch" />
          <TouchableOpacity style={styles.addButton} onPress={() => handleImagePick(uri => formik.setFieldValue('backgroundPhoto', uri), [9, 16])}>
            <Image source={plusImage} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.inputContainer, {justifyContent: 'center', alignItems: 'center', marginTop:20}]}>
          <TextInput
              style={styles.input}
              placeholder="Numero exterior"
              value={formik.values.numExt}
              onChangeText={formik.handleChange('num_ext')}
              onBlur={formik.handleBlur('num_ext')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.num_ext && formik.errors.num_ext ? <Text style={styles.errorText}>{formik.errors.num_ext}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Numero interior"
              value={formik.values.numInt}
              onChangeText={formik.handleChange('num_int')}
              onBlur={formik.handleBlur('num_int')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.num_int && formik.errors.num_int ? <Text style={styles.errorText}>{formik.errors.num_int}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Calle"
              value={formik.values.street}
              onChangeText={formik.handleChange('street')}
              onBlur={formik.handleBlur('street')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.street && formik.errors.street ? <Text style={styles.errorText}>{formik.errors.street}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              value={formik.values.city}
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.city && formik.errors.city ? <Text style={styles.errorText}>{formik.errors.city}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Código postal"
              value={formik.values.zipcode}
              onChangeText={formik.handleChange('zip_code')}
              onBlur={formik.handleBlur('zip_code')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.zip_code && formik.errors.zip_code ? <Text style={styles.errorText}>{formik.errors.zip_code}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={formik.values.state}
              onChangeText={formik.handleChange('state')}
              onBlur={formik.handleBlur('state')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.state && formik.errors.state ? <Text style={styles.errorText}>{formik.errors.state}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="País"
              value={formik.values.country}
              onChangeText={formik.handleChange('country')}
              onBlur={formik.handleBlur('country')}
              underlineColorAndroid="transparent"
            />
            {formik.touched.country && formik.errors.country ? <Text style={styles.errorText}>{formik.errors.country}</Text> : null}
        </View>
        <WaveBottomColor color={formik.values.color_top} width={screenWidth} style={styles.waveTop} />
      </ScrollView>
      <TouchableOpacity
              onPress={() => {
                formik.handleSubmit();
              }}
              >
              <Image
                source={tickButton}
                style={styles.buttonConfirm}/>
            </TouchableOpacity>
            
            <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Negocio creado con éxito!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  imageBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  imageBanner: {
    width: '100%',
    height: screenWidth * 1 / 2,
  },
  imageBackgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width:screenWidth * 9 / 16,
    height: screenHeight * 9 / 16,
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    elevation: 5,
  },
  addIcon: {
    width: 20,
    height: 20,
  },
  viewTitleContainer: {
    position: 'relative',
    width: screenWidth,
    justifyContent: 'space-between',
    
  },
  waveTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  viewTitle: {
    position: 'absolute',
    margin: 20,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 40,
    width: screenWidth * 0.6,
    marginBottom: 18,
    marginLeft: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  inputDescription: {
    alignSelf: 'flex-start',
    width: screenWidth * 0.8,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 20,
    marginLeft:20
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  buttonConfirm:{
    width: 60,
    height: 60,
    marginLeft:20, 
    position: 'absolute', bottom: 20, right: 20
  }  

});


export default CrearNegocioScreen;