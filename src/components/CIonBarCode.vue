<template>
  <div class="barcode-container">
    <svg ref="barcodeSvg"></svg>
  </div>
  <!-- <ion-button @click="generarCodigoBarras">Generar Código de Barras</ion-button> -->
</template>

<script>
import JsBarcode from 'jsbarcode';
// import { IonButton } from '@ionic/vue';
export default {
  name      : 'CIonBarCode',
  components: {
    // IonButton
  },
  props: {
    numerotarjeta: String
  },
  data() {
    return {
      // codigo: '123456789012', // El código que se quiere generar
    };
  },
  methods: {
    generarCodigoBarras() {
      // Usamos JsBarcode para generar el código de barras en el SVG
      JsBarcode(this.$refs.barcodeSvg, this.numerotarjeta, {
        background  : "transparent",   // Color de fondo
        format      : 'CODE128',       // Formato del código de barras
        lineColor   : '#000000',       // Color de las líneas
        // lineColor   : '#FFFFFF',       // Color de las líneas
        width       : 2,               // Ancho de las líneas
        height      : 25,              // Altura del código de barras
        displayValue: true,            // Mostrar el valor debajo del código de barras
      });
    },
  },
  mounted() {
    // Generamos el código de barras al montar el componente
    this.generarCodigoBarras();
  },
};
</script>

<style scoped>
.barcode-container {
  display        : flex;
  justify-content: center;
  /* margin-top     : 20px; */
}
</style>
