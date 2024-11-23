import request        from '@/util/request'
import { getToken }   from '@/util/auth'

export function usuariosLista(query) {
  query.token    = getToken()
  query.empresa  = process.env.VUE_APP_EMPRESA
  query.username = localStorage.getItem('username')
  query.idusuario = localStorage.getItem('idusuario')
  query.latitud = localStorage.getItem('latitud')
  query.longitud = localStorage.getItem('longitud')
  query.dispositivo = localStorage.getItem('dispositivo')
  query.ip = localStorage.getItem('ip')
  // console.log('query', query)
  return request({
    url   : process.env.VUE_APP_API_RUTA_USUARIOS + '/lista',
    method: 'get',
    params: query
  }, function (err) {
    return err
  }, function () {
    return false
  })
}

export function usuariosCrearCuenta(data) {
  data.token    = getToken()
  data.empresa  = import.meta.env.VUE_APP_API_ROUTE
  console.log('data', data)
  return request({
    url   : process.env.VUE_APP_API_RUTA_USUARIOS + '/crearcuenta',
    method: 'post',
    data
  }, function (err) {
    return err
  }, function () {
    return false
  })
}

