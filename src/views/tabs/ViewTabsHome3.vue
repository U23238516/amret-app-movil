<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid>
          <ion-row>
                
            <ion-col size="12" class="center-img">
              <ion-thumbnail>
                <ion-img :src="form.foto"></ion-img>
              </ion-thumbnail>
            </ion-col>

            <ion-col size="6">
              <ion-input label="Apellido Paterno" label-placement="floating" fill="outline" placeholder="Apellido Paterno" v-model="form.paterno" required></ion-input>
            </ion-col>
      
            <ion-col size="6">
              <ion-input label="Apellido Materno" label-placement="floating" fill="outline" placeholder="Apellido Materno" v-model="form.materno" required></ion-input>
            </ion-col>
      
            <ion-col size="12">
              <ion-input label="Nombre" label-placement="floating" fill="outline" placeholder="Nombre" v-model="form.nombre" required></ion-input>
            </ion-col>

            <ion-col size="6">
              <ion-select label="T. Documento" v-model="form.idtipodocumento" interface="floating">
                <ion-select-option value="01">DNI</ion-select-option>
                <ion-select-option value="02">Carnet de Extranjería</ion-select-option>
                <ion-select-option value="03">Pasaporte</ion-select-option>
              </ion-select>
            </ion-col>
      
            <ion-col size="6">
              <ion-input label="Numero documento" label-placement="floating" fill="outline" placeholder="Numero documento" v-model="form.numerodocumento" maxlength="12" required></ion-input>
            </ion-col>
      
            <ion-col size="12">
              <ion-input label="Correo electronico" label-placement="floating" fill="outline" placeholder="Correo electronico" type="email" v-model="form.email" required></ion-input>
            </ion-col>
      
            <ion-col size="12">
              <ion-input label="Usuario" label-placement="floating" fill="outline" placeholder="Usuario" v-model="form.usuario" :disabled="true"></ion-input>
            </ion-col>
      
            <ion-col size="12">
              <ion-input label="Telefono" label-placement="floating" fill="outline" placeholder="Telefono" v-model="form.telefono" maxlength="15" required></ion-input>
            </ion-col>
      
            <ion-col size="12">
              <ion-label>Foto</ion-label>
              <ion-input type="file" @change="onFileChange" />
            </ion-col>
          </ion-row>
      </ion-grid>

      <ion-button expand="block" @click="actualizar()">Actualizar datos</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonImg, IonContent, IonPage, IonButton, IonInput, IonLabel, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonThumbnail } from '@ionic/vue';
