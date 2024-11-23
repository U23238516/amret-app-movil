<template>
  <template v-if="isEmptyTarjeta">
    <div class="example-content">
      <ion-grid>
        <ion-card mode="ios">
          <ion-card-header class="center-row">
            <ion-card-subtitle>No tiene tarjetas disponibles, porfavor crear.</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content class="center-row">
            <ion-col class="center-row">
              <ion-icon :icon="cardOutline" size="large" color="primary"></ion-icon>
              <ion-button expand="block" fill="outline" @click="mostrar()">Crear Tarjeta Nueva</ion-button>
              <ion-button expand="block" fill="outline" @click="asociar()">Asociar Tarjeta Nueva</ion-button>
            </ion-col>
          </ion-card-content>
        </ion-card>
      </ion-grid>
    </div>
  </template>
  <template v-else>
    <ion-grid>
      <ion-row class="text-align-center">
        <ion-col size="6">
          <ion-row class="text-align-center">
            <ion-col size="12">
              <ion-button fill="outline" @click="mostrar()">
                <ion-icon slot="icon-only" :icon="cardOutline"></ion-icon>
              </ion-button>
            </ion-col>
            <ion-col size="12">
              <ion-text>Nueva Tarjeta</ion-text>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="6">
          <ion-row class="text-align-center">
            <ion-col size="12">
              <ion-button fill="outline" @click="asociar()">
                <ion-icon slot="icon-only" :icon="cardOutline"></ion-icon>
              </ion-button>
            </ion-col>
            <ion-col size="12">
              <ion-text>Asociar Tarjeta</ion-text>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </template>
  <!-- message="Este es el mensaje principal de la alerta." -->
  <ion-alert
    :is-open="isOpen"
    header="Seleccione tipo de tarjeta"
    sub-header="Solo puede crear 1 sola tarjeta por cada tipo."
    :buttons="alertButtons"
    :inputs="listaTiposTarjetas"
    @didDismiss="logResult($event)"
  ></ion-alert>
  <!-- message="Este es el mensaje principal de la alerta." -->
  <ion-alert
    :is-open="isOpen2"
    header="Ingrese numero de tarjeta"
    sub-header="Solo puede asociar 1 sola tarjeta."
    :buttons="alertButtons2"
    :inputs="alertInputs"
    @didDismiss="logResult2($event)"
  ></ion-alert>
</template>

<script>
import { IonButton, IonGrid, IonRow, IonCol, IonIcon, IonText, IonCardSubtitle, IonAlert, IonCard, IonCardHeader, IonCardContent, } from '@ionic/vue';
import { cardOutline }  from 'ionicons/icons';
// import { toRaw } from 'vue';

