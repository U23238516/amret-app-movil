<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Ayuda y Preguntas Frecuentes</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-header>
      <c-ion-toolbar title="Ayuda y Preguntas Frecuentes"></c-ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>¿Cómo puedo contactar con soporte?</h2>
            <p>Para contactar con soporte, dirígete a la sección "Soporte Técnico en Línea" en el menú.</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>¿Cómo recargar mi tarjeta?</h2>
            <p>Puedes recargar tu tarjeta directamente desde la pestaña "Recargas".</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>¿Qué debo hacer si olvido mi contraseña?</h2>
            <p>Si olvidas tu contraseña, puedes usar la opción "Restablecer contraseña" desde la pantalla de inicio de sesión.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonLabel, IonContent, IonList, IonItem } from "@ionic/vue";
// import { IonPage, IonHeader, IonLabel, IonToolbar, IonTitle, IonContent, IonList, IonItem } from "@ionic/vue";
import CIonToolbar  from "@/components/CIonToolbar.vue";
export default {
  name: 'ViewAyudaPage',
  components: {
    IonPage,
    IonHeader,
    IonLabel,
    // IonToolbar,
    // IonTitle,
    CIonToolbar,
    IonContent,
    IonList,
    IonItem
  },
};
</script>
