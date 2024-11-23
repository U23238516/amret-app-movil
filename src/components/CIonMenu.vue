<template>
  <ion-menu side="start" type="reveal" menu-id="main-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menú</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button @click="navigateTo('tarjetas')">Inicio</ion-item>
        <ion-item button @click="navigateTo('tarjetas')">Tarjetas</ion-item>
        <ion-item button @click="navigateTo('recargas')">Recargas</ion-item>
        <ion-item button @click="navigateTo('promociones')">Promociones</ion-item>
        <ion-item button @click="navigateTo('cuenta')">Cuenta</ion-item>
        <ion-item button @click="navigateTo('soporte-tecnico')">Soporte Técnico en Línea</ion-item>
        <ion-item button @click="navigateTo('ayuda')">Ayuda y Preguntas Frecuentes</ion-item>
        <!-- <ion-item button @click="navigateTo('tarjetas')">Inicio</ion-item>
        <ion-item button @click="navigateTo('soporte-tecnico')">Soporte Técnico en Línea</ion-item>
        <ion-item button @click="navigateTo('ayuda')">Ayuda y Preguntas Frecuentes</ion-item> -->
        <!-- Otros ítems del menú -->
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title>AMRET</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-menu>

  <!-- Contenido principal -->
  <!-- <div id="main-content">
    <router-view></router-view>
  </div> -->
  <!-- Contenido principal -->
  <!-- <ion-router-outlet id="main-content" /> -->
</template>

<script>
import { IonMenu, IonHeader, IonFooter, IonToolbar, IonTitle, IonContent, IonList, IonItem, menuController } from "@ionic/vue";
import { getItemStorage, setItemStorage } from '@/store/storageService';
export default {
  components: {
    IonMenu,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem
  },
  data() {
    return {
      tabTitle : 'tarjetas',   // Establecemos el título inicial
      tabSTitle: '',               // Establecemos el título inicial
    };
  },
  watch: {
    // Observa el prop `idtarjeta` para detectar cambios
    tabsTitle: function(newVal) {
      console.log('Opción seleccionada actualizada:', newVal);
    }
  },
  async mounted () {
    this.$storage.set('tabTitle', this.tabTitle)
    this.tabsTitle = await getItemStorage('tabTitle')
  },
  methods: {
    async setTabTitle(title) {
      this.tabTitle = title; // Actualizamos el título del tab
      setItemStorage('tabTitle', this.tabTitle)
      this.tabsTitle = await getItemStorage('tabTitle')
    },
    async navigateTo(page) {
      await menuController.close(); // Cierra el menú antes de navegar
      this.setTabTitle(page)
      this.$router.push(`/tabs/${page}`);
    }
  }
};
</script>