import { getItemStorage } from '@/store/storageService'; 
import { apiGet, apiPost, notify, showLoading, hideLoading } from '@/util/apiRequests';
export default{
  name  : 'CIonAcciones',
  props : {
    isEmptyTarjeta: Boolean
  },
  emits     : ['update'],
  components: {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonCardSubtitle,
    IonAlert,
    IonCard,
    IonCardHeader,
    IonCardContent,
  },
  data() {
    return {
      cardOutline,
      slideOpts: {
        initialSlide: 0,     // Slide inicial
        speed       : 400,   // Velocidad de la transición entre slides
      },
      cargandoInformacion            : false,
      cargandoInformacionSegment     : false,
      isLoadingTarjetas              : false,
      isLoadingAsociar               : false,
      cargandoInformacionTipoTarjetas: false,
      idusuario                      : '',
      usuario                        : '',
      sortByName                     : 'idtarjeta',
      sortByType                     : 'ASC',
      ultimoRecnum                   : 0,
      cantidadRegistros              : 0,
      pagination                     : 1,
      textSearch                     : '',
      listaTarjetas                  : [],
      listaSegment                   : [],
      listaTiposTarjetas             : [],
      listaTiposTarjetasAux          : [],
      segmentTipo                    : 'todos',
      idtipotarjeta                  : '',
      alertButtons                   : [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
            // this.fetchTiposTarjetas();
            this.isOpen = false
          },
        },
        {
          text: 'Crear Tarjeta',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            if (!this.idtipotarjeta) {
              notify('danger', 'Error', 'Debe seleccionar un tipo de tarjeta para crear.', 'bottom');
              return;
            }
            this.creartarjeta();  // Usa la tarjeta seleccionada
            this.isOpen = false
          },
        },
      ],
      alertButtons2                   : [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Alert canceled');
            // this.fetchTiposTarjetas();
            this.isOpen2 = false
          },
        },
        {
          text: 'Asociar Tarjeta',
          role: 'confirmar',
          handler: () => {
            console.log('Alert confirmed');
          },
        },
      ],
      alertInputs : [
        {
          type       : 'number',
          placeholder: 'Numero a Asociar',
          min        : 1,
          max        : 20,
        }
      ],
      isOpen : false,
      isOpen2: false
    }
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
  },
  methods: {
    mostrar () {
      var vm    = this
      vm.fetchTiposTarjetas()
    },
    asociar () {
      // var vm = this
      var vm      = this
      vm.isOpen2  = true
    },
    async fetchTiposTarjetas () {
      var vm                              = this
      vm.listaTiposTarjetas               = []
      vm.cargandoInformacionTipoTarjetas  = true

      var url = '/tipos-tarjetas/lista'
      var obj = {
        idestado: 1
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        for (let i = 0; i < data.lista.length; i++) {
          // vm.listaTiposTarjetas.push(data.lista[i])
          var objAux = {
            label        : data.lista[i].nombre,
            type         : 'radio',
            value        : data.lista[i].idtipotarjeta,
            idtipotarjeta: `tipoTarjeta-${i}`,            // Añade un id único a cada input
            handler      : (selectedOption) => {
              vm.idtipotarjeta = selectedOption.value;  // Guarda la selección
            }
          }
          vm.listaTiposTarjetas.push(objAux)
        }

        // Se fuerza la reactividad en caso sea necesario
        // Aqui se hace una copia
        vm.listaTiposTarjetas = [...vm.listaTiposTarjetas];

        vm.isOpen = true
        // console.log('vm.listaTiposTarjetas: ', vm.listaTiposTarjetas)
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        vm.cargandoInformacionTipoTarjetas = false
      });
    },
    logResult (event) {
      // console.log('event::: ', event)
      // if (JSON.stringify(event.detail.data) === undefined) {
      //   notify('danger', 'Error', 'Debe seleccionar un tipo de tarjeta para crear.', 'bottom')
      //   return
      // }

      if (event.detail.role === 'confirmar') {
        vm.isOpen = false
      }
      
      // console.log(`Dismissed with role: ${JSON.stringify(event.detail.data)}`);
      // var data           = JSON.stringify(event.detail.data);
      // var dataFormateada = JSON.parse(data)
      // console.log(`Dismissed with role: ${event.detail.role}`);
      var vm = this
      if (event.detail.role === 'confirmar') {
        if (!this.idtipotarjeta) {
          notify('danger', 'Error', 'Debe seleccionar un tipo de tarjeta para crear.', 'bottom');
          return;
        }
        // vm.idtipotarjeta = dataFormateada.values
        console.log('vm.idtipotarjeta:: ', vm.idtipotarjeta)
        vm.creartarjeta()
      }
    },
    logResult2 (event) {
      console.log('event::: ', event)
      if (event.detail.role === 'cancelar') {
        vm.isOpen2 = false
      }
      // if (JSON.stringify(event.detail.data) === undefined) {
      //   notify('danger', 'Error', 'Debe seleccionar un tipo de tarjeta para crear.', 'bottom')
      //   return
      // }
     
      var vm = this
      if (event.detail.role === 'confirmar') {
        console.log(`Dismissed with role: ${JSON.stringify(event.detail.data)}`);
        var data           = JSON.stringify(event.detail.data);
        var dataFormateada = JSON.parse(data)
        console.log(`Dismissed with role: ${event.detail.role}`);
        vm.numeroAsociado = dataFormateada.values[0]

        if (!this.numeroAsociado) {
          notify('danger', 'Error', 'Debe ingresar un numero asociado.', 'bottom');
          return;
        }

        console.log('vm.numeroAsociado:: ', vm.numeroAsociado)
        vm.asociartarjeta()
      }
    },
    async creartarjeta () {
      var vm                = this
      vm.isLoadingTarjetas  = false

      const loading = await showLoading('Creando tarjeta...');

      var arreglo = {
        idtarjeta      : null,
        idtipotarjeta  : vm.idtipotarjeta,
        idusuario      : await getItemStorage('idusuario'),
        numerotarjeta  : null,
        saldo          : '0.00',
        asociado       : 1,
        activo         : 1,
        usuarioregistro: await getItemStorage('usuario'),
        fecharegistro  : vm.fecharegistro
      }
      
      var url = '/tarjetas/mantenimiento'
      var obj = {
        tipoaccion: 1,
        arreglo   : arreglo
      }
      await apiPost(url, obj, (data) => {
        // onSuccess
        console.log('Success:', data);
        notify('success', 'Exito', 'Se creo exitosamente su tarjeta.', 'bottom')
        this.$emit('update');
        vm.isOpen = false
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.isLoadingTarjetas = false
      });
    },
    async asociartarjeta () {
      var vm                = this
      vm.isLoadingAsociar  = false

      const loading = await showLoading('Asociando tarjeta...');

      var arreglo = {
        idusuario     : await getItemStorage('idusuario'),
        numeroAsociado: vm.numeroAsociado,
        asociado      : 2,
      }
      
      var url = '/tarjetas/asociar'
      var obj = {
        tipoaccion: 1,
        arreglo   : arreglo,
      }
      await apiPost(url, obj, (data) => {
        // onSuccess
        console.log('Success:', data);
        notify('success', 'Exito', 'Se asocio exitosamente su tarjeta.', 'bottom')
        this.$emit('update');
        vm.isOpen2 = false
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.isOpen2          = false
        vm.isLoadingAsociar = false
        vm.alertInputs = [
          {
            type       : 'number',
            placeholder: 'Numero a Asociar',
            min        : 1,
            max        : 20,
          }
        ]
      });
    },
  }
}
</script>

<style scoped>
.text-align-center {
  text-align: center;
}

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