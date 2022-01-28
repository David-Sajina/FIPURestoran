<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <v-card class="elevation-12">
              <v-toolbar dark color="red lighten-1">
                <v-toolbar-title>Rezerviraj</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-container>
                    <v-text-field
                      prepend-icon=""
                      name="Ime"
                      label="Ime i prezime"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon=""
                      name="Broj"
                      label="Broj mobitela"
                      type="Number"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon=""
                      name="Email"
                      label="Email"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon=""
                      name="Email"
                      label="Email"
                      type="text"
                    ></v-text-field>
                    <date-picker />
                    <v-select
                      :items="items"
                      label="Prigoda (Opcionalno)"
                    ></v-select>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red lighten-1" to="/">Rezerviraj</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import DatePicker from "@/components/DatePicker.vue";

export default {
  name: "Rezerviraj",
  components: {
    DatePicker,
  },

  data: () => ({
    items: ["Rođendan", "Godišnjica", "Proslava", "Poslovni obrok"],
  }),
};
</script>

<style></style>
