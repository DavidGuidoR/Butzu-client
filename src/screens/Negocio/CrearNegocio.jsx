import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
const screenWidth = Dimensions.get('window').width;
import noImage from '@assets/no-image.png';
import plusImage from '@assets/plus.png';
import tickButton from '@assets/tick-button.png';
import ColorPickerWheel from '@/components/pickers/ColorPickerWheel';

const CrearNegocioScreen = () => {
  const [userId, setUserId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [colorTop,setColorTop] = useState('');
  const [tagColor, setTagColor] = useState('#FFFFFF');
  const [numExt, setNumExt] = useState('');
  const [numInt, setNumInt] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await SecureStore.getItemAsync('user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      }
      else{
        setUserId('65f648831c279d776b62cd48');
      }
    };
    fetchUserId();
  }, []);

  const handleImagePick = async (setter) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setter(result.uri);
    }
  };

  const onSelectColor = ({ hex }) => {
    console.log(hex)
    setColorTop(hex);
  };

  return (
    
    <View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View 
        style={{flex:1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'black', borderTopWidth: 2, borderTopColor: 'black'}}>
        <Image
          source={noImage}
          style={styles.imageBanner}
          resizeMode="stretch"/>
        <TouchableOpacity
          style={{flex:1,alignItems: 'center', justifyContent:'center', position: 'absolute', bottom: 20, right: 20, backgroundColor: 'white', width:30, height:30,
          borderRadius: 15}}
         >
            <Image
              source={plusImage}
              style={{width:20, height:20}}/>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.viewTitle, { backgroundColor: colorTop }]}>
        <View>
          <Image
            source={noImage}
            style={styles.imageLogo}/>
            
        <TouchableOpacity
          style={{position: 'absolute', bottom: 5, right:5 }}
          >
            <Image
              source={plusImage}
              style={{width:20, height:20}}/>
        </TouchableOpacity>
        </View>
        <View 
          style={{flex:1, flexDirection: 'column'}}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del negocio"
          value={businessName}
          onChangeText={setBusinessName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Categorías"
          value={category}
          onChangeText={setCategory}
          underlineColorAndroid="transparent"
        />
        </View>
        <ColorPickerWheel 
          onCompleteSelect={onSelectColor}
          onPressModal={() => setShowModal(true)}
          showModal={showModal}
          setShowModal = {() => setShowModal(false)}
          styleButton={{position: 'absolute', top: 50, right: -10 }}
        />
      </View>
      <View
        style={{flex:1, justifyContent: 'center', flexDirection: 'column'}}>
        <TextInput
          style={styles.inputDescription}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          underlineColorAndroid="transparent"
          multiline
        />

      </View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  scrollView: {
    width: '100%',
  },
  viewTitle: {
    flex:1,
    width: screenWidth,
    flexWrap: 'wrap',
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black'
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
    height: 150,
    marginBottom:10,
  },
  imageLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    height: 40,
    width: screenWidth * 0.6,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  inputDescription: {
    flex: 1,
    height: 60,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  colorWheel: {
    width: 200,
    height: 200,
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


export default CrearNegocioScreen;