import { getItemStorage } from '@/store/storageService';
import { apiGet, apiPost, notify, showLoading, hideLoading } from '@/util/apiRequests';
export default {
  name      : 'ViewTabsHome3',
  components: {
    IonImg,
    IonContent,
    IonPage,
    IonButton,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
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
      listaUsuario       : [],
      form : {
        idusuario      : '',
        paterno        : '',
        materno        : '',
        nombre         : '',
        idtipodocumento: '',
        numerodocumento: '',
        email          : '',
        usuario        : '',
        // password       : '',
        telefono       : '',
        foto           : '',
        activo         : '',
        idrol          : '',
        ultimoingreso  : '',
        cambioclave    : '',
        usuarioregistro: ''
      }
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
    async onFileChange(event) {
      console.log('event:>>> ', event);
      const file = event.target.files[0];
      console.log('file:>>> ', file);
      // if (file) {
      //   this.form.foto = URL.createObjectURL(file)
      // }
      // try {
      //   const image = await this.convertirABase64(file);
      //   console.log('image:>>> ', image); // Aquí la imagen en Base64
      // } catch (error) {
      //   console.error('Error al convertir el archivo a Base64', error);
      // }
      try {
        this.form.foto = await this.convertirABase64(file);
        // Aquí la imagen en Base64
      } catch (error) {
        console.error('Error al convertir el archivo a Base64', error);
      }
      // if (file) {
      //   foto = URL.createObjectURL(file)
      // }
      // console.log('foto:>>>', foto)
    },
    async convertirABase64(file) {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Evento para cuando la conversión haya finalizado
        reader.onloadend = () => {
          const base64String = reader.result;

          // Asegurarse de que el tipo de imagen está correctamente prefijado
          const mimeType = file.type; // Obtener el tipo de archivo (e.g., "image/jpeg")
          const base64WithPrefix = `data:${mimeType};base64,${base64String.split(',')[1]}`;
          
          resolve(base64WithPrefix);
        };

        // Evento para manejar cualquier error que ocurra
        reader.onerror = reject;

        // Inicia la lectura del archivo como Data URL (Base64)
        reader.readAsDataURL(file);
      });
    },
    async fetch () {
      var vm                  = this
      vm.listaUsuario         = []
      vm.cargandoInformacion  = true

      const loading = await showLoading('Cargando datos...');

      var url = '/usuarios/lista-idusuario'
      var obj = {
        idusuario: await getItemStorage('idusuario')
      }
      console.log('obj: ', obj)
      await apiGet(url, obj, (data) => {
        console.log('data:>>> ', data)
        for (let i = 0; i < data.lista.length; i++) {
          vm.form.idusuario       = data.lista[i].idusuario
          vm.form.paterno         = data.lista[i].paterno
          vm.form.materno         = data.lista[i].materno
          vm.form.nombre          = data.lista[i].nombre
          vm.form.idtipodocumento = data.lista[i].idtipodocumento
          vm.form.numerodocumento = data.lista[i].numerodocumento
          vm.form.email           = data.lista[i].email
          vm.form.usuario         = data.lista[i].usuario
          // vm.form.password        = data.lista[i].password
          vm.form.telefono        = data.lista[i].telefono
          vm.form.foto            = data.lista[i].foto
          vm.form.activo          = data.lista[i].activo
          vm.form.idrol           = data.lista[i].idrol
          vm.form.ultimoingreso   = data.lista[i].ultimoingreso
          vm.form.cambioclave     = data.lista[i].cambioclave
          vm.form.usuarioregistro = data.lista[i].usuarioregistro
          // vm.listaUsuario.push(data.lista[i])
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
    async actualizar() {
      var vm                  = this
      vm.isLoadingCrearCuenta = true

      vm.form.paterno  = vm.form.paterno   ? vm.form.paterno.trim()   : '';
      vm.form.materno  = vm.form.materno   ? vm.form.materno.trim()   : '';
      vm.form.nombre   = vm.form.nombre    ? vm.form.nombre.trim()    : '';
      vm.form.email    = vm.form.email     ? vm.form.email.trim()     : '';
      vm.form.telefono = vm.form.telefono  ? vm.form.telefono.trim()  : '';
      vm.form.email    = vm.form.email     ? vm.form.email.trim()     : '';

      if (!vm.form.paterno || vm.form.paterno === null || vm.form.paterno === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un apellido paterno.', 'bottom')
        return
      }
      if (!vm.form.materno || vm.form.materno === null || vm.form.materno === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un apellido materno.', 'bottom')
        return
      }
      if (!vm.form.nombre || vm.form.nombre === null || vm.form.nombre === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un nombre.', 'bottom')
        return
      }
      if (!vm.form.email || vm.form.email === null || vm.form.email === undefined) {
        notify('danger', '', 'No puede estar vacio, Debe ingresar un correo electronico.', 'bottom')
        return
      }

      const loading = await showLoading('Guardando datos...');

      var arreglousuario = {
        idusuario      : vm.form.idusuario,
        paterno        : vm.form.paterno,
        materno        : vm.form.materno,
        nombre         : vm.form.nombre,
        idtipodocumento: vm.form.idtipodocumento,
        numerodocumento: vm.form.numerodocumento,
        email          : vm.form.email,
        usuario        : vm.form.usuario,
        password       : vm.form.password,
        telefono       : vm.form.telefono,
        foto           : vm.form.foto,
        activo         : 1,
        idrol          : 3,
        ultimoingreso  : vm.form.ultimoingreso,
        cambioclave    : vm.form.cambioclave,
        usuarioregistro: vm.form.usuarioregistro,
        fecharegistro  : vm.form.fecharegistro
      }

      // var validObj      = vm.isObjEmpty(vm.arreglousuario)
      // if (validObj) {
      //   notify('danger', 'Error', 'Debe de crear su cuenta.', 'bottom')
      //   return
      // }

      var url = '/mantenimiento'
      var obj = {
        tipoaccion    : 2,
        arreglousuario: arreglousuario
      }
      await apiPost(url, obj, (data) => {
        // onSuccess
        console.log('Success:', data);
        vm.fetch()
      }, (err) => {
        // onError
        console.error('Error:', err);
        notify('danger', 'Error', err.message, 'bottom')
      }, () => {
        // onFinish
        console.log('Finished');
        hideLoading(loading);
        vm.isLoadingCrearCuenta = false
      });
    },
    handleAvatarSuccess(res, file) {
      console.log('res:>>> ', res)
      console.log('file:>>> ', file)
      var vm = this
      vm.foto = URL.createObjectURL(file.raw)
      console.log('vm.foto:>>> ', vm.foto)
    },
    beforeAvatarUpload(file) {
      console.log('file:>>> ', file)
      var   vm     = this
      const isJPG  = file.type === 'image/jpeg'
      const isPNG  = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        vm.$message.error('La imagen debe estar en formato JPG o PNG!')
        return
      } else if (!isLt2M) {
        vm.$message.error('La imagen excede los 2MB!')
        return
      } else {
        this.createBase64Image(file)
      }
      // return isJPG && isLt2M
      // vm.foto =  file.name
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // this.base64 = e.target.result
        this.form.foto = e.target.result
      }
      // reader.readAsBinaryString(fileObject)
      reader.readAsDataURL(fileObject)
      console.log('fileObject:>>> ', fileObject)
      console.log('this.form.foto:>>> ', this.form.foto)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log('file:>>> ', file)
      var vm = this
      vm.dialogImageUrl = file.url
      vm.dialogVisible = true
    },
    handleDownload(file) {
      console.log('file:>>> ', file)
    },
    handleUploadBefore(file) {
      console.log('file:>>> ', file)
      // var vm = this
      console.log(file.name)
    }
  }
}
</script>

<style scoped>
ion-thumbnail {
  --size: 140px;
  --border-radius: 14px;
}
.center-img {
  text-align: -webkit-center;
}
</style>
