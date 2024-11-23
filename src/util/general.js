export function apiGet (vm, url, params, onSuccess, onError, onFinish) {
  const obj = {
    params: params
  }

  params.empresa = import.meta.env.VUE_APP_API_ROUTE
  params.token   = localStorage.getItem('token')

  vm.axios.get(url, obj).then((response) => {
    const data = response.data
    data.status = +data.status;

    if (data.status === -1) {
      // No se ha logueado
      localStorage.setItem('token', '')
      window.location.href = '/'
    } else if (data.status === 0) {
      onError(data)
      if (onFinish) onFinish()
    } else {
      onSuccess(data)
      if (onFinish) onFinish()
    }
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function apiGetExcel (vm, url, params, onSuccess, onError, onFinish) {
  const obj = {
    responseType: 'arraybuffer',
    params: params
  }

  obj.params.empresa = import.meta.env.VUE_APP_API_ROUTE
  obj.params.token   = localStorage.getItem('token')

  vm.axios.get(url, obj).then((response) => {
    const data = response.data
    onSuccess(data)
    if (onFinish) onFinish()
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function apiUpload (vm, url, params, onSuccess, onError, onFinish) {
  const obj = params

  params.empresa = import.meta.env.VUE_APP_API_ROUTE
  params.token   = localStorage.getItem('token')

  vm.axios.post(url, obj).then((response) => {
    const data = response.data
    data.status = +data.status;
    console.log('response:', response)
    if (data.status === -1) {
      // No se ha logueado
      localStorage.setItem('token', '')
      window.location.href = '/'
    } else if (data.status === 0) {
      onError(data)
      if (onFinish) onFinish()
    } else {
      onSuccess(data)
      if (onFinish) onFinish()
    }
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function apiPost (vm, url, params, onSuccess, onError, onFinish) {
  const obj = params

  params.empresa = import.meta.env.VITE_APP_EMPRESA
  params.token   = localStorage.getItem('token')

  vm.axios.post(url, obj).then((response) => {

    console.log('response', response)
    const data = response.data
    data.status = +data.status;
    console.log('response:', response)
    if (data.status === -1) {
      // No se ha logueado
      localStorage.setItem('token', '')
      window.location.href = '/'
    } else if (data.status === 0) {
      onError(data)
      if (onFinish) onFinish()
    } else {
      onSuccess(data)
      if (onFinish) onFinish()
    }
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function apiPut (vm, url, params, onSuccess, onError, onFinish) {
  const obj = params

  params.empresa = import.meta.env.VUE_APP_API_ROUTE
  params.token   = localStorage.getItem('token')

  vm.axios.put(url, obj).then((response) => {
    const data = response.data
    data.status = +data.status;
    console.log('response:', response)
    if (data.status === -1) {
      // No se ha logueado
      localStorage.setItem('token', '')
      window.location.href = '/'
    } else if (data.status === 0) {
      onError(data)
      if (onFinish) onFinish()
    } else {
      onSuccess(data)
      if (onFinish) onFinish()
    }
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function apiDelete (vm, url, params, onSuccess, onError, onFinish) {
  const obj = {
    params: params
  }

  params.empresa = import.meta.env.VUE_APP_API_ROUTE
  params.token   = localStorage.getItem('token')

  vm.axios.delete(url, obj).then((response) => {
    const data = response.data
    data.status = +data.status;
    console.log('response:', response)
    if (data.status === -1) {
      // No se ha logueado
      localStorage.setItem('token', '')
      window.location.href = '/'
    } else if (data.status === 0) {
      onError(data)
      if (onFinish) onFinish()
    } else {
      onSuccess(data)
      if (onFinish) onFinish()
    }
  }).catch((error) => {
    onError(error)
    if (onFinish) onFinish()
  })
}

export function notify (vm, type, title, text) {
  vm.$notify({
    title   : title,
    text    : text,
    position: 'bottom right',
    type    : type
  });
}
