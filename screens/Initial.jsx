import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import backgroundImage from '../assets/pizza.png';

function InitialScreen() {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="contain"  
        >
            <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log('Botón 1 presionado');
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
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
});

export default InitialScreen;
