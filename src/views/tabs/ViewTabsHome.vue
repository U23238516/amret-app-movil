<template>
  <ion-page>

    <ion-content class="ion-padding">

      <!-- TARJETAS -->
      <c-ion-slides-cards v-if="listaTarjetas.length > 0 && !cargandoInformacion" :lista="listaTarjetas" @selected="obtenerListaSeleccionada"></c-ion-slides-cards>

      <ion-card mode="ios" v-if="cargandoInformacion">
        <ion-grid>
          <ion-row>
            <ion-col class="center-row">
              <ion-skeleton-text :animated="true" style="width: 100%"></ion-skeleton-text>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-card-header>
          <ion-skeleton-text :animated="true" style="width: 100%"></ion-skeleton-text>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12" class="center">
                <ion-label>
                  <ion-skeleton-text :animated="true" style="width: 100%"></ion-skeleton-text>
                </ion-label>
              </ion-col>
              <ion-col size="6" class="center">
                <ion-label>
                  <ion-skeleton-text :animated="true" style="width: 100%"></ion-skeleton-text>
                </ion-label>
              </ion-col>
              <ion-col size="6" class="center">
                <ion-label>
                  <ion-skeleton-text :animated="true" style="width: 100%"></ion-skeleton-text>
                </ion-label>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <c-ion-acciones v-if="isAccion" :isEmptyTarjeta="isEmptyTarjeta" @update="update"></c-ion-acciones>

      <!-- ULTIMOS MOVIMIENTOS  -->
      <ion-segment v-if="listaTarjetas.length > 0 && !cargandoInformacion" @ionChange="segmentTipoChange()" v-model="segmentTipo" value="todos">
        <ion-segment-button value="todos">
          <ion-label>Todos</ion-label>
        </ion-segment-button>
        <ion-segment-button value="recargas">
          <ion-label>Recargas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="transacciones">
          <ion-label>Transacciones</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-list :inset="true">
        <ion-item v-for="item of listaSegment" :key="item.id">
          <ion-icon :color="item.nombre === 'recargas' ? 'success' : 'danger'" slot="start" :icon="item.nombre === 'recargas' ? addOutline : removeOutline" size="small"></ion-icon>
          <ion-label>
            <h3>{{ item.tipo }}</h3>
            <p>{{ item.fecharegistroformateada }}</p>
          </ion-label>
          <ion-badge :color="item.nombre === 'recargas' ? 'success' : 'danger'">S/ {{ formatNumber(item.monto) }}</ion-badge>
        </ion-item>
      </ion-list>

      <!-- ACTUALIZAR -->
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button @click="update()">
          <ion-icon :icon="refresh"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script>
