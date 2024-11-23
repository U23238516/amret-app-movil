<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">

      <ion-select
        label="Seleccione Tarjeta" label-placement="stacked"
        aria-label="Food"
        placeholder="Seleccione tarjeta"
        justify="space-between"
        fill="outline"
        cancel-text="Cancelar"
        ok-text="Confirmar"
        @ionChange="handleChange($event)"
        @ionCancel="handleCancel()"
        @ionDismiss="handleDismiss()"
      >
        <ion-select-option v-for="item in listaTarjetas" :key="item.id" :value="item">
          {{ item.nombretipotarjeta }}
        </ion-select-option>
      </ion-select>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Elige el monto a recargar</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <!-- <ion-button shape="round" v-for="monto in montos" :key="monto" fill="outline" @click="recargar(monto)">
            S/ {{ monto }}
          </ion-button> -->

          <c-ion-culqui :idtarjeta="idtarjeta" :listaSaldoPredeterminado="listaSaldoPredeterminado"></c-ion-culqui>
          
          <!-- <c-ion-culquis  publicKey="pk_test_9153d11b81b02954"
          amount="1000"
          order="ord_live_0CjjdWhFpEAZlxlz"></c-ion-culquis> -->
          
        </ion-card-content>
      </ion-card>

      <ion-input label="Monto" label-placement="stacked" type="number" placeholder="Ingrese monto" @input="validateInput" v-model="otroMonto"></ion-input>
      
      <ion-button shape="round" expand="block" fill="outline" @click="recargar()">
        Recargar
      </ion-button>
      <!-- <c-ion-culquis></c-ion-culquis> -->

    </ion-content>

  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonInput, IonSelect, IonSelectOption, } from '@ionic/vue';
import { getItemStorage } from '@/store/storageService'; 
import CIonCulqui        from '@/components/CIonCulqui.vue';
// import CIonMercadoPago        from '@/components/CIonMercadoPago.vue';
// import CIonCulquis        from '@/components/CIonCulqui2.vue';
import { apiGet, apiPost, notify, showLoading, hideLoading } from '@/util/apiRequests';
export default {
  name      : 'ViewTabsHome1',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    CIonCulqui,
    // CIonCulquis,
  },
  data() {
    return {
      cargandoInformacion: false,
      sortByName         : 'idtarjeta',
      sortByType         : 'ASC',
      ultimoRecnum       : 0,
      cantidadRegistros  : 0,
      pagination         : 1,
      textSearch         : '',
      otroMonto          : null,
      idtarjeta          : null,
      listaTarjetas      : [
        {
          id  : 1,
          name: 'Apples',
          type: 'fruit',
        },
        {
          id  : 2,
          name: 'Carrots',
          type: 'vegetable',
        },
        {
          id  : 3,
          name: 'Cupcakes',
          type: 'dessert',
        },
      ],
      listaSaldoPredeterminado             : [3.00, 5.00, 7.00, 10.00, 15.00]
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
  methods: {
    compareWith(o1, o2) {
      return o1 && o2 ? o1.idtarjeta === o2.idtarjeta : o1 === o2;
    },
    handleChange(ev) {
      console.log('ionChange fired with value: ' + ev.detail.value);
      console.log('Current value:', JSON.stringify(ev.detail.value));
      // Convertir `ev.detail.value` en un objeto si no lo es ya
      const obj = typeof ev.detail.value === 'string' ? JSON.parse(ev.detail.value) : ev.detail.value;

      // Formatear el objeto como JSON para impresión
      const jsonUsuario = JSON.stringify(obj, null, 2);
      console.log(jsonUsuario);

      // Asignar el valor de idtarjeta
      this.idtarjeta = obj.idtarjeta;
      console.log('this.idtarjeta:>>> ', this.idtarjeta);
    },
    handleCancel() {
      console.log('ionCancel fired');
    },
    handleDismiss() {
      console.log('ionDismiss fired');
    },
    validateInput (){
      // Permitir solo números con hasta 2 enteros y 2 decimales
      const regex = /^\d{0,2}(\.\d{0,2})?$/;
      if (!regex.test(this.otroMonto)) {
        this.otroMonto = this.otroMonto.slice(0, -1); // Elimina el último carácter si no coincide
      }
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
    async recargar () {
      var vm                  = this
      vm.listaUsuario         = []
      vm.cargandoInformacion  = true

      if (!vm.idtarjeta || vm.idtarjeta === null || vm.idtarjeta === undefined) {
        notify('danger', '', 'No puede recargar, Debe ingresar una tarjeta.', 'bottom')
        return
      }

      const loading = await showLoading('Cargando datos...');

      var arreglo = {
        idtarjeta : this.idtarjeta,
        idusuario : await getItemStorage('idusuario'),
        monto     : this.otroMonto,
        metodopago: 'Tarjeta de Credito',
      }

      var url = '/recargas/mantenimiento'
      var obj = {
        tipoaccion: 1,
        arreglo   : arreglo
      }
      console.log('obj: ', obj)
      await apiPost(url, obj, (data) => {
        console.log('data:>>> ', data)
        // payment/create-order', { amount: monto });
        // const init_point = response.data.init_point;
        // // Redirigir al usuario a Mercado Pago
        // window.location.href = init_point;
        notify('success', 'Exito', 'Se recargo exitosamente su tarjeta.', 'bottom')
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.limpiar()
        vm.cargandoInformacion = false
      });
    },
    limpiar () {
      var vm            = this
      vm.idtarjeta      = ''
      vm.listaTarjetas  = []
      vm.otroMonto      = ''
    }
  }
}
</script>

<style scoped>
ion-button {
  margin: 8px 0;
}
</style>
