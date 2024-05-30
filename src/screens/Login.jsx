import React, {useState} from 'react';
import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import backgroundImage from '@assets/ropa.png';
import googleLogo from '@assets/google.png'; // Ruta al logo de Google
import facebookLogo from '@assets/facebook.png'; // Ruta al logo de Facebook
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig.extra.API_URL;

async function saveToken(token) {
  await SecureStore.setItemAsync('auth_token', token);
}

async function saveId(id) {
  await SecureStore.setItemAsync('auth_id', id);
}


function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
      
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}auth/`, {
                username,
                password,
        });
    
            const { token, user } = response.data;
            const { id } = user;
            await saveToken(token);
            await saveId(id);
    
            navigation.navigate('Home');

        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message || 'Algo salió mal.');
            } else if (error.request) {
                Alert.alert('Error', 'No se pudo conectar con el servidor.');
            } else {
                Alert.alert('Error', 'Algo salió mal.');
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Campos de entrada */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={username}
                    onChangeText={setUsername}
                    keyboardType="username"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>

        
            <View style={styles.authButtonsContainer}>
                <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createAccountButton}
                    onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.buttonTextBlack}>Crear Cuenta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.iconButtonsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={googleLogo} style={styles.logo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={facebookLogo} style={styles.logo} />
                </TouchableOpacity>
            </View>

           
            <ImageBackground
                source={backgroundImage}
                style={styles.background}
                resizeMode="cover"
            >
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
        marginTop: 50,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
    },
    authButtonsContainer: {
        width: '90%',
        marginTop: 20,
        marginBottom: 10,
    },
    signInButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
    },
    createAccountButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    iconButtonsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    logo: {
        width: 30,
        height: 30,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonTextBlack: {
        color: 'black',
        fontWeight: 'bold',
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default LoginScreen;
