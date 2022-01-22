<template>
  <div class="meni">
    <v-container class="my-5">
      <v-layout row wrap>
        <meni-card v-for="n in cards" :key="n" :info="n" />
        <!-- Card za dodat -->

        <div class="meni" v-if="store.currentUser">
          <v-container class="my-5">
            <v-layout row wrap>
              <v-card class="text-xs-center ma-3" max-width="344">
                <v-col cols="auto">
                  <v-dialog>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        color="red lighten-1"
                        height="315px"
                        width="324px"
                        v-bind="attrs"
                        v-on="on"
                        ><h1>Dodaj novo jelo</h1></v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar dark color="red lighten-1"
                          >DODAJ NOVO JELO</v-toolbar
                        >
                        <v-card-text>
                          <form
                            @submit.prevent="postNewImage"
                            class="form-inline mb-5"
                          >
                            <div class="form-group">
                              <label for="imageUrl">Image URL</label>
                              <input
                                v-model="newImageUrl"
                                type="text"
                                class="form-control ml-2"
                                placeholder="Unesite URL slike"
                                id="imageUrl"
                              />
                            </div>
                            <div class="form-group">
                              <label for="Title">Naslov</label>
                              <input
                                v-model="newTitle"
                                type="text"
                                class="form-control ml-2"
                                placeholder="Unesite ime jela"
                                id="Title"
                              />
                            </div>
                            <div class="form-group">
                              <label for="Price">Cijena</label>
                              <input
                                v-model="newPrice"
                                type="text"
                                class="form-control ml-2"
                                placeholder="Unesite cijenu jela"
                                id="Price"
                              />
                            </div>
                            <button
                              type="submit"
                              class="btn btn-primary ml-2"
                              @click="obavijest()"
                            >
                              Post image
                            </button>
                          </form>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn
                            text
                            @click="dialog.value = false"
                            value="Reload Page"
                            onClick="document.location.reload(true)"
                            >Zatvori</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-layout>
          </v-container>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MeniCard from "@/components/MeniCard.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import store from "@/store.js";

/* 	let cards = [
		"https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png",
		"https://bigseventravel.com/wp-content/uploads/2019/06/Screenshot-2019-06-29-at-13.12.09.png",
		"http://bhglas.dk/wp-content/uploads/2020/05/sarajevski-cevapi-PR.jpg",
	];
 */
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
      newTitle: "",
      newImageUrl: "",
      newPrice: "",
      cards: [],
      drawer: false,
      store,
    };
  },
  mounted() {
    this.getMeni();
  },
  methods: {
    getMeni() {
      db.collection("jelo")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const dok = doc.data();

            this.cards.push({
              id: doc.id,
              price: dok.Cijena,
              title: dok.desc,
              url: dok.url,
            });
          });
        });
    },
    postNewImage() {
      const imageUrl = this.newImageUrl;
      const title = this.newTitle;
      const price = this.newPrice;

      db.collection("jelo")
        .add({
          url: imageUrl,
          desc: title,
          Cijena: price,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newTitle = "";
          this.newImageUrl = "";
          this.newPrice = "";
        })
        .catch((e) => {
          console.error("greška");
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
    obavijest() {
      alert("Dodali ste jelo u meni!");
    },
  },
};
</script>
