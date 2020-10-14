import EDManagement from '../../services/EDManagement'
const API_URL = 'api/v1/users'
export const employeeList = {
  namespaced: true,
  state: {
    _listOfEmployee: []
  },
  getters: {
    _getListOfEmployee (state) {
      return state._listOfEmployee
    }
  },
  mutations: {
    _setListOfEmployee (state, _listOfEmployee) {
      state._listOfEmployee = _listOfEmployee
    },
    _addEmployeeMutation (state, employee) {
      state._listOfEmployee.push(employee)
    },
    async _updateEmployeeMutation (state, employee) {
      const edtObj = await state._listOfEmployee.find(
        x => x.id === employee.id
      )
      edtObj.username = employee.username
      edtObj.full_name = employee.full_name
      edtObj.phone_number = employee.phone_number
      edtObj.address = employee.address
      edtObj.email = employee.email
    },
    async _deleteEmployeeMutation (state, employee) {
      await state._listOfEmployee.pop(x => x.id === employee.id)
    }
  },
  actions: {
    _getAllEmployee (context) {
      return EDManagement.get(API_URL, {}).then(
        response => {
          context.commit('_setListOfEmployee', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _addEmployee (context, employee) {
      debugger
      return EDManagement.post(API_URL, employee).then(
        response => {
          context.commit('addEmployeeMutation', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _updateEmployee (context, employee) {
      return EDManagement.put(API_URL + '/' + employee.id, employee).then(
        response => {
          context.commit('_updateEmployeeMutation', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _deleteEmployee (context, employee) {
      return EDManagement.delete(API_URL + '/' + employee.id).then(
        response => {
          context.commit('_deleteEmployeeMutation', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
