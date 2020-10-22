import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://localhost:44318/'

class EDManagement {
  get (url, obj) {
    return axios
      .get(
        API_URL + url,
        {
          params: obj,
          headers: authHeader()
        }
      )
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })
  }

  post (url, obj) {
    return axios
      .post(API_URL + url, obj, { headers: authHeader() })
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })
  }

  put (url, obj) {
    return axios
      .put(API_URL + url, obj, { headers: authHeader() })
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })
  }

  delete (url, obj) {
    return axios
      .delete(
        API_URL + url,
        {
          params: obj,
          headers: authHeader()
        }
      )
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })
  }
}
export default new EDManagement()
