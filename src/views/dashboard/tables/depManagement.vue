<template>
  <v-data-table
    :headers="headers"
    :items="_listOfDepartment"
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
              New Department
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
                    v-model="editedItem.id"
                    label="Department ID"
                    :rules="deparmentIdRules"
                    clearable
                  >
                  </v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.departmentName"
                    label="Department Name"
                    :rules="departmentNameRules"
                    clearable
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.hotline"
                    label="Hot Line"
                    clearable
                    :rules="phoneNumberRules"
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.roomNumber"
                    label="Room Num"
                    clearable
                    :rules="roomNumberRules"
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
      <v-icon small class="mr-2" @click="editItem(item)" v-if="!item.isDeleted">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)" v-if="!item.isDeleted">
        mdi-delete
      </v-icon>
      <v-icon small @click="reviveItem(item)" v-if="item.isDeleted">
        mdi-clipboard-plus
      </v-icon>
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
          value: 'id'
        },
        { text: 'Department Name', value: 'departmentName' },
        { text: 'hotline', value: 'hotline' },
        { text: 'roomNumber', value: 'roomNumber' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      deparmentIdRules: [
        v => !!v || 'Department ID is required',
        v =>
          (v && v.length < 10) ||
          'Department id must be less than 10 characters'
      ],
      phoneNumberRules: [
        v =>
          (v && v.match(regex)) || 'Phone Number must be  format phone number'
      ],
      departmentNameRules: [
        v => !!v || 'Department name is required',
        v =>
          (v && v.length < 50) ||
          'Department name must be less than 50 characters'
      ],
      roomNumberRules: [
        v => !!v || 'Room num is required',
        v => (v && v.length < 6) || 'Room num must be less than 6 characters'
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        departmentName: '',
        hotline: '',
        roomNumber: ''
      },
      defaultItem: {
        id: '',
        departmentName: '',
        hotline: '',
        roomNumber: ''
      }
    }
  },

  computed: {
    ...mapGetters('departmentList', ['_getListOfDepartment']),
    ...mapState('departmentList', ['_listOfDepartment']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this._getAllDepartment()
  },
  methods: {
    ...mapActions('departmentList', [
      '_getAllDepartment',
      '_addDepartment',
      '_updateDepartment',
      '_deleteDepartment'
    ]),
    editItem (item) {
      this.editedIndex = this._listOfDepartment.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      // const index = this._listOfDepartment.indexOf(item)
      confirm('Are you sure you want to delete this department?') &&
        (await this._deleteDepartment(item))
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        await this._updateDepartment(this.editedItem)
      } else {
        await this._addDepartment(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
