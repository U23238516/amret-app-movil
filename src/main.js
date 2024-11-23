import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { Storage } from '@ionic/storage';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// // Importaciones de componentes
// import {
//   IonApp,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonContent,
//   IonPage,
//   IonButton,
//   IonIcon,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonList,
//   IonRouterOutlet,
//   IonTabBar,
//   IonTabButton,
//   IonTabs,
//   IonFab,
//   IonFabButton,
//   IonFabList,
//   IonFooter,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonMenu,
//   IonMenuToggle,
//   IonModal,
//   IonPopover,
//   IonLoading,
//   IonAlert,
//   IonToast,
//   IonCheckbox,
//   IonRadioGroup,
//   IonRadio,
//   IonSelect,
//   IonSelectOption,
//   IonToggle,
//   IonSearchbar,
//   IonAvatar,
//   IonBadge,
//   IonText,
//   IonTextarea,
//   IonGrid,
//   IonRow,
//   IonCol
// } from '@ionic/vue';

// // Para manejar rutas en la aplicación
// import { createRouter, createWebHistory } from 'vue-router';

// // Para usar Ionic Storage si es necesario
// import { Storage } from '@ionic/storage';

// // Para notificaciones y alertas adicionales
// import { useIonToast, useIonAlert, useIonLoading } from '@ionic/vue';

// // Para las utilidades de Lifecycle de Ionic
// import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave, onIonViewDidLeave } from '@ionic/vue';


/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.class.css';
// import '@ionic/vue/css/palettes/dark.system.css'; // Este es el actual

/* Theme variables */
import './theme/variables.css';

async function initializeStorage() {
  const storage = new Storage();
  await storage.create();
  app.config.globalProperties.$storage = storage;
  console.log("Storage creado exitosamente");
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./service-worker.js')
//     .then(() => console.log('Service Worker Registered'))
//     .catch(error => console.error('Service Worker registration failed:', error));
// }

// const storage = new Storage();
// storage.create().then(() => {
//   console.log("Storage created successfully");
// }).catch((error) => {
//   console.error("Error creating storage:", error);
// });

const app = createApp(App)
  .use(IonicVue)
  .use(router);

  initializeStorage();

router.isReady().then(() => {
  app.mount('#app');
});

export { app };
