<template>
  <swiper v-if="lista" @swiper="onSwiperInit" @slideChange="onSlideChange">
    <swiper-slide v-for="item of lista" :key="item.idtarjeta">
      <div class="card-container" @click="flipCard">
        <div :class="['card', { 'is-flipped': isFlipped }]">
          <!-- Cara Frontal -->
          <div class="card-face front">
            <ion-card mode="ios" color="warning">
              <ion-grid>
                <ion-row>
                  <ion-col class="center-row">
                    <ion-img v-if="item.idtipotarjeta === 1" class="img-logo" src="../assets/linea_1_metro_lima.svg" alt="Logo"></ion-img>
                    <ion-img v-else-if="item.idtipotarjeta === 2" class="img-logo" src="../assets/linea_2_metro_lima.png" alt="Logo"></ion-img>
                    <ion-img v-else-if="item.idtipotarjeta === 3" class="img-logo" src="../assets/metropolitano_lima.png" alt="Logo"></ion-img>
                  </ion-col>
                </ion-row>
              </ion-grid>
              <ion-card-header>
                <!-- <ion-card-title>Línea 1 del Metro de Lima</ion-card-title> -->
                <!-- <ion-card-subtitle>Descripción</ion-card-subtitle> -->
                <ion-card-subtitle class="center">{{ item.nombretipotarjeta }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <!-- <ion-col size="12" class="center">
                      <ion-label>
                        <p>Tarjeta del Sistema Metropolitano</p>
                      </ion-label>
                    </ion-col> -->
                    <ion-col size="12" class="center">
                      <ion-label>
                        <ion-badge color="tertiary">{{ item.numerotarjeta }}</ion-badge>
                      </ion-label>
                    </ion-col>
                    <ion-col size="6" class="center">
                      <ion-label>
                        <!-- <p>{{ item.paterno.toUpperCase() }} {{ item.materno.toUpperCase() }}</p> -->
                        <ion-badge color="success">{{ item.asociado === 1 ? 'Virtual'.toUpperCase() : 'Asociado'.toUpperCase() }}</ion-badge>
                      </ion-label>
                    </ion-col>
                    <ion-col size="6" class="center">
                      <ion-label>
                        <ion-badge color="secondary">SALDO: S/ {{ formatNumber(item.saldo) }}</ion-badge>
                      </ion-label>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </div>

          <!-- Cara Trasera -->
          <div class="card-face back">
            <ion-card mode="ios" color="warning">
              <ion-grid>
                <ion-row>
                  <ion-col class="center-row">
                    <!-- <ion-img class="img-logo" src="../assets/linea_1_metro_lima.svg" alt="Logo"></ion-img> -->
                  </ion-col>
                </ion-row>
              </ion-grid>
              <ion-card-header>
                <!-- <ion-card-title>Código de barras</ion-card-title> -->
                <!-- <ion-card-subtitle>{{ item.nombretipotarjeta }}</ion-card-subtitle> -->
                <barcode-generator :numerotarjeta="item.numerotarjeta"></barcode-generator>
              </ion-card-header>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <!-- <ion-col size="12" class="center">
                      <ion-label>
                        <p>Tarjeta del Sistema Metropolitano</p>
                      </ion-label>
                    </ion-col> -->
                    <ion-col size="12" class="center">
                      <ion-label>
                        <!-- <barcode-generator :numerotarjeta="item.numerotarjeta"></barcode-generator> -->
                        <!-- <p>{{ item.numerotarjeta }}</p> -->
                      </ion-label>
                    </ion-col>
                    <ion-col size="6" class="center">
                      <ion-label>
                        <p>{{ item.paterno.toUpperCase() }} {{ item.materno.toUpperCase() }}</p>
                      </ion-label>
                    </ion-col>
                    <ion-col size="6" class="center">
                      <ion-label>
                        <p>{{ item.nombre.toUpperCase() }}</p>
                      </ion-label>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import BarcodeGenerator         from '@/components/CIonBarCode.vue';
import { Swiper, SwiperSlide }  from 'swiper/vue';
import { IonCard, IonCardHeader,  IonCardSubtitle, IonCardContent, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonBadge } from '@ionic/vue';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';

export default{
  name      : 'CIonSlidesCards',
  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    IonCardHeader,
    // IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonBadge,
    BarcodeGenerator
  },
  props: {
    lista: Array
  },
  data() {
    return {
      slideOpts: {
        initialSlide: 0, // Slide inicial
        speed: 400, // Velocidad de la transición entre slides
      },
      cargandoInformacion: false,
      idusuario          : '',
      usuario            : '',
      sortByName         : 'idtarjeta',
      sortByType         : 'ASC',
      ultimoRecnum       : 0,
      cantidadRegistros  : 0,
      pagination         : 1,
      textSearch         : '',
      isFlipped          : false,
      card               : {
        number: "1234 5678 9012 3456",
        name  : "Juan Pérez",
        expiry: "12/25",
        cvv   : "123"
      },
      listaTarjeta     : [],
      indexSeleccionado: 0,
    }
  },
  ionViewWillEnter() {
    // Se activa cuando el componente enrutado está a punto de animarse para aparecer en la vista.
    // Se ejecuta justo antes de que la página (componente) sea visible y montada.
    console.log('lista:>>> ', this.lista)
    this.lista[this.indexSeleccionado] || {};
  },
  ionViewDidEnter() {
    // Se activa cuando el componente enrutado ha terminado de animarse.
    // Se ejecuta cuando la página (componente) es completamente visible y montada.
    console.log('lista:>>> ', this.lista)
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    // Método que captura la instancia de Swiper al inicializarse
    onSwiperInit(swiper) {
      // console.log('Swiper inicializado:', swiper);
      const indexSeleccionado = swiper.activeIndex
      if (swiper.activeIndex === 0) {
        // console.log("Esta es la diapositiva 0:", this.lista[0]);
      }
      // console.log('this.lista[this.indexSeleccionado]:', this.lista[this.indexSeleccionado]);
      this.$emit('selected',  JSON.stringify(this.lista[indexSeleccionado]));
    },
    // Método que se ejecuta cuando cambia la diapositiva activa
    onSlideChange(swiper) {
      if (swiper.activeIndex === 0) {
        // console.log("Esta es la diapositiva 1:", this.lista[0]);
      }
      this.indexSeleccionado = swiper.activeIndex;  // Actualiza el índice de la diapositiva activa
      // console.log('Índice del slide actual:', this.indexSeleccionado);
      // console.log('this.lista[this.indexSeleccionado]:', this.lista[this.indexSeleccionado]);
      this.$emit('selected',  JSON.stringify(this.lista[this.indexSeleccionado]));
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
  height         : 50%;
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
  height         : 26vh;
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