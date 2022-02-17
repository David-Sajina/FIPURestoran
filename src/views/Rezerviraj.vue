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
                <form
                  @submit.prevent="dodajRezervaciju"
                  class="form-inline mb-5"
                >
                  <v-container>
                    <v-text-field
                      v-model="newImePrezime"
                      prepend-icon=""
                      name="Ime"
                      label="Ime i prezime"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      v-model="newBroj"
                      prepend-icon=""
                      name="Broj"
                      label="Broj mobitela"
                      type="Number"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEmail"
                      prepend-icon=""
                      name="Email"
                      label="Email"
                      type="text"
                    ></v-text-field>

                    <div>
                      <div class="mb-2">
                        Odabrano: <code>{{ Odabrano || "null" }}</code>
                      </div>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            color="red lighten-1"
                            v-model="newDatum"
                            label="Odaberi datum rezervacije"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="red lighten-1"
                          v-model="newDatum"
                          :active-picker.sync="Odabrano"
                          max="2024 - 01 - 01"
                          min="2022-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                    <v-row>
                      <v-col cols="11" sm="5">
                        <v-menu
                          ref="menu"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="newVrijeme"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="newVrijeme"
                              label="Odaberi vrijeme rezervacije"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              color="red lighten-1"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            format="24hr"
                            color="red lighten-1"
                            v-if="menu2"
                            v-model="newVrijeme"
                            full-width
                            @click:minute="$refs.menu.save(newVrijeme)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-container>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  @click="dodajRezervaciju()"
                  dark
                  color="red lighten-1"
                  >Rezerviraj
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { db } from "@/firebase";

export default {
  name: "Rezerviraj",
  data() {
    return {
      Odabrano: null,
      menu: false,
      menu2: false,
      newImePrezime: "",
      newBroj: "",
      newEmail: "",
      newDatum: "",
      newVrijeme: "",
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.Odabrano = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    dodajRezervaciju() {
      const ImePrezime = this.newImePrezime;
      const Broj = this.newBroj;
      const Email = this.newEmail;
      const Datum = this.newDatum;
      const Vrijeme = this.newVrijeme;

      db.collection("rezervacije")
        .add({
          ime: ImePrezime,
          broj: Broj,
          email: Email,
          datum: Datum,
          vrijeme: Vrijeme,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          alert("Rezervacija uspješna!");
          this.$router.replace({ name: "meni" });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style></style>
