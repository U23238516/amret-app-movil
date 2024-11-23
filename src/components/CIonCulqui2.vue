<template>
  <ion-content class="ion-padding">
    <form>
      <ion-item>
        <ion-label position="floating">Número de tarjeta</ion-label>
        <ion-input v-model="cardNumber" type="text" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">CVV</ion-label>
        <ion-input v-model="cvv" type="text" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Fecha de vencimiento</ion-label>
        <ion-input v-model="expirationMonth" type="text" placeholder="MM" required></ion-input>
        <ion-input v-model="expirationYear" type="text" placeholder="YY" required></ion-input>
      </ion-item>

      <ion-button expand="full" @click="createCharge">Pagar</ion-button>
    </form>
  </ion-content>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: '',
      cvv: '',
      expirationMonth: '',
      expirationYear: '',
    };
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
    // Verificar que el script de Culqi se cargue correctamente
    // Esperar a que el script de Culqi se haya cargado
    // Cargar el script de Culqi de manera asincrónica
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.onload = () => {
      // Verifica que Culqi se haya cargado correctamente
      console.log('Culqi cargado:', window.Culqi);
      if (typeof window.Culqi !== 'undefined') {
        console.log('Culqi cargado exitosamente');
        window.Culqi.publicKey = 'pk_test_9153d11b81b02954'; // Configura tu clave pública
      } else {
        console.error('Error: Culqi no está disponible');
      }
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Culqi');
    };
    document.head.appendChild(script);
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
    // Verificar que el script de Culqi se cargue correctamente
    // Cargar el script de Culqi de manera asincrónica
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.onload = () => {
      // Verifica que Culqi se haya cargado correctamente
      console.log('Culqi cargado:', window.Culqi);
      if (typeof window.Culqi !== 'undefined') {
        console.log('Culqi cargado exitosamente');
        window.Culqi.publicKey = 'pk_test_9153d11b81b02954'; // Configura tu clave pública
      } else {
        console.error('Error: Culqi no está disponible');
      }
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Culqi');
    };
    document.head.appendChild(script);
  },
  mounted () {
    // Observa el prop `idtarjeta` para detectar cambios
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.onload = () => {
      // Verifica que Culqi se haya cargado correctamente
      console.log('Culqi cargado:', window.Culqi);
      if (typeof window.Culqi !== 'undefined') {
        console.log('Culqi cargado exitosamente');
        window.Culqi.publicKey = 'pk_test_9153d11b81b02954'; // Configura tu clave pública
      } else {
        console.error('Error: Culqi no está disponible');
      }
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Culqi');
    };
    document.head.appendChild(script);
  },
  methods: {
    // createCharge() {
    //   // Verifica que `window.Culqi` esté disponible antes de invocar el método
    //   if (window.Culqi && window.Culqi.createToken) {
    //     window.Culqi.createToken({
    //       card_number: this.cardNumber,
    //       cvv: this.cvv,
    //       expiration_month: this.expirationMonth,
    //       expiration_year: this.expirationYear,
    //       email: 'cliente@correo.com', // El correo del cliente
    //     }, async (status, response) => {
    //       if (status === 200) {
    //         // Token creado exitosamente
    //         const result = await this.processPayment(response.id);
    //         console.log(result);
    //         alert('Pago exitoso');
    //       } else {
    //         // Error al generar el token
    //         console.error('Error al generar el token:', response);
    //         alert('Error al generar el token');
    //       }
    //     });
    //   } else {
    //     console.error('Culqi no está disponible o createToken no es una función');
    //     alert('Error: Culqi no está disponible');
    //   }
    // },
    // async processPayment(token_id) {
    //   try {
    //     // Realiza la solicitud al backend para crear el cargo
    //     const response = await fetch('http://localhost:3001/payment/charge', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         token_id: token_id,
    //         amount: 1000, // Monto en céntimos (1000 = S/ 10.00)
    //       }),
    //     });

    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error('Error en la solicitud de pago:', error);
    //     return { error: 'Error en el pago' };
    //   }
    // },
    createCharge() {
      window.Culqi.publicKey = 'pk_test_9153d11b81b02954'; // Replace with your public key
      window.Culqi.settings({
        title: 'Pago de Prueba',
        currency: 'PEN',
        amount: 1000
      });
      window.Culqi.open();
      window.Culqi.success = async (token) => {
        console.log('token...', token);
      };
      // console.log('Iniciando proceso de pago...');
      
      // if (typeof window.Culqi !== 'undefined') {
      //   // Verificar que la configuración de Culqi esté lista
      //   window.Culqi.open({
      //     email: 'jlromeroquintana@gmail.com', // Email del cliente
      //     onToken: (token) => {
      //       // Si el token se genera correctamente
      //       if (token && token.id) {
      //         console.log('Token creado: ', token);
      //         this.culqiToken = token.id;  // Guardar el token
      //         console.log('Token ID:', token.id);

      //         // Llamar al backend para procesar el pago
      //         this.processPayment(token.id);
      //       } else {
      //         alert('Hubo un error con el token');
      //       }
      //     }
      //   });
      // } else {
      //   console.error('Culqi no está disponible');
      // }
    },
    async processPayment(token_id) {
      try {
        const response = await fetch('http://localhost:3000/api/create-charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token_id: token_id,
            amount: 1000, // Monto en céntimos (ajustar según tu lógica)
          }),
        });

        const data = await response.json();
        console.log('Resultado del pago: ', data);

        if (data.status === 'approved') {
          alert('Pago aprobado');
        } else {
          alert('Pago rechazado');
        }
      } catch (error) {
        console.error('Error al procesar el pago', error);
        alert('Hubo un error con el pago');
      }
    }
  }
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
