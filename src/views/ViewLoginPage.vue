<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Recargas - Empresa Transporte</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content class="ion-padding">
      <div class="auth-container">

        <ion-grid>
          <ion-row>
            <ion-col class="center-row">
              <ion-img class="img-logo" src="../assets/amret_logo_negro.png" alt="Logo" width="50px"></ion-img>
            </ion-col>
          </ion-row>

          <!-- Animación con transición -->
          <transition name="slide-fade" mode="out-in">

            <div v-if="isLogin" key="login">
              <ion-card>
                <ion-card-header>
                  <ion-card-title class="center">Iniciar Sesión</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <!-- Input de usuario -->
                  <ion-input label="Usuario" label-placement="floating" fill="outline" placeholder="Ingrese usuario." :clear-input="true" v-model="usuario"></ion-input>
                  <!-- <ion-item>
                  </ion-item> -->

                  <!-- Input de contraseña -->
                  <ion-input type="password" label="Contraseña" label-placement="floating" fill="outline" placeholder="Ingrese password." :clear-input="true" v-model="password">
                    <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                  </ion-input>
                  <!-- <ion-item>
                  </ion-item> -->

                  <!-- Botón para iniciar sesión -->
                  <ion-button expand="block" @click="login">Iniciar Sesión</ion-button>

                  <!-- Link para registrarse -->
                  <ion-button expand="block" fill="clear" @click="toggleAuth">¿No tienes una cuenta? Regístrate</ion-button>

                  <!-- Link para registrarse -->
                  <ion-button expand="block" fill="clear" @click="openModalCambiarContraseña()">¿Olvidaste tu contraseña?</ion-button>
                  
                </ion-card-content>
              </ion-card>
            </div>

            <!-- Formulario de registro -->
            <div v-else key="register">
              <ion-card>
                <ion-card-header>
                  <ion-card-title class="center">Crear Cuenta</ion-card-title>
                </ion-card-header>
                <ion-card-content>

                  <ion-grid>
                    <ion-row>
                      <ion-col size="6">
                        <ion-input v-model="paterno" label="Apellido Paterno" label-placement="floating" fill="outline" placeholder="Apellido Paterno"></ion-input>
                      </ion-col>
                      <ion-col size="6">
                        <ion-input v-model="materno" label="Apellido Materno" label-placement="floating" fill="outline" placeholder="Apellido Materno"></ion-input>
                      </ion-col>
                    </ion-row>
                    <ion-row>
                      <ion-col size="12">
                        <ion-input v-model="nombre" label="Nombre" label-placement="floating" fill="outline" placeholder="Ingrese su nombre completo"></ion-input>
                      </ion-col>
                    </ion-row>
                    <ion-row>
                      <ion-col size="12">
                        <ion-input v-model="email"
                          ref="input"
                          type="email"
                          fill="outline"
                          label="Correo electronico"
                          label-placement="floating"
                          placeholder="Ingrese su correo electronico"
                          helper-text="Ingrese un correo electronico."
                          error-text="Correo electronico invalido."
                          @ionInput="validate"
                          @ionBlur="markTouched"
                        ></ion-input>
                      </ion-col>
                    </ion-row>
                    <ion-row>
                      <ion-col size="12">
                        <ion-input v-model="password" type="password" label="Contraseña" label-placement="floating" fill="outline" placeholder="Ingrese su contraseña"  @input="validatePassword">
                          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                        </ion-input>
                      </ion-col>
                      <!-- Validaciones con Checks -->
                      <!-- Lista de Validaciones con Checkboxes -->
                      <ion-col class="validation-item" size="6">
                        <ion-checkbox :checked="validations.minLength" disabled />
                        <ion-label class="validation-label">La contraseña debe tener al menos 6 caracteres.</ion-label>
                      </ion-col>
                      <ion-col class="validation-item" size="6">
                        <ion-checkbox :checked="validations.hasUppercase" disabled />
                        <ion-label class="validation-label">Debe contener al menos una letra mayúscula.</ion-label>
                      </ion-col>

                      <ion-col class="validation-item" size="6">
                        <ion-checkbox :checked="validations.hasLowercase" disabled />
                        <ion-label class="validation-label">Debe contener al menos una letra minúscula.</ion-label>
                      </ion-col>

                      <ion-col class="validation-item" size="6">
                        <ion-checkbox :checked="validations.hasNumber" disabled />
                        <ion-label class="validation-label">Debe contener al menos un número.</ion-label>
                      </ion-col>

                      <ion-col class="validation-item" size="6">
                        <ion-checkbox :checked="validations.hasSpecialChar" disabled />
                        <ion-label class="validation-label">Debe contener al menos un carácter especial.</ion-label>
                      </ion-col>

                    </ion-row>

                    <ion-row>
                      <ion-col size="12">
                        <ion-input v-model="password2" type="password" label="Repetir Contraseña" label-placement="floating" fill="outline" placeholder="Repita su contraseña">
                          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                        </ion-input>
                      </ion-col>
                    </ion-row>
                  </ion-grid>

                  <!-- Botón para crear cuenta -->
                  <ion-button expand="block" @click="register" :disabled="!isPasswordValid || !password2">Crear Cuenta</ion-button>

                  <!-- Link para volver al login -->
                  <ion-button expand="block" fill="clear" @click="toggleAuth">¿Ya tienes cuenta? Inicia Sesión</ion-button>
                </ion-card-content>
              </ion-card>
            </div>
          </transition>
      </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonImg, IonContent, IonPage, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonInputPasswordToggle, modalController, IonLabel, IonCheckbox } from '@ionic/vue';
