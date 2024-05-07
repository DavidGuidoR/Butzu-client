import * as SecureStore from 'expo-secure-store';

// Guardar Token en el Secure Store
async function saveToken(token) {
  await SecureStore.setItemAsync('auth_token', token);
}

// Obtener el token guardado en el Secure Store
async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}

// Borrar el token guardado.    
async function deleteToken() {
  await SecureStore.deleteItemAsync('auth_token');
}

async function saveId(id) {
    await SecureStore.setItemAsync('auth_id', id);
  }
  
  // Obtener el id guardado en el Secure Store
  async function getId() {
    return await SecureStore.getItemAsync('auth_id');
  }
  
  // Borrar el id guardado.    
  async function deleteId() {
    await SecureStore.deleteItemAsync('auth_id');
  }

