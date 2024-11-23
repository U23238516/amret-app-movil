<!-- src/layouts/MainLayout.vue -->
<template>
  <div>
    <!-- Si el usuario no está autenticado, mostrar el login -->
    <div v-if="!isAuthenticated">
      <ViewLoginPage />
    </div>
  
    <!-- Si el usuario está autenticado, mostrar la barra de herramientas y el contenido principal -->
    <div v-else>
      <!-- Barra de herramientas -->
      <CIonToolbar :title='pageTitle' />
  
      <!-- Contenido de la página -->
      <ion-content>
        <ion-router-outlet></ion-router-outlet>
      </ion-content>
  
      <!-- Pestañas -->
      <CIonViewTabs />
    </div>
  </div>
</template>

<script>
import { IonContent, IonRouterOutlet } from '@ionic/vue';
import CIonToolbar      from '@/components/CIonToolbar.vue';
import CIonViewTabs     from '@/views/tabs/ViewTabs.vue';
import ViewLoginPage    from '../views/ViewLoginPage.vue';
import { getItemStorage } from '@/store/storageService';

export default {
  name: 'MainLayout',
  components: {
    IonContent,
    IonRouterOutlet,
    CIonToolbar,
    CIonViewTabs,
    ViewLoginPage
  },
  data () {
    return {
      isAuthenticated: ''
    }
  },
  computed: {
    pageTitle() {
      // Determina el título basado en la ruta actual
      const route = this.$route;
      if (route.name === 'Tajetas') return 'Tajetas';
      if (route.name === 'Recargas') return 'Recargas';
      if (route.name === 'Promociones') return 'Promociones';
      if (route.name === 'Cuenta') return 'Cuenta';
      if (route.name === 'Soporte-Tecnico') return 'Soporte Tecnico';
      if (route.name === 'Ayuda') return 'Ayuda';
      return 'Tajetas';
    },
  },
  created () {
    this.istoken()
  },
  methods: {
    async istoken () {
      this.isAuthenticated = await getItemStorage('token')
    }
  }
};
</script>
