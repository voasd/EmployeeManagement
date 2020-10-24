import EDManagement from '../../services/EDManagement'
const API_URL = 'api/v1/users'
export const userAuthentication = {
  namespaced: true,
  state: {
    _userAuthentication: ''
  },
  getters: {
    _getUserAuthentication (state) {
      return state._userAuthentication
    }
  },
  mutations: {
    async _updateUserAuthenticationMutation (state, user) {
      state._userAuthentication.username = user.username
      state._userAuthentication.fullName = user.fullName
      state._userAuthentication.phoneNumber = user.phoneNumber
      state._userAuthentication.address = user.address
      state._userAuthentication.email = user.email
    },
    _setUserAuthentication (state, user) {
      state._userAuthentication = user
    }
  },
  actions: {
    _updateUserAuthentication (context, user) {
      return EDManagement.put(API_URL + '/' + user.id, user).then(
        response => {
          context.commit(
            '_updateUserAuthenticationMutation',
            response.data.data
          )
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _getUserProfile (context) {
      return EDManagement.get(API_URL + '/me').then(
        response => {
          context.commit('_setUserAuthentication', response.data.data)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
