<template>
  <template v-for="item of listaSaldoPredeterminado" :key="item">
   <ion-button fill="outline" @click="abrirCulqi(item)"> S/. {{ item }}</ion-button>
 </template>
</template>

<script>
import { IonButton }                                  from '@ionic/vue';
import { getItemStorage } from '@/store/storageService'; 
import { apiPost, notify, showLoading, hideLoading }  from '@/util/apiRequests';
// import { watch } from 'vue';

export default {
  name      : 'CIonCulqui',
  props: {
    idtarjeta               : Number,
    listaSaldoPredeterminado: Array
  },
  components: {
    IonButton
  },
  data() {
    return {
      monto: null,
      cargandoInformacion: false
    }
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
  },
  watch: {
    // Observa el prop `idtarjeta` para detectar cambios
    idtarjeta: function(newVal) {
      console.log('Opción seleccionada actualizada:', newVal);
    }
  },
  methods: {
    loadCulqiScript() {
      if (!window.Culqi) {
        const script = document.createElement('script');
        script.src = 'https://checkout.culqi.com/js/v4';
        script.onload = () => {
          console.log("Culqi script cargado correctamente.");
          this.culqiSetup();
        };
        script.onerror = () => {
          console.error('Error al cargar el script de Culqi');
        };
        document.head.appendChild(script);
      } else {
        console.log("Culqi script ya está cargado.");
        this.culqiSetup();
      }
    },
    culqiSetup() {
      if (window.Culqi) {
        console.log('Configurando Culqi...');
        window.Culqi.publicKey = 'pk_test_9153d11b81b02954'; // Reemplaza con tu clave pública de prueba o producción

        window.Culqi.settings({
          title   : 'Recarga',
          currency: 'PEN',
          amount  : +this.monto * 100,             // Monto en céntimos (85.00 soles)
          order   : 'ord_live_0CjjdWhFpEAZlxlz',   // ID de orden
        });

        window.Culqi.options({
          paymentMethods: {
            tarjeta: true,
            bancaMovil: true,
            agente: true,
            billetera: true,
            cuotealo: true,
            yape: true,
          }
        });

        window.Culqi.validationPaymentMethods();
        // console.log(window.Culqi.paymentOptionsAvailable);
      } else {
        console.error('Culqi no está disponible. Asegúrate de que el script esté cargado correctamente.');
      }
    },
    abrirCulqi(item) {
      var vm = this
      console.log('vm.idtarjeta:>>> ', vm.idtarjeta)
      if (!vm.idtarjeta || vm.idtarjeta === null || vm.idtarjeta === undefined) {
        notify('danger', '', 'No puede recargar, Debe ingresar un tipo de tarjeta.', 'bottom')
        return
      }

      this.monto = item
      this.recargar()
      this.loadCulqiScript();
      setTimeout(() => {
        if (window.Culqi) {
          window.Culqi.open();
          window.Culqi.success = async (token) => {
            await this.enviarPago(token);
          };

          window.Culqi.error = (error) => {
            console.error('Error en el pago:', error);
          };
        } else {
          console.error('Culqi no está disponible. Asegúrate de que el script esté cargado.');
        }
      }, 1000); // Ajusta este tiempo de espera si es necesario para que el script se cargue completamente
    },
    async enviarPago(token) {
      try {
        const response = await fetch('http://localhost:3001/payment/pagar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            monto: 8500, // Monto en céntimos (85.00 soles)
            token: token.id
          })
        });
        const data = await response.json();
        console.log('Respuesta de pago:', data);
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
    },
    async recargar () {
      var vm                     = this
          vm.cargandoInformacion = true

      if (!vm.idtarjeta || vm.idtarjeta === null || vm.idtarjeta === undefined) {
        notify('danger', '', 'No puede recargar, Debe ingresar una tarjeta.', 'bottom')
        return
      }

      const loading = await showLoading('Cargando datos...');

      var arreglo = {
        idtarjeta : this.idtarjeta,
        idusuario : await getItemStorage('idusuario'),
        monto     : this.monto,
        metodopago: 'Tarjeta de Credito',
      }

      var url = '/recargas/mantenimiento'
      var obj = {
        tipoaccion: 1,
        arreglo   : arreglo
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data:>>> ', data)
        // payment/create-order', { amount: monto });
        // const init_point = response.data.init_point;
        // // Redirigir al usuario a Mercado Pago
        // window.location.href = init_point;
        notify('success', 'Exito', 'Se recargo exitosamente su tarjeta.', 'bottom')
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.limpiar()
        vm.cargandoInformacion = false
      });
    },
  }
};
</script>
