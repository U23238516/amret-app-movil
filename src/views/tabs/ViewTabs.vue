<template>
  <ion-app>
    <ion-page>
      <ion-tabs>
  
        <!-- IonRouterOutlet for managing the routes -->
        <ion-router-outlet />
  
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tarjetas" href="/tabs/tarjetas" @click="setTabTitle('Mis Tarjetas')">
            <ion-icon :icon="card" />
            <ion-label>Mis Tarjetas</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="recargas" href="/tabs/recargas" @click="setTabTitle('Recargas')">
            <ion-icon :icon="repeat" />
            <ion-label>Recargas</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="promociones" href="/tabs/promociones" @click="setTabTitle('Promociones')">
            <ion-icon :icon="briefcase" />
            <ion-label>Promociones</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="cuenta" href="/tabs/cuenta" @click="setTabTitle('Cuenta')">
            <ion-icon :icon="person" />
            <ion-label>Cuenta</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
  
      </ion-tabs>
    </ion-page>
  </ion-app>
</template>

<script>
import { IonApp, IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, modalController  } from '@ionic/vue';
import { card, repeat, briefcase, person }  from 'ionicons/icons';
import { getItemStorage, setItemStorage, removeItemStorage }                   from '@/store/storageService';
import CIonModalCambiarContrasena           from '@/components/CIonModalCambiarContrasena.vue';
export default {
  components: {
    IonApp,
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      card,
      repeat,
      briefcase,
      person,
      tabTitle                    : 'Mis Tarjetas',   // Establecemos el título inicial
      tabSTitle                   : '',   // Establecemos el título inicial
      cambioclave                 : null,
      showModalContraseñaCambiar  : false,
      showMessageContraseñaCambiar: null,
    };
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
    // this.obtenerCambioClave()
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
    // this.obtenerCambioClave()
  },
  async mounted () {
    setItemStorage('tabTitle', this.tabTitle)
    this.tabsTitle = await getItemStorage('tabTitle')
    if (!this.showModalContraseñaCambiar) {
      this.obtenerCambioClave();
    }
  },
  methods: {
    async obtenerCambioClave() {
      var vm          = this
      vm.cambioclave  = await getItemStorage('cambioclave')
      console.log('cambioclave:>>> ', vm.cambioclave)

      const cambioclaveDate = new Date(vm.cambioclave); // Asume que vm.cambioclave es una cadena de fecha válida
      // Formatear la fecha original a 'YYYY-MM-DD'
      const yearOriginal      = cambioclaveDate.getFullYear();
      const monthOriginal     = String(cambioclaveDate.getMonth() + 1).padStart(2, '0');
      const dayOriginal       = String(cambioclaveDate.getDate()).padStart(2, '0');
      const cambioclaveFormat = `${yearOriginal}-${monthOriginal}-${dayOriginal}`;

      // Crear una nueva fecha con 60 días adicionales
      const cambioclaveDate60Days = new Date(cambioclaveDate);
      cambioclaveDate60Days.setDate(cambioclaveDate60Days.getDate() + 60);

      // Formatear la fecha con los 60 días adicionales a 'YYYY-MM-DD'
      const year60Days              = cambioclaveDate60Days.getFullYear();
      const month60Days             = String(cambioclaveDate60Days.getMonth() + 1).padStart(2, '0');
      const day60Days               = String(cambioclaveDate60Days.getDate()).padStart(2, '0');
      const cambioclaveFormat60days = `${year60Days}-${month60Days}-${day60Days}`;

      // console.log(cambioclaveFormat); // Fecha original en 'YYYY-MM-DD'
      // console.log(cambioclaveFormat60days); // Fecha con 60 días adicionales en 'YYYY-MM-DD'

      if (cambioclaveFormat === '1900-01-01') {
        vm.openModalCambiarContraseña()
      } else if (cambioclaveFormat60days === cambioclaveFormat) {
        vm.showModalContraseñaCambiar   = true
        vm.showMessageContraseñaCambiar = ''
      } else {
        vm.showModalContraseñaCambiar   = false
        vm.showMessageContraseñaCambiar = ''
      }
    },
    async openModalCambiarContraseña() {
      // console.log('Modal abierto desde:', new Error().stack);
      const modal = await modalController.create({
        component: CIonModalCambiarContrasena,
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      console.log('data:>> ', data)
      console.log('role:>> ', role)
      if (data === 'accept') {
        console.log(`Nueva contraseña: ${data}`); // Manejar la nueva contraseña
        await removeItemStorage('cambioclave')
      }
      if (role === 'confirm') {
        console.log(`Nueva contraseña: ${data}`); // Manejar la nueva contraseña
        await removeItemStorage('cambioclave')
      }

      // // Evita abrir múltiples instancias del modal
      // if (this.showModalContraseñaCambiar) return; 

      // const modal = await modalController.create({
      //   component: CIonModalCambiarContrasena,
      // });

      // this.showModalContraseñaCambiar = true; // Indica que el modal está abierto

      // await modal.present();

      // const { data, role } = await modal.onWillDismiss();

      // console.log('data:>> ', data);
      // console.log('role:>> ', role);

      // if (data === 'accept' || role === 'confirm') {
      //   console.log(`Nueva contraseña: ${data}`); // Manejar la nueva contraseña
      //   await removeItemStorage('cambioclave');
      // }

      // this.showModalContraseñaCambiar = false; // Restablece el estado del modal
    },
    async setTabTitle(title) {
      this.tabTitle = title; // Actualizamos el título del tab
      setItemStorage('tabTitle', this.tabTitle)
      this.tabsTitle = await getItemStorage('tabTitle')
    },
    // abrirMenu() {
    //   menuController.open("main-menu"); // Abre el menú con el controlador de Ionic
    // }
  }
};
</script>

<style scoped>
</style>
