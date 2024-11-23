<template>
  <ion-page>
    <!-- Content -->
    <ion-content class="ion-padding">
      <div class="soporte-container">
        <ion-card class="full-width-card">
          <ion-card-header style="text-align: center;">
            <ion-card-title>Contáctanos para Soporte</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <!-- Nombre completo -->
            <!-- <ion-input 
              v-model="nombre" 
              placeholder="Nombre completo" 
              clear-input 
              label="Nombre completo"
              label-placement="floating"
              fill="outline"
              class="form-input">
            </ion-input> -->

            <!-- Correo electrónico -->
            <ion-input 
              v-model="email" 
              placeholder="Correo electrónico" 
              type="email" 
              clear-input
              label="Correo electrónico"
              label-placement="floating"
              fill="outline"
              class="form-input">
            </ion-input>

            <!-- Número de teléfono -->
            <ion-input 
              v-model="numerotelefono" 
              placeholder="Número de teléfono" 
              type="tel" 
              clear-input
              label="Número de teléfono"
              label-placement="floating"
              fill="outline"
              class="form-input">
            </ion-input>

            <!-- Tipo de consulta -->
            <ion-select 
              v-model="consulta" 
              interface="action-sheet"
              placeholder="Selecciona el tipo de consulta" 
              class="form-select"

              label="Seleccione tipo de consulta" label-placement="stacked"
              aria-label="Food"
              justify="space-between"
              fill="outline"
              cancel-text="Cancelar"
              ok-text="Confirmar"
              @ionChange="handleChange($event, 1)"
              @ionCancel="handleCancel()"
              @ionDismiss="handleDismiss()"
            >
              <ion-select-option value="soporte-tecnico">Soporte Técnico</ion-select-option>
              <ion-select-option value="facturacion">Facturación</ion-select-option>
              <ion-select-option value="otro">Otro</ion-select-option>
            </ion-select>

            <!-- Prioridad -->
            <ion-select 
              interface="action-sheet"
              v-model="prioridad" 
              placeholder="Prioridad" 
              class="form-select"

              label="Seleccione prioridad" label-placement="stacked"
              aria-label="Food"
              justify="space-between"
              fill="outline"
              cancel-text="Cancelar"
              ok-text="Confirmar"
              @ionChange="handleChange($event, 2)"
              @ionCancel="handleCancel()"
              @ionDismiss="handleDismiss()"
            >
              <ion-select-option value="alta">Alta</ion-select-option>
              <ion-select-option value="media">Media</ion-select-option>
              <ion-select-option value="baja">Baja</ion-select-option>
            </ion-select>

            <!-- Mensaje -->
            <ion-textarea
              label="Comentario"
              v-model="mensaje"
              label-placement="floating" 
              placeholder="Describe tu problema o consulta" 
              class="form-textarea">
            </ion-textarea>

            <!-- Botón Enviar -->
            <ion-button expand="block" @click="enviarsoporte">Enviar</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/vue";
import { apiPost, notify, showLoading, hideLoading }  from '../util/apiRequests';
import { getItemStorage } from '@/store/storageService';

export default {
  name: "ViewSoporteTecnicoPage",
  components: {
    IonPage,
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
  },
  data() {
    return {
      email         : '',
      numerotelefono: '',
      consulta  : '',
      prioridad     : '',
      mensaje       : '',
      estado        : 0,
      activo        : 1
    };
  },
  methods: {
    limpiar () {
      var vm            = this
      vm.idst           = ''
      vm.nombre         = ''
      vm.email          = ''
      vm.numerotelefono = ''
      vm.consulta   = ''
      vm.prioridad      = ''
      vm.mensaje        = ''
      vm.archivoAdjunto = ''
    },
    handleChange(event, tipo) {
      console.log('Seleccionado:', event.detail.value);
      if (tipo === 1) {
        this.consulta = event.detail.value
        console.log('this.consulta:>>> ', this.consulta)
      } else {
        this.prioridad = event.detail.value
        console.log('this.prioridad:>>> ', this.prioridad)
      }
      document.querySelector('#content').removeAttribute('inert');
    },
    handleDismiss() {
      console.log('Action Sheet cerrado');
      document.querySelector('#content').setAttribute('inert', '');
    },
    handleCancel() {
      console.log('Cancelado');
    },
    async enviarsoporte() {
      var vm        = this
      vm.isLoading  = true

      vm.email = vm.email ? vm.email.trim() : ''

      if (!vm.email || vm.email === null || vm.email === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar un email.', 'bottom')
        return
      }
      if (!vm.numerotelefono || vm.numerotelefono === null || vm.numerotelefono === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar un numero de telefono.', 'bottom')
        return
      }
      if (!vm.consulta || vm.consulta === null || vm.consulta === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar un tipo de consulta.', 'bottom')
        return
      }
      if (!vm.prioridad || vm.prioridad === null || vm.prioridad === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar una prioridad.', 'bottom')
        return
      }
      if (!vm.mensaje || vm.mensaje === null || vm.mensaje === undefined) {
        notify('danger', 'Error', 'No puede estar vacio, Debe ingresar un mensaje o comentario.', 'bottom')
        return
      }

      var validate = this.validateEmail(vm.email)
      if (!validate) {
        notify('danger', 'Error', 'No  vacio, Debe ingresar un email.', 'bottom')
        return
      }

      const loading = await showLoading('Enviando...');

      var arreglo = {
        idusuario     : await getItemStorage('idusuario'),
        email         : vm.email,
        numerotelefono: vm.numerotelefono,
        consulta      : vm.consulta,
        prioridad     : vm.prioridad,
        mensaje       : vm.mensaje,
        estado        : vm.estado,
        activo        : vm.activo
      }

      var url = '/soporte-tecnico/mantenimiento'
      var obj = {
        tipoaccion: 1,
        arreglo   : arreglo
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data login: ', data)
        notify('success', 'Exito', 'Se envio el email correctamente, puede ver una copia en su bandeja de entrada.', 'bottom')
        vm.limpiar()
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.isLoading = false
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
  },
};
</script>

<style scoped>
/* Contenedor principal */
.soporte-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ocupa todo el alto disponible */
}

/* Estilo de la tarjeta */
.full-width-card {
  width: 100%; /* Ocupa todo el ancho */
  max-width: 600px; /* Limita el tamaño para pantallas grandes */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Añade una sombra suave */
}

/* Estilos de los campos de entrada */
.form-input,
.form-select,
.form-textarea {
  margin-bottom: 15px; /* Espaciado entre los elementos */
}

/* Estilo del input de archivo */
.file-input {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Botón */
ion-button {
  margin-top: 20px; /* Espaciado superior */
}
</style>