</script>
<script>
import { apiPost, notify, showLoading, hideLoading } from '../util/apiRequests';
import CIonModalRestablecerContrasena from '@/components/CIonModalRestablecerContrasena.vue';

export default {
  name      : 'ViewLoginPage',
  components: {
    // CIonModalRestablecerContrasena
  },
  data() {
    return {
      isLogin                : true,                                                                               // Controla si estamos en login o registro
      isLoadingCrearCuenta   : true,
      isLoadingIngresarCuenta: true,
      tipoaccion             : 0,
      idusuario              : 0,
      nombre                 : '',
      paterno                : '',
      materno                : '',
      idtipodocumento        : '',
      numerodocumento        : '',
      email                  : '',
      usuario                : '',
      password               : '',
      password2              : '',
      telefono               : '',
      foto                   : '',
      activo                 : 1,
      idrol                  : 3,
      ultimoingreso          : '',
      cambioclave            : '',
      usuarioregistro        : '',
      fecharegistro          : '',
      message                : 'Este ejemplo de modal utiliza modalController para presentar y cerrar modales.',
      isModalOpen            : false,
      validations            : {
        minLength     : false,
        hasUppercase  : false,
        hasLowercase  : false,
        hasNumber     : false,
        hasSpecialChar: false,
      },
      isPasswordValid: false,
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
  ionViewWillLeave() {
    // Se activa cuando el componente que se está enrutando está a punto de animarse.
    // Se ejecuta justo antes de que la página (componente) deje de ser visible.
  },
  ionViewDidLeave() {
    // Se activa cuando el componente de enrutamiento ha terminado de animarse.
    // Se ejecuta después de que la página (componente) ha dejado de ser visible.
  },
  methods: {
    limpiar () {
      var vm              = this
      vm.idusuario        = 0
      vm.nombre           = ''
      vm.paterno          = ''
      vm.materno          = ''
      vm.idtipodocumento  = ''
      vm.numerodocumento  = ''
      vm.email            = ''
      vm.usuario          = ''
      vm.password         = ''
      vm.password2        = ''
      vm.telefono         = ''
      vm.foto             = ''
      vm.activo           = 1
      vm.idrol            = 3
      vm.ultimoingreso    = ''
      vm.cambioclave      = ''
      vm.usuarioregistro  = ''
      vm.fecharegistro    = ''
    },
    toggleAuth() {
      this.isLogin = !this.isLogin; // Alterna entre login y registro
    },
    async openModalCambiarContraseña() {
      const modal = await modalController.create({
        component: CIonModalRestablecerContrasena,
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log(`Nueva contraseña: ${data}`); // Manejar la nueva contraseña
      }
    },
    isObjEmpty (obj) {
      // console.log('obj:>>> ', obj)
      // var verificar = Object.keys(obj).length === 0
      // console.log('verificar:>>> ', verificar)
      // return verificar
      if (JSON.stringify(obj) === '{}' || obj === null || obj === undefined) {
        return true
      }
    },
    // async login() {
    //   try {
    //     const response = await axios.post('https://api.tu-servidor.com/auth/login', {
    //       email: this.email,
    //       password: this.password,
    //     });
    //     const { token } = response.data;
    //     localStorage.setItem('authToken', token);
    //     this.$router.push('/dashboard'); // Redirige a la página principal
    //   } catch (error) {
    //     console.error('Error al iniciar sesión:', error);
    //   }
    // },
    async login () {
      var vm                      = this
      vm.isLoadingIngresarCuenta  = true

      vm.usuario  = vm.usuario ? vm.usuario.trim() : ''
      vm.password = vm.password ? vm.password.trim() : ''

      if (!vm.usuario) {
        notify('danger', '', 'El campo usuario no debe estar vacio.', 'bottom')
        vm.isLoadingIngresarCuenta = false
        return
      }

      if (!vm.password) {
        notify('danger', 'Error', 'El campo contraseña no debe estar vacio.', 'bottom')
        vm.isLoadingIngresarCuenta = false
        return
      }

      const loading = await showLoading('Enviando datos...');

      var url = '/login'
      var obj = {
        usuario : vm.usuario,
        password: vm.password
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data login: ', data)
        // showLoading('Cargando...')
        this.$storage.set('paterno', data.paterno)
        this.$storage.set('materno', data.materno)
        this.$storage.set('nombre', data.nombre)
        this.$storage.set('passwordTemporal', vm.password)
        this.$storage.set('idusuario', data.idusuario)
        this.$storage.set('usuario', data.usuario)
        this.$storage.set('email', data.email)
        this.$storage.set('idrol', data.idrol)
        this.$storage.set('cambioclave', data.cambioclave)
        this.$storage.set('token', data.ctoken)
        this.$storage.set('token', data.token)
        vm.limpiar()
        this.$router.push('/tabs/tarjetas')
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
    // async register() {
    //   try {
    //     await axios.post('https://api.tu-servidor.com/auth/register', {
    //       name: this.name,
    //       email: this.email,
    //       password: this.password,
    //     });
    //     this.isLogin = true; // Cambia al login tras registrarse
    //   } catch (error) {
    //     console.error('Error al crear la cuenta:', error);
    //   }
    // },
    // register () {
    //   var vm          = this
    //   vm.isLoading    = true

    //   // vm.username   = vm.username ? vm.username.trim() : ''
    //   // vm.password   = vm.password ? vm.password.trim() : ''

    //   // if (!vm.username) {
    //   //   notify(vm, 'error', 'Error', 'El campo Usuario no debe estar vacio.')
    //   //   vm.isLoading = false
    //   //   return
    //   // }

    //   // if (!vm.password) {
    //   //   notify(vm, 'error', 'Error', 'El campo Contraseña no debe estar vacio.')
    //   //   vm.isLoading = false
    //   //   return
    //   // }

    //   // var objAux = {}

    //   var url = '/crearcuenta'
    //   var obj = {
    //     name    : vm.name,
    //     password: vm.password
    //   }
    //   console.log('obj: ', obj)
    //   apiPost(vm, url, obj, function (data) {
    //     console.log('data register: ', data)
    //   }, function (err) {
    //     console.log('err: ', err)
    //     // notify(vm, 'error', 'Error', err.message)
    //   }, function () {
    //     vm.isLoading = false
    //   })
    // },
    async register() {
      var vm                  = this
      vm.isLoadingCrearCuenta = true

      vm.paterno   = vm.paterno   ? vm.paterno.trim()   : '';
      vm.materno   = vm.materno   ? vm.materno.trim()   : '';
      vm.nombre    = vm.nombre    ? vm.nombre.trim()    : '';
      vm.email     = vm.email     ? vm.email.trim()     : '';
      vm.password  = vm.password  ? vm.password.trim()  : '';
      vm.password2 = vm.password2 ? vm.password2.trim() : '';

      if (!vm.paterno || vm.paterno === null || vm.paterno === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un apellido paterno.')
        return
      }
      if (!vm.materno || vm.materno === null || vm.materno === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un apellido materno.')
        return
      }
      if (!vm.nombre || vm.nombre === null || vm.nombre === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un nombre.')
        return
      }
      if (!vm.email || vm.email === null || vm.email === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un correo electronico.')
        return
      }
      if (vm.password2 !== vm.password) {
        notify('danger', 'Error', 'Las contraseñas no coinciden.', 'bottom')
        return
      }

      if (!this.isPasswordValid) {
        notify('danger', 'Error', 'Corrige los errores antes de enviar el formulario.', 'bottom')
        return
      }

      var arreglousuario = {
        idusuario      : vm.idusuario,
        paterno        : vm.paterno,
        materno        : vm.materno,
        nombre         : vm.nombre,
        idtipodocumento: vm.idtipodocumento,
        numerodocumento: vm.numerodocumento,
        email          : vm.email,
        usuario        : vm.usuario,
        password       : vm.password,
        password2      : vm.password2,
        telefono       : vm.telefono,
        foto           : vm.foto,
        activo         : 1,
        idrol          : 3,
        ultimoingreso  : vm.ultimoingreso,
        cambioclave    : vm.cambioclave,
        usuarioregistro: vm.usuarioregistro,
        fecharegistro  : vm.fecharegistro
      }

      // var validObj      = vm.isObjEmpty(vm.arreglousuario)
      // if (validObj) {
      //   notify('danger', 'Error', 'Debe de crear su cuenta.', 'bottom')
      //   return
      // }

      var url = '/mantenimiento'
      var obj = {
        tipoaccion    : 1,
        arreglousuario: arreglousuario
      }
      await apiPost(url, obj, (data) => {
        // onSuccess
        console.log('Success:', data);
        vm.limpiar()
        vm.usuario  = data.lista.usuario
        notify('success', 'Exito', 'Registro de cuenta existoso.', 'bottom')
        vm.toggleAuth()
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.isLoadingCrearCuenta = false
      });
    },
    validatePassword() {
      this.validations.minLength      = this.password.length >= 6;
      this.validations.hasUppercase   = /[A-Z]/.test(this.password);
      this.validations.hasLowercase   = /[a-z]/.test(this.password);
      this.validations.hasNumber      = /\d/.test(this.password);
      this.validations.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

      this.isPasswordValid = Object.values(this.validations).every(Boolean);
    },
    validateEmail(email) {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
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
  }
};
</script>

<style scoped>
.auth-container {
  /* display        : flex; */
  justify-content: center;
  /* align-items    : center; */
  height         : 80%;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.center {
  align-self: center;
}

.img-logo {
  align-self: center;
  width     : 70%;
  /* height    : 70%; */
  margin: -20px !important;
}

.center-row {
  text-align: -webkit-center;
}

.validation-item {
  --padding-start: 0;
  display: flex;
  align-items: center;
}

.validation-label {
  font-size: 0.5rem;
  margin-left: 5px;
  flex-grow: 1;
  color: var(--ion-text-color, #000);
}

/* Establecer el tamaño del IonCheckbox a 12px */
ion-checkbox {
    --size: 10px;
    /* --checkbox-background-checked: #6815ec; */
  }

  /* ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #6815ec;
  } */
.validation-item {
  --padding-start: 0;
  display: flex;
  align-items: center; /* Centramos verticalmente el IonCheckbox y el IonLabel */
  justify-content: flex-start; /* Asegura que los elementos estén alineados al inicio */
  margin-bottom: 0px; /* Espacio mínimo entre los elementos */
}
</style>
