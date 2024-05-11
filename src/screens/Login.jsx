import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import backgroundImage from '@assets/ropa.png';
import googleLogo from '@assets/google.png'; // Ruta al logo de Google
import facebookLogo from '@assets/facebook.png'; // Ruta al logo de Facebook

function LoginScreen() {
    return (
        <View style={styles.container}>
            {/* Campos de entrada */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>

        
            <View style={styles.authButtonsContainer}>
                <TouchableOpacity style={styles.signInButton}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createAccountButton}>
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
