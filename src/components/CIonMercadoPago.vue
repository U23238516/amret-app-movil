<template>
  <div>
    <button @click="createPayment">Pagar con MercadoPago</button>
  </div>
</template>

<script>
import { apiPost, notify } from '@/util/apiRequests';
export default {
  methods: {
    async createPayment() {


      var url = '/payment/create-preference'
      var obj = {
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data:>>> ', data)
        // payment/create-order', { amount: monto });
        // const init_point = response.data.init_point;
        // // Redirigir al usuario a Mercado Pago
        // window.location.href = init_point;
          if (window.MercadoPago) {
            const mp = new window.MercadoPago('APP_USR-1f798bb4-2030-41d8-8100-52c48a68d7dd', {
              locale: 'es-PE', // Configuración para Perú
            });
            
            mp.checkout({
              preference: {
                id: data.preference_id,  // id de la preferencia que obtuviste del backend
              },
              autoOpen: true,  // Usa autoOpen para abrir automáticamente el checkout
            });
          } else {
            console.error('MercadoPago SDK no está disponible.');
          }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
      });

      // Llama a tu backend para crear la preferencia de pago
      // fetch('http://192.168.1.7:3001/payment/create-preference', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ /* datos del pago, si es necesario */ }),
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // Asegúrate de que MercadoPago esté cargado globalmente
      //   if (window.MercadoPago) {
      //     const mp = new window.MercadoPago('APP_USR-1f798bb4-2030-41d8-8100-52c48a68d7dd', {
      //       locale: 'es-PE', // Configuración para Perú
      //     });
          
      //     mp.checkout({
      //       preference: {
      //         id: data.preference_id,  // id de la preferencia que obtuviste del backend
      //       },
      //       autoOpen: true,  // Usa autoOpen para abrir automáticamente el checkout
      //     });
      //   } else {
      //     console.error('MercadoPago SDK no está disponible.');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error al crear la preferencia de pago:', error);
      // });
    }
  }
}
</script>

