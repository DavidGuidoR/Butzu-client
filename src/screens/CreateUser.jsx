import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

function CreateUserScreen() {
    return (
        <ImageBackground
            source={require('../../assets/hamburguesa.png')}
            style={styles.background}
            resizeMode="contain"
        >
            <View style={styles.container}>
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
                <TextInput style={styles.input} placeholder="Fecha de Nacimiento" />

                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="Username" />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { /* Manejar evento de cancelar */ }}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={() => { /* Manejar evento de enviar */ }}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        transform: [{ translateY: 135 }],
    },
    container: {
        width: '95%',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 100, 
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
    },
    input: {
        height: 30,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#A0A0A0', 
        alignItems: 'center',
    },
    submitButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#000000', 
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CreateUserScreen;
