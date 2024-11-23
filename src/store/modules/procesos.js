const state = {
  showProcesos: true
}

const mutations = {
  SET_SHOW_PROCESOS (state, aux) {
    state.showProcesos = aux
  }
}

const actions = {
  openProcesos ({ commit }) {
    commit('SET_SHOW_PROCESOS', false)
    setTimeout(function () {
      commit('SET_SHOW_PROCESOS', true)
    }, 1)
  },
  closeProcesos ({ commit }) {
    commit('SET_SHOW_PROCESOS', false)
  }
}

// const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
