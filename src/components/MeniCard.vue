<template>
  <div class="meni">
    <v-container class="my-5">
      <v-layout row wrap>
        <v-card class="text-xs-center ma-3" max-width="344">
          <v-img :src="info.url" height="200px"></v-img>

          <v-card-title> {{ info.title }} </v-card-title>

          <v-card-subtitle> {{ info.price }} </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red lighten-1" text> Naruči </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="store.currentUser == 'admin1@gmail.com'"
              dark
              color="red lighten-1"
              >Obriši</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
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
  props: ["info", "Title", "Price"],
  name: "MeniCard",
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
