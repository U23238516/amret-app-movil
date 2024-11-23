const state = {
  showIngresoSalidaModal: true
}

const mutations = {
  SET_SHOW_INGRESO_SALIDA_MODAL (state, aux) {
    state.showIngresoSalidaModal = aux
  }
}

const actions = {
  openIngresoSalidaModal ({ commit }) {
    commit('SET_SHOW_INGRESO_SALIDA_MODAL', true)
  },
  editIngresoSalidaModal ({ commit }, id) {
    console.log('id:', id)
    commit('SET_SHOW_INGRESO_SALIDA_MODAL', false)
    commit('SET_INGRESO_SALIDA_ID', id)
    commit('SET_SHOW_INGRESO_SALIDA_MODAL', true)
  },
  closeIngresoSalidaModal ({ commit }) {
    commit('SET_SHOW_INGRESO_SALIDA_MODAL', false)
    commit('SET_INGRESO_SALIDA_ID', null)
  }
}

// const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
