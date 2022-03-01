<template>
  <div>
    <div class="loadin" v-if="!load"><loadinga /></div>
    <v-layout row wrap style>
      <osoblje-card
        @ondeleteu="getOsoblje"
        v-for="n in cards"
        :key="n.id"
        :info="n"
      /><!-- 
			<meni-card @ondelete="getMeni" v-for="n in cards" :key="n.id" :info="n" /> -->
      <v-btn depressed color="primary" type="submit" id="btndisclaimer">
        Dodaj novog zaposlenika
      </v-btn>

      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              v-bind="attrs"
              v-on="on"
              dark
              color="red lighten-1"
              type="submit"
              id="btndisclaimer"
            >
              Dodaj novog zaposlenika
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <form @submit.prevent="dodajZaposlenika" class="form-inline mb-5">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ime*"
                        required
                        v-model="newIme"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        label="Prezime*"
                        required
                        v-model="newPrezime"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="11">
                      <v-text-field
                        label="Email*"
                        required
                        v-model="newEmail"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="11">
                      <v-text-field
                        label="Lozinka*"
                        type="password"
                        required
                        v-model="newPassword"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="OIB*"
                        required
                        v-model="newOIB"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        label="Broj mobitela*"
                        required
                        v-model="newBroj"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Mjesto stanovanja*"
                        required
                        v-model="newMjesto"
                        color="red lighten-1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-select
                        :items="[
                          'Kuhar/ica',
                          'Pom. kuhar/ica',
                          'Konobar/ica',
                          'Voditelj/ica',
                        ]"
                        label="Pozicija*"
                        required
                        v-model="newRole"
                        color="red lighten-1"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*polje je potrebno ispuniti</small>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-btn color="red lighten-1" text @click="dialog = false">
                Zatvori
              </v-btn>
              <v-btn
                type="submit"
                color="red lighten-1"
                text
                @click="dialog = false"
              >
                Potvrdi
              </v-btn>
            </form>
          </v-card>
        </v-dialog>
      </v-row>
    </v-layout>
  </div>
</template>
<script>
import DodajOsoblje from "@/components/DodajOsoblje.vue";
import OsobljeCard from "../components/OsobljeCard.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import store from "@/store.js";
import Loadinga from "../components/Loadinga.vue";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.

    store.currentUser = user.email;
  } else {
    // User is not signed in.

    store.currentUser = null;
  }
});
export default {
  name: "Osoblje",
  components: {
    DodajOsoblje,
    OsobljeCard,
    Loadinga,
  },
  data() {
    return {
      dialog: false,
      store,
      load: true,
      cards: [],
      newIme: "",
      newPrezime: "",
      newEmail: "",
      newPassword: "",
      newOIB: "",
      newBroj: "",
      newMjesto: "",
      newRole: "",
    };
  },
  mounted() {
    this.getOsoblje();
  },
  methods: {
    loadOn() {
      let a = this.load;
      this.load = !a;
    },
    getOsoblje() {
      this.loadOn();
      console.log("getosoblje");
      db.collection("zaposlenik")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const dok = doc.data();

            this.cards.push({
              id: doc.id,
              ime: dok.ime,
              prezime: dok.prezime,
              email: dok.email,
              password: dok.password,
              oib: dok.oib,
              broj: dok.broj,
              mjesto_stan: dok.mjesto_stan,
              pozicija: dok.pozicija,
            });
          });
        });
      this.loadOn();
    },

    dodajZaposlenika() {
      this.loadOn();
      const ime = this.newIme;
      const prezime = this.newPrezime;
      const email = this.newEmail;
      const password = this.newPassword;
      const oib = this.newOIB;
      const broj = this.newBroj;
      const mjesto = this.newMjesto;
      const pozicija = this.newRole;

      var config = {
        apiKey: "AIzaSyDg-uDj1CICi0MEb5qSI8AkT_Bc0Leq-fA",
        authDomain: "fipurestoran.firebaseapp.com",
        projectId: "fipurestoran",
      };
      const secondaryApp = firebase.initializeApp(config, "Secondary");
      secondaryApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          secondaryApp.auth().signOut();
        })
        .catch(function (error) {
          console.error("Došlo je do greške", error);
        }),
        db
          .collection("zaposlenik")
          .add({
            ime: ime,
            prezime: prezime,
            email: email,
            password: password,
            oib: oib,
            broj: broj,
            mjesto_stan: mjesto,
            pozicija: pozicija,
            posted_at: Date.now(),
          })
          .then((doc) => {
            console.log("Spremljeno", doc);

            this.newIme = "";
            this.newPrezime = "";
            this.newEmail = "";
            this.newPassword = "";
            this.newOIB = "";
            this.newBroj = "";
            this.newMjesto = "";
            this.newRole = "";
          })
          .catch((e) => {
            console.error("greška");
          });
      this.getOsoblje();
      this.loadOn();
    },
  },
};
</script>

<style>
.row {
  margin-right: -55px !important;
}
#btndisclaimer {
  position: fixed;
  right: 0;
  bottom: 0;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
