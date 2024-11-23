<template>
  <!-- <ion-app>
    <ion-router-outlet />
  </ion-app> -->

  <ion-app>

    <!-- Menú lateral -->
    <CIonMenu />

    <!-- Contenido principal con identificador para el menú -->
    <ion-router-outlet id="main-content"></ion-router-outlet>

    <!-- Menú lateral -->
    <!-- <CIonMenu /> -->
    <!-- Contenido principal -->
    <!-- <div id="main-content">
      <CIonToolbar :title="'Aplicación'" />
      <ion-router-outlet></ion-router-outlet>
    </div> -->

  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import CIonMenu from "@/components/CIonMenu.vue";
// import CIonToolbar from "@/components/CIonToolbar.vue";
// import { setItemStorage } from '@/store/storageService'; 
export default {
  name      : 'App',
  components: {
    IonApp,
    CIonMenu,
    // CIonToolbar,
    IonRouterOutlet
  },
  data() {
    return {
      isDarkMode: false // Estado del modo oscuro
    };
  },
  ionViewWillEnter() {
    // const darkModePreference = setItemStorage('darkMode');
    // if (darkModePreference !== null) {
    //   this.isDarkMode = darkModePreference === true;
    //   document.body.classList.toggle('dark', this.isDarkMode);
    // }
    // this.checkDarkMode(); // Comprobar el modo oscuro al montar el componente
  },
  ionViewDidEnter() {
    // const darkModePreference = setItemStorage('darkMode');
    // if (darkModePreference !== null) {
    //   this.isDarkMode = darkModePreference === true;
    //   document.body.classList.toggle('dark', this.isDarkMode);
    // }
    // this.checkDarkMode(); // Comprobar el modo oscuro al montar el componente
  },
  mounted () {
    this.setupEventListeners();
  },
  methods: {
    // checkDarkMode() {
    //   // Detectar el tema del sistema
    //   this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //   document.body.classList.toggle('dark', this.isDarkMode);

    //   // Escuchar cambios en el tema del sistema
    //   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //     this.isDarkMode = event.matches;
    //     document.body.classList.toggle('dark', this.isDarkMode);
    //   });
    // },
    // toggleDarkMode() {
    //   this.isDarkMode = !this.isDarkMode; // Cambiar el estado
    //   document.body.classList.toggle('dark', this.isDarkMode);
    //   setItemStorage('darkMode', this.isDarkMode); // Guardar la preferencia
    // }
    setupEventListeners() {
      const darkModeListener = (event) => {
        this.isDarkMode = event.matches;
        document.body.classList.toggle('dark', this.isDarkMode);
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.removeEventListener('change', darkModeListener); // Limpia posibles eventos previos
      mediaQuery.addEventListener('change', darkModeListener);
    }
  }
};
</script>
