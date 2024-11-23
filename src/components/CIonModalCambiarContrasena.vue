<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cambiar Contraseña</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-label class="ion-text-wrap">
        Para restablecer tu contraseña es necesario que indiques su correo electronico, te remitiremos un mensaje a tu correo electronico con una clave temporal que podras utilizar.
      </ion-label>

      <ion-input type="password" label="Contraseña actual" label-placement="floating" fill="outline" placeholder="Ingrese contraseña actual." :clear-input="true" v-model="contrasenaActual"><ion-input-password-toggle slot="end"></ion-input-password-toggle></ion-input>
      <ion-input type="password" label="Contraseña Nueva" label-placement="floating" fill="outline" placeholder="Ingrese contraseña nueva." :clear-input="true" v-model="contrasenaNuevo"> <ion-input-password-toggle slot="end"></ion-input-password-toggle></ion-input>
      <ion-input type="password" label="Repita Contraseña Nueva" label-placement="floating" fill="outline" placeholder="Repita contraseña." :clear-input="true" v-model="contrasenaRepetida"> <ion-input-password-toggle slot="end"></ion-input-password-toggle></ion-input>
  
      <ion-footer>
        <ion-button expand="block" @click="restablecercontrasena()" :disabled="!contrasenaActual || !contrasenaNuevo || !contrasenaRepetida">Confirmar</ion-button>
      </ion-footer>
    </ion-content>
  </ion-content>
    
</template>

<script setup>
import { apiPost, notify, showLoading, hideLoading }  from '../util/apiRequests';
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  modalController,
  IonInputPasswordToggle
} from '@ionic/vue';
</script>
<script>
import { closeOutline, closeCircleOutline } from 'ionicons/icons';
import { getItemStorage } from '@/store/storageService'; 
export default {
  name      : 'CIonModalRestablecerContrasena',
  components: {
  },
  data() {
    return {
      closeOutline,
      closeCircleOutline,
      isLoadingIngresarCuenta: false,
      contrasenaTemporal     : null,
      contrasenaActual       : null,
      contrasenaNuevo        : null,
      contrasenaRepetida     : null,
      validation             : null,
    };
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
  },
  methods: {
    limpiar () {
      var vm                      = this
      vm.isLoadingIngresarCuenta  = false
      vm.contrasenaTemporal       = null
      vm.contrasenaActual         = null
      vm.contrasenaNuevo          = null
      vm.contrasenaRepetida       = null
    },
    cancelar() {
      modalController.dismiss(); // Cierra el modal
    },
    async restablecercontrasena() {
      var vm                      = this
      vm.isLoadingIngresarCuenta  = true

      vm.contrasenaTemporal = await getItemStorage('passwordTemporal')

      if (vm.contrasenaActual !== vm.contrasenaTemporal) {
        notify('danger', 'Error', 'La contraseña temporal, no coincide con la contraseña actual.', 'bottom')
        return
      }
      if (vm.contrasenaRepetida !== vm.contrasenaNuevo) {
        notify('danger', 'Error', 'La contraseña repetida, no coincide con la contraseña nueva.', 'bottom')
        return
      }

      const loading = await showLoading('Enviando mesaje a su email...');

      var url = '/usuarios-password/password-cambiar'
      var obj = {
        idusuario : await getItemStorage('idusuario'),
        password  : vm.contrasenaNuevo,
        restablece: 0
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data login: ', data)
        notify('success', 'Exito', 'Se ha cambiado la contraseña correctamente', 'bottom')
        vm.limpiar()
        modalController.dismiss('accept', 'confirm'); // Devuelve la nueva contraseña
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.isLoadingIngresarCuenta = false
        hideLoading(loading);
      });
    },
    validateEmail(email) {
      var vm        = this
      vm.validation = null
      vm.validation = email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
      return vm.validation;
    },
    markTouched() {
      this.$refs.input.$el.classList.add('ion-touched');
    },
    validate(ev) {
      const value = ev.target.value;

      this.$refs.input.$el.classList.remove('ion-valid');
      this.$refs.input.$el.classList.remove('ion-invalid');

      if (value === '') return;

      this.validateEmail(value)
        ? this.$refs.input.$el.classList.add('ion-valid')
        : this.$refs.input.$el.classList.add('ion-invalid');
    }
  },
};
</script>

<style scoped>
/* Estilos opcionales */
</style>

