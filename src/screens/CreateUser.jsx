import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

function CreateUserScreen() {

    

    const handleCancel = () => {
        // Lógica para manejar el evento de cancelar
    };

    const handleSubmit = () => {
        // Lógica para manejar el evento de enviar
    };

    return (
        <ImageBackground
            source={require('../../assets/hamburguesa.png')}
            style={styles.background}
            resizeMode="contain"
        >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    {/* Título de bienvenida */}
                    <Text style={styles.welcomeTitle}>
                        Bienvenido, por favor regístrate
                    </Text>

                    {/* Campos de entrada */}
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput style={styles.input} placeholder="Nombre" />

                    <Text style={styles.label}>Apellido Paterno</Text>
                    <TextInput style={styles.input} placeholder="Apellido Paterno" />

                    <Text style={styles.label}>Apellido Materno</Text>
                    <TextInput style={styles.input} placeholder="Apellido Materno" />

                    <Text style={styles.label}>Correo</Text>
                    <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" />

                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="phone-pad" />

                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TextInput style={styles.input} placeholder="Fecha de Nacimiento" keyboardType="date"/>

                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input} placeholder="Username" />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />

                    {/* Botones */}
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
