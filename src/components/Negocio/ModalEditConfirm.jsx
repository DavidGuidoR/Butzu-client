import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import tickIcon from '@assets/tick-confirm.png'


const SuccessModal = ({visible, onClose}) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text>✖️</Text>
          </TouchableOpacity>
          <Image
            style={styles.successImage}
            source={tickIcon}
          />
          <Text style={styles.modalText}>Cambios realizados con éxito</Text>
        </View>
      </View>
    </Modal>
  );
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Fondo semi-transparente
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    successImage: {
      width: 50,
      height: 50,
    },
    modalText: {
      marginTop: 15,
      textAlign: 'center',
      fontSize: 16,
    }
  });
  
  export default SuccessModal;