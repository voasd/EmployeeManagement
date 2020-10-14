<template>
  <v-data-table
    :headers="headers"
    :items="listDepartment"
    :search="search"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Department</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="editedItem.depId"
                    label="Department ID"
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.depName"
                    label="Department Name"
                    :rules="departmentNameRules"
                    clearable
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.hotLine"
                    label="Hot Line"
                    clearable
                    :rules="phoneNumberRules"
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.roomNum"
                    label="Room Num"
                    clearable
                    :rules="roomNumRules"
                  />
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  data () {
    var regex = /(09|01[2|6|8|9])+([0-9]{8})\b/g
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Department ID',
          align: 'start',
          sortable: false,
          value: 'depId'
        },
        { text: 'Department Name', value: 'depName' },
        { text: 'Hotline', value: 'hotLine' },
        { text: 'Roomnum', value: 'roomNum' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      phoneNumberRules: [
        v => !!v || 'Phone Number is required',
        v =>
          (v && v.match(regex)) || 'Phone Number must be  format phone number'
      ],
      departmentNameRules: [
        v => !!v || 'Department name is required',
        v =>
          (v && v.length < 450) ||
          'Department name must be less than 450 characters'
      ],
      roomNumRules: [
        v => !!v || 'Room num is required',
        v => (v && v.length < 10) || 'Room num must be less than 10 characters'
      ],
      listDepartment: [],
      editedIndex: -1,
      editedItem: {
        depId: '',
        depName: '',
        hotLine: '',
        roomNum: ''
      },
      defaultItem: {
        depId: '',
        depName: '',
        hotLine: '',
        roomNum: ''
      }
    }
  },

  computed: {
    ...mapGetters('departmentList', ['_getListOfDepartment']),
    ...mapState('departmentList', ['_listOfDepartment']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('departmentList', [
      '_getAllDepartment',
      '_addDepartment',
      '_updateDepartment',
      '_deleteDepartment'
    ]),
    initialize () {
      this.listDepartment = this._getListOfDepartment
    },

    editItem (item) {
      this.editedIndex = this.listDepartment.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.listDepartment.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.listDepartment.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.listDepartment[this.editedIndex], this.editedItem)
      } else {
        this.listDepartment.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
