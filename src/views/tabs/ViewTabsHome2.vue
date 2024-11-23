<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="example-content">Listen now content</div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
// import { IonHeader, IonToolbar, IonContent, IonPage } from '@ionic/vue';
export default {
  name: 'ViewTabsHome1',
  components: {
    IonContent,
    IonPage,
  }
}
</script>

<style scoped>
.example-content {
  display        : flex;
  align-items    : center;
  justify-content: center;
  height         : 100%;
}
</style>