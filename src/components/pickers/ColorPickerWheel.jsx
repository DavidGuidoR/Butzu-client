import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import ColorPicker, { Panel3, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import editImage from '@assets/penEdit.png'

const ColorPickerWheel = ({onCompleteSelect, onPressModal, showModal, setShowModal, styleButton}) => {

  return (
    <View style={styles.container}>
        <TouchableOpacity  
            onPress={onPressModal}
            style={styleButton}>
            <Image source= {editImage} style={styles.imageEdit}/>
      </TouchableOpacity>
      <Modal visible={showModal} animationType='slide'>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <ColorPicker style={styles.colorPicker} value='red' onComplete={onCompleteSelect}>
            <Preview style={styles.preview} hideText hideInitialColor />
            <Panel3 style={styles.slider} />
            <HueSlider style={styles.slider} />
            <OpacitySlider style={styles.slider} />
            <Swatches style={styles.slider} />
          </ColorPicker>
          <Button title='Ok' onPress={setShowModal} />
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageEdit: {
    width: 20,
    height: 20
  },
  colorPicker: {
    width: '80%',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  slider: {
    marginBottom: 20,
    width: '100%',
  },
});


export default ColorPickerWheel;