<template>
  <div class="meni">
    <v-container class="my-5">
      <v-layout row wrap>
        <v-card class="text-xs-center ma-3" max-width="344">
          <v-img
            src="http://bhglas.dk/wp-content/uploads/2020/05/sarajevski-cevapi-PR.jpg"
            height="200px"
          ></v-img>

          <v-card-title> Ćevapi </v-card-title>

          <v-card-subtitle> 651 kca  </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red" text> Naruči </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="store.currentUser=='admin1@gmail.com'" dark color="red">Obriši</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-xs-center ma-3" max-width="344">
          <v-img
            src="https://bigseventravel.com/wp-content/uploads/2019/06/Screenshot-2019-06-29-at-13.12.09.png"
            height="200px"
          ></v-img>

          <v-card-title> Pizza </v-card-title>

          <v-card-subtitle> 1700 kcal </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red" text> Naruči </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="store.currentUser=='admin1@gmail.com'" dark color="red">Obriši</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-xs-center ma-3" max-width="344">
          <v-img
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            height="200px"
          ></v-img>

          <v-card-title> Hamburger </v-card-title>

          <v-card-subtitle> 560 kcal </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red" text> Naruči </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="store.currentUser=='admin1@gmail.com'" dark color="red">Obriši</v-btn>
          </v-card-actions>
        </v-card>
        <meni-card/>
      </v-layout>
    </v-container>
    
  </div>
</template>
<script>
import MeniCard from '@/components/MeniCard.vue'
import { firebase } from "@/firebase";
import store from "@/store.js";

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
  name: "Meni",
  components: {
    MeniCard,
  },
  data() {
    return {
      drawer: false,
      tab: null,
      store,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>
