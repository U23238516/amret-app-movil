import { app }      from '../main';
// import { Storage }  from '@ionic/storage';

// Inicializar el almacenamiento
let storage = null;

export const initStorage = async () => {
  storage = new Storage();
  await storage.create(); // Crea el almacenamiento
};

// Funciones para obtener y almacenar datos
export const setItemStorage = async (key, value) => {
  const storage = app.config.globalProperties.$storage;
  if (storage) {
    await storage.set(key, value);
  }
};

export const getItemStorage = async (key) => {
  const storage = app.config.globalProperties.$storage;
  if (storage) {
    return await storage.get(key);
  }
};

export const removeItemStorage = async (key) => {
  const storage = app.config.globalProperties.$storage;
  if (storage) {
    await storage.remove(key);
  }
};

export const clearStorage = async (key) => {
  const storage = app.config.globalProperties.$storage;
  if (storage) {
    await storage.remove(key);
  }
};
