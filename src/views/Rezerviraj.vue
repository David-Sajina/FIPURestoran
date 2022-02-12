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

                    <date-picker> v-model="newDatum" </date-picker>
                    <time-picker> v-model="newVrijeme" </time-picker>
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
import DatePicker from "@/components/DatePicker.vue";
import TimePicker from "@/components/TimePicker.vue";
import { db } from "@/firebase";

export default {
  name: "Rezerviraj",
  data() {
    return {
      newImePrezime: "",
      newBroj: "",
      newEmail: "",
      newDatum: "",
      newVrijeme: "",
    };
  },
  methods: {
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
          this.$router.replace({ name: "meni" });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  components: {
    DatePicker,
    TimePicker,
  },
};
</script>

<style></style>
