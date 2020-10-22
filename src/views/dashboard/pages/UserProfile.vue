<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="User Name" disabled />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Email Address" class="purple-input" />
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field label="Full Name" class="purple-input" />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Phone"
                    class="purple-input"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <v-btn color="success" rounded class="mr-0">
              Change avatar
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //
}
</script>
