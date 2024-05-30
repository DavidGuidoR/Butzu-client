import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert, Modal, Button } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const hamburguesaImg = require('@assets/hamburguesa.png');
const apiUrl = Constants.expoConfig.extra.API_URL;

function CreateUserScreen() {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const navigation = useNavigation();

    const handleCancel = () => {
        navigation.navigate('Login')
    };

    const handleSubmit = async () => {
        
        const data = {
            name: nombre,
            last_name_1: apellidoPaterno,
            last_name_2: apellidoMaterno,
            email: correo,
            phone: telefono,
            birth_date: fechaNacimiento,
            username: username,
            password: password
        };

        try {
            const response = await axios.post(`${apiUrl}user/createUsers`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setIsSuccessful(true);
                setModalMessage('Registro exitoso');
                setModalVisible(true);
            } else {
                setIsSuccessful(false);
                setModalMessage(response.data.message || 'Error desconocido');
                setModalVisible(true);
            }
        } catch (error) {
            setIsSuccessful(false);
            if (error.response) {
                setModalMessage(`Error al realizar el registro. \n${error.response.data.message}` || 'Error en la respuesta de la API');
            } 
            setModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (isSuccessful) {
            navigation.navigate('Home');
        }
    };

    return (
        <ImageBackground
            source={hamburguesaImg}
            style={styles.background}
            resizeMode="contain"
        >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.welcomeTitle}>
                        Bienvenido, por favor regístrate
                    </Text>

                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Apellido Paterno</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido Paterno"
                        value={apellidoPaterno}
                        onChangeText={setApellidoPaterno}
                    />

                    <Text style={styles.label}>Apellido Materno</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido Materno"
                        value={apellidoMaterno}
                        onChangeText={setApellidoMaterno}
                    />

                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        keyboardType="email-address"
                        value={correo}
                        onChangeText={setCorreo}
                    />

                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        keyboardType="phone-pad"
                        value={telefono}
                        onChangeText={setTelefono}
                    />

                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de Nacimiento"
                        value={fechaNacimiento}
                        onChangeText={setFechaNacimiento}
                    />

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <Button title="Aceptar" onPress={handleModalClose} />
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    container: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginTop: 30,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        marginRight: 10,
    },
    submitButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default CreateUserScreen;
