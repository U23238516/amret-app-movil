<template>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Restablecer Contraseña</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="cancelar()">
            <ion-icon slot="icon-only" :ios="closeCircleOutline" :md="closeOutline"></ion-icon>
          </ion-button>          
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-label class="ion-text-wrap">
        Para restablecer tu contraseña es necesario que indiques su correo electronico, te remitiremos un mensaje a tu correo electronico con una clave temporal que podras utilizar.
      </ion-label>

      <ion-input label="Correo Electronico" label-placement="floating" fill="outline" placeholder="Ingrese correo electronico." :clear-input="true" v-model="email"></ion-input>
      <!-- <ion-input v-model="email"
                          ref="input"
                          type="email"
                          fill="outline"
                          label="Correo electronico"
                          label-placement="floating"
                          pattern="email"
                          placeholder="Ingrese su correo electronico"
                          helper-text="Ingrese un correo electronico."
                          error-text="Correo electronico invalido."
                          @ionInput="validate"
                          @ionBlur="markTouched"
                        ></ion-input> -->
  
      <ion-footer>
        <ion-button expand="block" @click="restablecercontrasena()" :disabled="!email">Confirmar</ion-button>
      </ion-footer>
    </ion-content>
  </ion-content>
    
</template>

<script setup>
import { apiPost, notify, showLoading, hideLoading } from '../util/apiRequests';
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonLabel,
  modalController,
  IonIcon
} from '@ionic/vue';
</script>
<script>
import { closeOutline, closeCircleOutline } from 'ionicons/icons';
export default {
  name      : 'CIonModalRestablecerContrasena',
  components: {
  },
  data() {
    return {
      closeOutline,
      closeCircleOutline,
      email        : '',
      validation     : null
    };
  },
  methods: {
    limpiar () {
      var vm      = this
      vm.email  = ''
    },
    cancelar() {
      modalController.dismiss(); // Cierra el modal
    },
    async restablecercontrasena() {
      var vm = this
      vm.isLoadingIngresarCuenta = true
      vm.email = vm.email ? vm.email.trim() : ''

      if (!vm.email || vm.email === null || vm.email === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar una contraseña.', 'bottom')
        return
      }
      // vm.cargandoInformacion  = true
      // var obj                 = {
      //   email   : vm.email,
      //   restablece: 1
      // }
      // console.log('obj:>>> ', obj)
      // emailspasswordRestablecer(obj).then(data => {
      //   vm.cargandoInformacion  = false
      //   vm.modal              = false
      //   if (data.status === 1) {
      //     var texto               = 'Se ah enviado un correo con la contraseña.'
      //     notify(vm, 'success', 'Éxito', texto)
      //   }
      //   vm.$emit('close')
      // }, function (err) {
      //   vm.cargandoInformacion = false
      //   notify(vm, 'error', 'Error', err.message)
      // }, function () {
      //   vm.cargandoInformacion = false
      // })

      const loading = await showLoading('Enviando mesaje a su email...');

      var url = '/usuarios-password/password-restablecer'
      var obj = {
        email     : vm.email,
        restablece: 1
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data login: ', data)
        notify('success', 'Exito', 'Se envio el email correctamente', 'bottom')
        vm.limpiar()
        modalController.dismiss('confirm'); // Devuelve la nueva contraseña
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

