import { Modal, View, Text, TextInput, Button, ImagePicker } from 'react-native';

const EditModal = ({ visible, onClose, field, value, onChange, onSave }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ marginTop: 22 }}>
        <View>
          <Text>Edit {field}</Text>
          {field === 'banner' ? (
            <Button title="Select Image" onPress={() => {/* Implement image selection */}} />
          ) : (
            <TextInput value={value} onChangeText={onChange} />
          )}
          <Button title="Save" onPress={onSave} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

export default EditModal;
