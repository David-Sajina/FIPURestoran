<template>
  <div class="meni">
    <v-container class="my-5">
      <v-layout row wrap>
        <v-card class="text-xs-center ma-3" max-width="344">
          <v-img :src="info.url" height="200px"></v-img>

          <v-card-title> {{ info.title }} </v-card-title>

          <v-card-subtitle> {{ info.price }} </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red lighten-1" v-if="!store.currentUser" text>
              Naruči
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="store.currentUser == 'admin1@gmail.com'"
              dark
              color="red lighten-1"
              @click="deleteMeni(info.id, info.url)"
              >Obriši</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { firebase, db, storage } from "@/firebase";
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
    deleteMeni(docc, urlp) {
      const self = this;
      if (confirm("Jeste li sigurni da želite izbrisati jelo?")) {
        console.log(docc);
        console.log(urlp);
        db.collection("jelo")
          .doc(docc)
          .delete()
          .then(function () {
            console.log("obrisano collection");
            let Ref = storage.refFromURL(urlp);

            console.log("URL datoteke koju brisem u storage: " + Ref);

            // Delete the file using the delete() method
            Ref.delete()
              .then(function () {
                // File deleted successfully
                console.log("Slika obrisana");
                self.$emit("ondelete");
              })
              .catch(function (error) {
                // Some Error occurred
              });
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
      }
    },
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
