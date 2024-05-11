import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '@assets/pizza.png';

function InitialScreen() {
    const navigation = useNavigation();  // Obtener el objeto de navegación

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="contain"
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => {
                    }}
                >
                    <Text style={styles.skipButtonText}>X</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => {
                            navigation.navigate('CreateUser');
                            console.log('Botón 2 presionado');
                        }}
                    >
                        <Text style={styles.buttonText2}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -90 }],
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 50,
        borderColor: '#FFFFFF',
        padding: 15,
        marginHorizontal: 20,
        width: 100,
        alignItems: 'center',
        transform: [{ translateY: 350 }],
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button2: {
        backgroundColor: '#FCFEFF',
        borderRadius: 50,
        borderColor: '#000',
        padding: 15,
        marginHorizontal: 20,
        width: 100,
        alignItems: 'center',
        transform: [{ translateY: 350 }],
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText2: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipButton: {
        position: 'absolute',
        top: -260,
        right: -50,
        padding: 10,
        backgroundColor: 'transparent',
    },
    skipButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default InitialScreen;
