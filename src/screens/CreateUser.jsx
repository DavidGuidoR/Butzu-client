import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
const hamburguesaImg = require('@assets/hamburguesa.png');

function CreateUserScreen() {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCancel = () => {
        // Lógica para manejar el evento de cancelar
        console.log("Registro cancelado");
    };

    const handleSubmit = async () => {
        console.log("Constants.expoConfig:", Constants.expoConfig);
        const apiUrl = Constants.expoConfig && Constants.expoConfig.extra ? Constants.expoConfig.extra.API_URL : "http://192.168.1.66:3000/";
        data = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correo,
            telefono,
            fechaNacimiento,
            username,
            password
        };

        try {
            const response = await fetch(`${apiUrl}user/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Éxito', result.message);
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con la API');
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
});

export default CreateUserScreen;
