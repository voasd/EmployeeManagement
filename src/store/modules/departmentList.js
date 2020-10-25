import EDManagement from '@/services/EDManagement'
const API_URL = 'api/v1/departments'
export const departmentList = {
  namespaced: true,
  state: {
    _listOfDepartment: []
  },
  getters: {
    _getListOfDepartment (state) {
      return state._listOfDepartment
    }
  },
  mutations: {
    _setListOfDepartment (state, _listOfDepartment) {
      state._listOfDepartment = _listOfDepartment
    },
    _updateDepartmentMutation (state, department) {
      const edtObj = state._listOfDepartment.find(x => x.id === department.id)
      edtObj.departmentName = department.departmentName
      edtObj.hotline = department.hotline
      edtObj.roomNumber = department.roomNumber
    },
    _deleteDepartmentMutation (state, departmentID) {
      const edtObj = state._listOfDepartment.find(x => x.id === departmentID)
      edtObj.isDeleted = !edtObj.isDeleted
    },
    _addDepartmentMutation (state, department) {
      state._listOfDepartment.push(department)
    }
  },
  actions: {
    _getAllDepartment (context) {
      return EDManagement.get(API_URL).then(
        response => {
          context.commit('_setListOfDepartment', response.data.data)
          return response.data.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _addDepartment (context, department) {
      return EDManagement.post(API_URL, department).then(
        response => {
          context.commit('_addDepartmentMutation', response.data.data)
          return response.data.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _updateDepartment (context, department) {
      return EDManagement.put(API_URL + '/' + department.id, department).then(
        response => {
          context.commit('_updateDepartmentMutation', response.data.data)
          return response.data.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _deleteDepartment (context, department) {
      return EDManagement.delete(API_URL + '/' + department.id).then(
        response => {
          context.commit('_deleteDepartmentMutation', response.data.data)
          return response.data.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
