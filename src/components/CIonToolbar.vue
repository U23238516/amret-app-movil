<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title slot="start">{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button color="dark" @click="openPopover($event)">
          <ion-icon slot="icon-only" :ios="notificationsCircleOutline" :md="notificationsOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="logout()">
          <ion-icon slot="icon-only" :ios="logOutOutline" :md="logOut"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, popoverController, IonMenuButton } from '@ionic/vue';
import { menuOutline, menu, logOut, logOutOutline, notificationsCircleOutline, notificationsOutline } from 'ionicons/icons';
import { showLoading, hideLoading } from '../util/apiRequests';
// import NotificationsPopover from '../components/CIonNotificaciones.vue'
import NotificationsPopovers from '../components/CIonNotificacioness.vue'
export default {
  name      : 'CIonToolbar',
  components: {
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonIcon,
  },
  props: {
    title: String
  },
  data () {
    return {
      menuOutline,
      menu,
      logOut,
      logOutOutline,
      notificationsCircleOutline,
      notificationsOutline,
      popoverInstance: null,   // Almacena la instancia del popover
      isPopoverOpen  : false   // Bandera para controlar si está abierto
    }
  },
  methods: {
    async logout () {
      var loading = null
      loading     = await showLoading('Cerrando sesión...');
      await this.$storage.clear()
      hideLoading(loading)
      this.$router.push('/')
      // window.location.reload();
    },
    // async opennotificaciones (ev) {
    //   console.log('ev:>>> ', ev)
    //   const popover = await popoverController.create({
    //     component      : NotificationsPopover,
    //     event          : ev,
    //     translucent    : true,
    //     size           : 'auto',
    //     dismissOnSelect: true,
    //     arrow          : true
    //   })
      
    //   await popover.present()

    //   const { role } = await popover.onDidDismiss();
    //   console.log(`Popover dismissed with role: ${role}`)
    // },
    // async opennotificaciones (ev) {
    //   console.log('ev:>>> ', ev)
    //   console.log('Popover abierto:', this.isPopoverOpen);
    //   ev.stopPropagation(); // Detén la propagación del evento
    //   // Verifica si ya hay un popover activo
    //   // if (this.popoverInstance) {
    //   //   return;
    //   // }

    //   if (this.isPopoverOpen) return;

    //   this.isPopoverOpen = true;
      
    //   this.popoverInstance = await popoverController.create({
    //     component      : NotificationsPopover,
    //     // component      : NotificationsPopovers,
    //     event          : ev,
    //     translucent    : true,
    //     size           : 'auto',
    //     dismissOnSelect: true,
    //     arrow          : true,
    //     // showBackdrop   : true
    //   });
      
    //   await this.popoverInstance.present();

    //   const { role } = await this.popoverInstance.onWillDismiss();
    //   console.log('Popover cerrado con rol:', role);

    //   this.isPopoverOpen   = false;  // Marca como cerrado
    //   this.popoverInstance = null;   // Libera la instancia
    // },
    // async opennotificaciones(event) {
    //   console.log('Intentando abrir popover');
    //   if (this.popoverInstance) {
    //     console.log('Popover ya abierto, cancelando.');
    //     return;
    //   }

    //   this.popoverInstance = await popoverController.create({
    //     component: NotificationsPopovers,
    //     event,
    //     translucent: true
    //   });

    //   console.log('Popover creado');

    //   await this.popoverInstance.present();

    //   const { role } = await this.popoverInstance.onWillDismiss();
    //   console.log('Popover cerrado con rol:', role);

    //   this.popoverInstance = null; // Libera la instancia
    // },
    async opennotificaciones(ev) {
      const activePopover = await popoverController.getTop();
      if (activePopover) await activePopover.dismiss();

      const popover = await popoverController.create({
        component  : NotificationsPopovers,
        event      : ev,
        translucent: true,
      });
      await popover.present();

      // const { role } = await popover.onDidDismiss();
      // console.log(`Popover dismissed with role: ${role}`);
    },
    // async openPopover(event) {
    //   console.log('Abriendo popover', event);
      
    //   // Añade un pequeño retraso para prevenir aperturas múltiples
    //   await new Promise(resolve => setTimeout(resolve, 100));

    //   const popover = await popoverController.create({
    //     component: NotificationsPopovers,
    //     event: event,
    //     // Estas opciones pueden ayudar
    //     showBackdrop: true,
    //     dismissOnSelect: true
    //   });
      
    //   console.log('Popover creado', popover);
      
    //   await popover.present();
      
    //   const { role } = await popover.onDidDismiss();
    //   console.log('Popover cerrado', role);
    // }
    // async openPopover(event) {
    //   // Cierra cualquier popover existente
    //   if (this.popoverInstance) {
    //     await this.popoverInstance.dismiss();
    //     this.popoverInstance = null;
    //   }

    //   this.popoverInstance = await popoverController.create({
    //     component: NotificationsPopovers,
    //     event: event
    //   });
      
    //   await this.popoverInstance.present();
      
    //   // Limpiar la referencia al cerrarse
    //   this.popoverInstance.onDidDismiss(() => {
    //     this.popoverInstance = null;
    //   });
    // }
    // async openPopover(event) {
    //   // Asegúrate de crear solo un popover
    //   const popover = await popoverController.create({
    //     component: NotificationsPopovers,
    //     componentProps: {
    //       popoverController: popoverController // Pasa el controlador
    //     },
    //     event: event,
    //     cssClass: 'single-notifications-popover', // Clase única
    //     dismissOnSelect: true
    //   });
      
    //   // Añade un log para depuración
    //   console.log('Creando popover único', popover);
      
    //   await popover.present();
    // }
    async openPopover(event) {
      // Cierra cualquier popover existente primero
      const existingPopover = await popoverController.getTop();
      if (existingPopover) {
        await existingPopover.dismiss();
      }

      const popover = await popoverController.create({
        component      : NotificationsPopovers,
        event          : event,
        cssClass       : 'unique-popover-class',
        showBackdrop   : true,
        dismissOnSelect: true
      });

      console.log('Popover antes de presentar:', popover);
      
      await popover.present();
      
      console.log('Popover después de presentar');
    }
    // async openPopover(event) {
    //   // Cierra cualquier popover existente
    //   const existingPopover = await popoverController.getTop();
    //   if (existingPopover) {
    //     await existingPopover.dismiss();
    //   }

    //   const popover = await popoverController.create({
    //     component      : NotificationsPopovers,
    //     event          : event,
    //     cssClass       : 'unique-popover-class',
    //     showBackdrop   : true,
    //     dismissOnSelect: true,
    //   });

    //   // Asegúrate de que el atributo aria-hidden sea gestionado correctamente
    //   popover.element.setAttribute('aria-hidden', 'false');
    //   // popover.element.removeAttribute('inert'); // Asegúrate de que no esté inerte
    //   await popover.present();
    // },
    // async openPopover(event) {
    //   const popover = await popoverController.create({
    //     component: NotificationsPopovers,
    //     event: event,
    //     cssClass: 'unique-popover-class',
    //     showBackdrop: true,
    //     dismissOnSelect: true
    //   });

    //   popover.element.classList.remove('overlay-hidden');
    //   await popover.present();
    // }
  }
}
</script>

<style scoped>
</style>