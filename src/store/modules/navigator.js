// import { notify } from '../../utils/general'
var navigator = {
  state: {
  },
  mutations: {
  },
  actions: {
    getCurrentLocalization () {
      // var vm = this
      // if (('geolocation' in navigator)) {
      //   return new Promise((resolve, reject) => {
      //     navigator.geolocation.getCurrentPosition(pos => resolve(pos), err => reject(err))
      //   })
      // } else {
      //   console.log('La geolocalización no está disponible.')
      //   // notify(vm, 'error', 'Error', 'La geolocalización no está disponible.')
      // }
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     function (position) {
      //       return position
      //     },
      //     function (error) {
      //       alert(error.message)
      //     }, {
      //       enableHighAccuracy: true, timeout: 5000
      //     }
      //   )
      // } else {
      //   alert('Este navegador no admite la geolocalización.')
      // }
      // if (('geolocation' in navigator)) {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     console.log('vm:>>> ', position)
      //     return position = position.coords
      //     // console.log('position.coords.latitude:>>> ', vm.position.coords.latitude)
      //     // console.log('position.coords.longitude:>>> ', vm.position.coords.longitude)
      //   })
      // } else {  console.log('no:>>> ') }
    }
  },
  getters: {}
}

export default navigator
