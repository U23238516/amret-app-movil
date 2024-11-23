<template>
  <ion-content class="ion-padding">
    <!-- Contenido de tus notificaciones -->

    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title size="small">
          Notificaciones
          <ion-badge color="danger" class="notification-badge">
            {{ unreadNotificationsCount }}
          </ion-badge>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-list v-if="listaNotificaciones && listaNotificaciones.length === 0">
      <ion-item>
        <ion-label>
          <h3>
            <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
          </h3>
          <p>
            <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
          </p>
          <p>
            <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
          </p>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-list class="notification-list" lines="full" v-else>
      <div v-for="item in listaNotificaciones" :key="item.idnotificacion">
        <ion-item :class="{ 'notification-read': item.leido }" lines="full">
          <ion-label>
            <h3 class="notification-title">{{ item.titulo }}</h3>
            <p class="notification-message">{{ item.texto }}</p>
            <p class="notification-timestamp">{{ item.fecharegistro }}</p>
          </ion-label>
          
          <ion-button fill="clear" 
                      @click="accionnotificacion(1, item.idnotificacion)"
                      v-if="item.leido === 0">
            <ion-icon :icon="checkmark" slot="icon-only" color="success"></ion-icon>
          </ion-button>
          
          <ion-button fill="clear" 
                      @click="accionnotificacion(2, item.idnotificacion)">
            <ion-icon :icon="trash" slot="icon-only" color="danger"></ion-icon>
          </ion-button>
        </ion-item>
      </div>
      <div v-if="listaNotificaciones.length === 0" class="no-notifications">
        <p>No tiene notificaciones</p>
      </div>
    </ion-list>

  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBadge, IonItem, IonLabel, IonButton, IonIcon, IonSkeletonText, IonList, } from '@ionic/vue';
import { apiGet, apiPost, notify } from '@/util/apiRequests';
import { getItemStorage } from '@/store/storageService';
import { checkmark, trash } from 'ionicons/icons'

export default {
  name: 'NotificationsPopovers', // Nombre único
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBadge,
    IonItem, 
    IonLabel, 
    IonButton, 
    IonIcon,
    IonSkeletonText,
    IonList,
  },
  // Añadir props para manejar el cierre
  props: {
    popoverController: {
      type    : Object,
      required: false
    }
  },
  data () {
    return {
      checkmark,
      trash,
      unreadNotificationsCount: 0,
      listaNotificaciones     : [],
      cargandoInformacion     : false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch () {
      var vm                  = this
      vm.listaNotificaciones  = []
      vm.cargandoInformacion  = true

      var url = '/notificaciones/lista-idusuario'
      var obj = {
        idusuario: await getItemStorage('idusuario'),
        activo   : 1
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        vm.cargandoInformacion = false
        for (let i = 0; i < data.lista.length; i++) {
          vm.listaNotificaciones.push(data.lista[i])
        }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.cargandoInformacion = false
      });
    },
    async accionnotificacion(tipoaccion, idnotificacion) {
      var vm                  = this
      vm.listaNotificaciones  = []
      vm.cargandoInformacion  = true

      console.log(idnotificacion)

      var url = '/notificaciones/accion'
      var obj = {
        idusuario     : await getItemStorage('idusuario'),
        idnotificacion: idnotificacion,
        tipoaccion    : tipoaccion
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data:>>> ', data)
        notify('success', '', 'Su accion se ah realizado con exito.', 'bottom')
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.cargandoInformacion = false
      });
    },
    // Método para cerrar el popover
    async dismiss() {
      if (this.popoverController) {
        await this.popoverController.dismiss();
      }
    }
  }
}
</script>

<style scoped>
.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-badge {
  margin-left: 5px;
}

.no-notifications {
  padding: 20px;
  text-align: center;
  color: var(--ion-color-medium);
}

ion-content {
  --background: var(--ion-background-color);
  width: 225px;
}

ion-header {
  background: var(--ion-background-color);
}
.notification-read {
  --background: var(--ion-color-light-tint);
  opacity: 0.8;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-message {
  color: var(--ion-color-dark);
  margin-bottom: 4px;
}

.notification-timestamp {
  font-size: 0.8em;
  color: var(--ion-color-medium);
}

ion-item {
  --padding-start: 16px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}
</style>