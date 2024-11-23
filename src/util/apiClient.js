import axios from 'axios';

// Crea una instancia de Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ROUTE, // Cambia esta URL base por la de tu API
  timeout: 10000,  // Tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para las solicitudes (request)
apiClient.interceptors.request.use(
  config => {
    // Puedes agregar un token de autenticación o modificar la configuración aquí
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // dejar que cada solicitud lleve token
    // ['X-Token'] es una clave de encabezado personalizada
    // por favor modifíquelo de acuerdo a la situación actual
    // config.headers['X-Token']                          = getToken()
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Accept']                           = 'application/json'
    config.headers['Content-Type']                     = 'application/json'
    config.headers['Access-Control-Allow-Origin']      = '*'
    config.headers['Access-Control-Allow-Credentials'] = 'true'
    config.headers['Access-Control-Max-Age']           = '1800'
    config.headers['Access-Control-Allow-Headers']     = 'content-type'
    config.headers['Access-Control-Allow-Methods']     = 'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para las respuestas (response)
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error en la respuesta: ', error.response.status);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error('Error en la solicitud, sin respuesta del servidor: ', error.request);
    } else {
      // Otro tipo de error
      console.error('Error desconocido: ', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
