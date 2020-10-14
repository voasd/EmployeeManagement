import EDManagement from '@/services/EDManagement'
const API_URL = ''
export const departmentList = {
  namespaced: true,
  state: {
    _listOfDepartment: [
      {
        depId: 'SQZZDAE',
        depName: 'Service Room',
        hotLine: '0903265487',
        roomNum: 123
      }
    ]
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
      // const edtObj = state._listOfDepartment.find(x => x.id === department.id)
    },
    _deleteDepartmentMutation (state, department) {
      state._listOfEmployee.pop(x => x.id === department.id)
    },
    _addDepartmentMutation (state, department) {
      state._listOfDepartment.push(department)
    }
  },
  actions: {
    _getAllDepartment (context) {
      return EDManagement.get(API_URL, {}).then(
        response => {
          context.commit('_setListOfDepartment', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _addDepartment (context, department) {
      return EDManagement.post(API_URL, { department }).then(
        response => {
          context.commit('_addDepartmentMutation', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _updateDepartment (context, department) {
      return EDManagement.put(API_URL, { department }).then(response => {
        context.commit('_updateDepartmentMutation', response.data)
        return response.data
      },
      error => {
        return Promise.reject(error)
      })
    },
    _deleteDepartment (context, department) {
      return EDManagement.delete(API_URL + '/' + department.id).then(response => {
        context.commit('_deleteDepartmentMutation', response.data)
        return response.data
      },
      error => {
        return Promise.reject(error)
      })
    }
  }
}
