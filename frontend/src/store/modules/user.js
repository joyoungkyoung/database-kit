const state = () => ({
  username: null,
  accessToken: null
})

const getters = {}

const actions = {
  setUser({ commit }, { username, accessToken }) {
    return new Promise((resolve) => {
      commit('setUsername', username)
      commit('setAccessToken', accessToken)

      resolve()
    })
  }
}

const mutations = {
  setUsername(state, username) {
    state.username = username
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