import CIonSlidesCards    from '@/components/CIonSlidesCards.vue';
import CIonAcciones       from '@/components/CIonAcciones.vue';
import { getItemStorage } from '@/store/storageService'; 
import { apiGet, notify, showLoading, hideLoading } from '@/util/apiRequests';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonSkeletonText, IonCard, IonCardHeader, IonCardContent, IonLabel, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonBadge, IonItem, IonList, } from '@ionic/vue';
// import { IonHeader, IonToolbar, IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonSkeletonText, IonCard, IonCardHeader, IonCardContent, IonLabel, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonBadge, IonItem, IonList, } from '@ionic/vue';
import { refresh, cardOutline, addOutline, removeOutline } from 'ionicons/icons';
// import CIonToolbar from "@/components/CIonToolbar.vue";
export default {
  name      : 'ViewTabsHome',
  components: {
    // IonHeader,
    // IonToolbar,
    // CIonToolbar,
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonSkeletonText,
    IonCard, IonCardHeader, IonCardContent, IonLabel, IonGrid, IonRow, IonCol,
    IonSegment, IonSegmentButton, IonBadge, IonItem, IonList,
    CIonSlidesCards,
    CIonAcciones,
  },
  data() {
    return {
      refresh,
      cardOutline,
      addOutline,
      removeOutline,
      slideOpts: {
        initialSlide: 0, // Slide inicial
        speed: 400, // Velocidad de la transición entre slides
      },
      cargandoInformacion            : false,
      cargandoInformacionSegment     : false,
      isLoadingTarjetas              : false,
      cargandoInformacionTipoTarjetas: false,
      isEmptyTarjeta                 : false,
      isAccion                       : false,
      idusuario                      : '',
      usuario                        : '',
      sortByName                     : 'idtarjeta',
      sortByType                     : 'ASC',
      ultimoRecnum                   : 0,
      cantidadRegistros              : 0,
      pagination                     : 1,
      textSearch                     : '',
      isFlipped                      : false,
      card                           : {
        number: "1234 5678 9012 3456",
        name  : "Juan Pérez",
        expiry: "12/25",
        cvv   : "123"
      },
      listaTarjetas          : [],
      listaTarjetasFormateada: {},
      listaSegment           : [],
      segmentTipo            : 'todos',
      idtipotarjeta          : '',
      alertButtons           : [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
            this.fetchTiposTarjetas();
          },
        },
        {
          text: 'Crear',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
          },
        },
      ]
    }
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
    this.fetch()
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
    // this.fetch()
  },
  ionViewWillLeave() {
    // Se activa cuando el componente que se está enrutando está a punto de animarse.
    // Se ejecuta justo antes de que la página (componente) deje de ser visible.
    // this.fetch()
  },
  ionViewDidLeave() {
    // Se activa cuando el componente de enrutamiento ha terminado de animarse.
    // Se ejecuta después de que la página (componente) ha dejado de ser visible.
    // this.fetch()
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    async fetch () {
      var vm                  = this
      vm.listaTarjetas        = []
      vm.isAccion             = false
      vm.isEmptyTarjeta       = false
      vm.cargandoInformacion  = true

      const loading = await showLoading('Cargando datos...');

      var url = '/tarjetas/lista-idusuario'
      var obj = {
        idusuario: await getItemStorage('idusuario')
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        if (data.lista.length > 0) {
          vm.isAccion       = true
          vm.isEmptyTarjeta = false
          for (let i = 0; i < data.lista.length; i++) {
            vm.listaTarjetas.push(data.lista[i])
          }
        } else {
          vm.isAccion       = true
          vm.isEmptyTarjeta = true
        }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.cargandoInformacion = false
      });
    },
    obtenerListaSeleccionada (lista) {
      var vm = this
      try {
        const listaformateada = JSON.parse(lista);
        console.log('listaformateada:>>> ', listaformateada);
        vm.listaTarjetasFormateada = listaformateada
        vm.segmentTipoChange()
      } catch (err) {
        // console.error("Error al parsear JSON:", err);
        notify('danger', 'Error al parsear JSON', err.message, 'bottom')
      }
    },
    segmentTipoChange() {
      console.log('segment change:>>> ', this.segmentTipo)
      var vm          = this
      vm.listaSegment = []
      vm.fetchSegmentTipo()
    },
    async fetchSegmentTipo () {
      var vm                        = this
      vm.listaSegment               = []
      vm.cargandoInformacionSegment = true

      const loading = await showLoading('Cargando datos...');
      
      console.log('vm.listaTarjetasFormateada, ', vm.listaTarjetasFormateada)
      const listaTarjetasFormateada = JSON.parse(JSON.stringify(vm.listaTarjetasFormateada));
      console.log('listaTarjetasFormateada, ', listaTarjetasFormateada)

      var url = '/tarjetas/movimientos'
      var obj = {
        idtarjeta  : listaTarjetasFormateada.idtarjeta,
        idusuario  : listaTarjetasFormateada.idusuario,
        segmentTipo: this.segmentTipo
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data segment:>>> ', data)
        for (let i = 0; i < data.lista.length; i++) {
          vm.listaSegment.push(data.lista[i])
        }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.cargandoInformacionSegment = false
      });
    },
    async fetchRecargas () {
      var vm                  = this
      vm.listaTarjetas        = []
      vm.isEmptyTarjeta       = false
      vm.cargandoInformacion  = true

      const loading = await showLoading('Cargando datos...');

      var url = '/recargar/lista-idusuario'
      var obj = {
        idusuario: await getItemStorage('idusuario')
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        if (data.lista.length > 0) {
          vm.isEmptyTarjeta = false
          for (let i = 0; i < data.lista.length; i++) {
            vm.listaTarjetas.push(data.lista[i])
          }
        } else {
          vm.isEmptyTarjeta = true
        }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.cargandoInformacion = false
      });
    },
    async fetchTransacciones () {
      var vm                  = this
      vm.listaTarjetas        = []
      vm.isEmptyTarjeta       = false
      vm.cargandoInformacion  = true

      const loading = await showLoading('Cargando datos...');

      var url = '/tarjetas/lista-idusuario'
      var obj = {
        idusuario: await getItemStorage('idusuario')
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        if (data.lista.length > 0) {
          vm.isEmptyTarjeta = false
          for (let i = 0; i < data.lista.length; i++) {
            vm.listaTarjetas.push(data.lista[i])
          }
        } else {
          vm.isEmptyTarjeta = true
        }
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.cargandoInformacion = false
      });
    },
    update () {
      this.fetch()
    },
    formatNumber (num) {
      return parseFloat(num).toFixed(2)
    },
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

.img-logo {
  align-self: center;
  width     : 20%;
  /* height    : 70%; */
  /* margin: -20px !important; */
}

.center-row {
  text-align: -webkit-center;
}

.card-container {
  display        : flex;
  justify-content: center;
  align-items    : center;
  /* height         : 100vh; */
  perspective    : 1000px;  /* Necesario para la rotación 3D */
}

.card {
  width          : 100vw;
  height         : 180px;
  position       : relative;
  transform-style: preserve-3d;
  transition     : transform 0.6s;
  cursor         : pointer;
}

.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width              : 100%;
  height             : 100%;
  position           : absolute;
  top                : 0;
  left               : 0;
  backface-visibility: hidden;    /* Ocultar la cara trasera cuando no está visible */
}

/* Estilo para la cara frontal */
/* .front {
  background-color: white;
} */

/* Estilo para la cara trasera */
.back {
  /* background-color: white; */
  transform: rotateY(180deg);
}

.center {
  text-align: center !important;
}
</style>
