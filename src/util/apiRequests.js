import { app }                  from '../main';
import apiClient                from './apiClient';
import { getToken, setToken }   from '@/store/auth'
import { toastController  }     from '@ionic/vue';
import { loadingController  }   from '@ionic/vue';

// // Función para hacer una solicitud GET
// export const getData = async (endpoint, params = {}) => {
//   try {
//     const response = await apiClient.get(endpoint, { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error en GET:', error);
//     throw error;
//   }
// };
      
export const apiGet = async (url, params = {}, onSuccess, onError, onFinish) => {
  const storage = app.config.globalProperties.$storage;
  
  const obj = {
    params: params
  }
  
  // Agregar propiedades adicionales a params
  params.empresa           = import.meta.env.VITE_APP_EMPRESA;
  params.idusuarioLogueado = await storage.get('idusuario');
  params.usuarioLogueado   = await storage.get('usuario');
  params.token             = await getToken(storage);

  console.log('params:', params);

  try {
    // Realizar la petición GET utilizando async/await
    const response = await apiClient.get(url, obj);
    const data     = response.data;

    // Verificar el status
    data.status = +data.status;
    console.log('response:', response);

    if (data.status === -1) {
      // No está logueado, redirigir
      setToken(storage, '');
      // window.location.href = '/';
    } else if (data.status === 0) {
      // Manejo de error
      if (typeof onError === 'function') {
        onError(data);
      }
    } else {
      // Manejo de éxito
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    }
  } catch (error) {
    // Si ocurre un error en la petición
    if (typeof onError === 'function') {
      onError(error);
    }
    console.error('Error en GET:', error);
  } finally {
    // Si se ha pasado la función onFinish, ejecutarla
    if (typeof onFinish === 'function') {
      onFinish();
    }
  }
};


//// Función para hacer una solicitud POST
// export const postData = async (endpoint, data) => {
//   data.token    = getToken()
//   data.empresa  = import.meta.env.VITE_APP_EMPRESA
//   console.log('data: ', data)
//   try {
//     const response = await apiClient.post(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error en POST:', error);
//     throw error;
//   }
// };

export const apiPost = async (url, params, onSuccess, onError, onFinish) => {
  const storage = app.config.globalProperties.$storage;

  // Agregar propiedades adicionales a params
  params.empresa           = import.meta.env.VITE_APP_EMPRESA;
  params.idusuarioLogueado = await storage.get('idusuario');
  params.usuarioLogueado   = await storage.get('usuario');
  params.token             = await getToken(storage);
  
  console.log('params:', params);

  try {
    // Realizar la petición POST utilizando async/await
    const response = await apiClient.post(url, params);
    const data = response.data;

    // Verificar el status
    data.status = +data.status;
    console.log('response:', response);

    if (data.status === -1) {
      // No está logueado, redirigir
      setToken(storage, '');
      // window.location.href = '/';
    } else if (data.status === 0) {
      // Manejo de error
      if (typeof onError === 'function') {
        onError(data);
      }
    } else {
      // Manejo de éxito
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    }
  } catch (error) {
    // Si ocurre un error en la petición
    if (typeof onError === 'function') {
      onError(error);
    }
    console.error('Error en POST:', error);
  } finally {
    // Si se ha pasado la función onFinish, ejecutarla
    if (typeof onFinish === 'function') {
      onFinish();
    }
  }
};


// // Función para hacer una solicitud PUT
// export const putData = async (endpoint, data) => {
//   try {
//     const response = await apiClient.put(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error en PUT:', error);
//     throw error;
//   }
// };

export const apiPut = async (url, params, onSuccess, onError, onFinish) => {
  const storage = app.config.globalProperties.$storage; // Accede a la instancia de storage globalmente

  // Agregar propiedades adicionales a params
  params.token = await getToken(storage); // Obtener el token del storage
  params.empresa = import.meta.env.VITE_APP_EMPRESA; // Agregar empresa desde las variables de entorno

  console.log('params:', params);

  try {
    // Realizar la petición PUT utilizando async/await
    const response = await apiClient.put(url, params);
    const data = response.data;

    // Verificar el status
    data.status = +data.status; // Asegúrate de que el status sea un número
    console.log('response:', response);

    if (data.status === -1) {
      // No está logueado, redirigir
      await setToken(storage, ''); // Limpia el token si no está logueado
      // window.location.href = '/'; // Redirigir si es necesario
    } else if (data.status === 0) {
      // Manejo de error
      if (typeof onError === 'function') {
        onError(data);
      }
    } else {
      // Manejo de éxito
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    }
  } catch (error) {
    // Si ocurre un error en la petición
    if (typeof onError === 'function') {
      onError(error);
    }
    console.error('Error en PUT:', error);
  } finally {
    // Si se ha pasado la función onFinish, ejecutarla
    if (typeof onFinish === 'function') {
      onFinish();
    }
  }
};


// // Función para hacer una solicitud DELETE
// export const deleteData = async (endpoint) => {
//   try {
//     const response = await apiClient.delete(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error('Error en DELETE:', error);
//     throw error;
//   }
// };

export const apiDelete = async (url, params = {}, onSuccess, onError, onFinish) => {
  const storage = app.config.globalProperties.$storage; // Accede a la instancia de storage globalmente

  // Agregar token a los parámetros si es necesario
  params.token = await getToken(storage); // Obtener el token del storage
  params.empresa = import.meta.env.VITE_APP_EMPRESA; // Agregar empresa desde las variables de entorno

  console.log('params:', params);

  try {
    // Realizar la petición DELETE utilizando async/await
    const response = await apiClient.delete(url, { params });
    const data = response.data;

    // Verificar el status
    data.status = +data.status; // Asegúrate de que el status sea un número
    console.log('response:', response);

    if (data.status === -1) {
      // No está logueado, redirigir
      // Puedes agregar lógica para manejar el logout aquí
      console.error('No está logueado');
    } else if (data.status === 0) {
      // Manejo de error
      if (typeof onError === 'function') {
        onError(data);
      }
    } else {
      // Manejo de éxito
      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    }
  } catch (error) {
    // Si ocurre un error en la petición
    if (typeof onError === 'function') {
      onError(error);
    }
    console.error('Error en DELETE:', error);
  } finally {
    // Si se ha pasado la función onFinish, ejecutarla
    if (typeof onFinish === 'function') {
      onFinish();
    }
  }
};


// =============================================================
export const notify = async (type, title, message, position) => {
  var toast = await toastController.create({
    color   : type,               // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", and "dark"
    header  : title,
    message : message,
    duration: 1500,
    position: position
  });

  await toast.present();
}

export const showLoading = async (message) => {
  const loading = await loadingController.create({
    message: message,
    duration: 3000,
  });

  loading.present();
  return loading
};

export const hideLoading = async (loading) => {
  if (loading) {
    await loading.dismiss(); // Asegúrate de que el loading se cierre
  }
};