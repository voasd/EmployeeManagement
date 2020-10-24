import EDManagement from '@/services/EDManagement'
const API_URL = 'api/v1/users'

const user = JSON.parse(localStorage.getItem('UserInfo'))
const initialState = user
  ? {
    status: {
      loggedIn: true
    },
    user
  }
  : {
    status: {
      loggedIn: false
    },
    user: null
  }

export const auth = {
  namespaced: true,
  state: initialState,
  mutations: {
    _loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    _loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    _logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    _registerSuccess (state) {
      state.status.loggedIn = false
    },
    _registerFailure (state) {
      state.status.loggedIn = false
    }
  },
  actions: {
    _login (context, user) {
      return EDManagement.post(API_URL + '/authenticate', {
        username: user.username,
        password: user.password
      }).then(
        response => {
          if (response) {
            localStorage.setItem('UserInfo', JSON.stringify(response.data.data))
            context.commit('_loginSuccess', user)
          }
          return response.data.data
        },
        error => {
          context.commit('_loginFailure')
          return Promise.reject(error)
        }
      )
    },
    _logout ({ commit }) {
      localStorage.removeItem('UserInfo')
      commit('_logout')
    }
  }
}
