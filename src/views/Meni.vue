<template>
  <div>
    
     <v-card color="basil">
      
  
      <v-tabs
        background-color="transparent"
        color="basil"
        grow
      >
      <v-tab>
          
         Jela
        </v-tab>
        <v-tab>
          
          Pića
        </v-tab>
        <v-tab-item>


          <div class="loadin" v-if="!load"><loadinga /></div>
    <div class="meni">
      <v-container class="my-5">
        <v-layout row wrap>
          <meni-card
            @onCommit="test"
            @ondelete="pozovi"
            v-for="n in cards"
            :key="n.id"
            :info="n"
          />

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
                                <croppa
                                  :width="400"
                                  :height="400"
                                  placeholder="Učitaj sliku..."
                                  v-model="imageReference"
                                ></croppa>
                              </div>

                              <div class="form-group">
                                <v-text-field
                                  v-model="newTitle"
                                  type="text"
                                  class="form-control ml-2"
                                  placeholder="Unesite ime jela"
                                  id="Title"
                                  color="red lighten-1"
                                />
                              </div>
                              <div class="form-group">
                                <v-text-field
                                  v-model="newPrice"
                                  type="number"
                                  class="form-control ml-2"
                                  placeholder="Unesite cijenu jela"
                                  id="Price"
                                  color="red lighten-1"
                                />
                              </div>
                              <v-btn
                                block
                                type="submit"
                                class="btn btn-primary ml-2"
                                @click="dialog.value = false"
                                dark
                                color="red lighten-1"
                              >
                                Objavi jelo
                              </v-btn>
                            </form>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="dialog.value = false"
                              value="Reload Page"
                              color="red lighten-1"
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



        </v-tab-item> <!-- Drinks -->
        <v-tab-item>
        <div class="loadin" v-if="!load"><loadinga /></div>
        <v-container class="my-5">
        <v-layout row wrap>
            <meni-card
            @onCommit="test"
            @ondelete="pozovi"
            v-for="n in cardsp"
            :key="n.id"
            :info="n"
          />



          
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
                          ><h1>Dodaj novo piće</h1></v-btn
                        >
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar dark color="red lighten-1"
                            >Dodaj novo piće</v-toolbar
                          >
                          <v-card-text>
                            <form
                              @submit.prevent="postNewImageDrinks"
                              class="form-inline mb-5"
                            >
                              <div class="form-group">
                                <croppa
                                  :width="400"
                                  :height="400"
                                  placeholder="Učitaj sliku..."
                                  v-model="imageReference"
                                ></croppa>
                              </div>

                              <div class="form-group">
                                <v-text-field
                                  v-model="newTitle"
                                  type="text"
                                  class="form-control ml-2"
                                  placeholder="Unesite ime pića"
                                  id="Title"
                                  color="red lighten-1"
                                />
                              </div>
                              <div class="form-group">
                                <v-text-field
                                  v-model="newPrice"
                                  type="number"
                                  class="form-control ml-2"
                                  placeholder="Unesite cijenu pića"
                                  id="Price"
                                  color="red lighten-1"
                                />
                              </div>
                              <v-btn
                                block
                                type="submit"
                                class="btn btn-primary ml-2"
                                @click="dialog.value = false"
                                dark
                                color="red lighten-1"
                              >
                                Objavi piće
                              </v-btn>
                            </form>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="dialog.value = false"
                              value="Reload Page"
                              color="red lighten-1"
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



        </v-tab-item>
        </v-tabs> 
      
    </v-card>
  </div>
</template>
<script>
import MeniCard from "@/components/MeniCard.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import store from "@/store.js";
import { storage } from "@/firebase";
import Loadinga from "../components/Loadinga.vue";

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
    Loadinga,
  },
  data() {
    return {
      tabovi:["Jelo","Piće"],
      load: true,
      newTitle: "",
      newImageUrl: "",
      newPrice: Number,
      cards: [],
      cardsp:[],
      Drink: true,
      drawer: false,
      store,
      imageReference: null,
    };
  },
  mounted() {
    this.getMeni();
    this.getDrinks();
  },
  methods: {
    pozovi(){
      this.getMeni();
      this.getDrinks();
    },
    test() {
      this.$emit("onCommit");
    },
    loadOn() {
      let a = this.load;
      this.load = !a;
    },
    getMeni() {
      this.loadOn();
      console.log("getMeni");
      db.collection("jelo")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const dok = doc.data();

            this.cards.push({
              id: doc.id,
              price: dok.Cijena,
              title: dok.desc,
              url: dok.url,
              Drinks: dok.Drinks
            });
          });
          this.loadOn();
        });
    },
    getDrinks(){
      this.loadOn();
      db.collection("pice")
        .get()
        .then((query) => {
          this.cardsp = [];
          query.forEach((doc) => {
            const dok = doc.data();

            this.cardsp.push({
              id: doc.id,
              price: dok.Cijena,
              title: dok.desc,
              url: dok.url,
              Drinks: dok.Drinks
            });
          });
          this.loadOn();
          console.log("getDrinks")
        });
    },
    postNewImageDrinks() {
      this.loadOn();
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);

        let imageName = "meni/" + "/" + Date.now() + ".png";
        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            result.ref
              .getDownloadURL()
              .then((url) => {
                const title = this.newTitle;
                const price = parseFloat(this.newPrice);
                const drinkk = this.Drink
                console.log("meni, drink", drinkk)
                db.collection("pice")
                  .add({
                    url: url,
                    desc: title,
                    Cijena: price,
                    Drinks: drinkk,
                    posted_at: Date.now(),
                  })
                  .then((doc) => {
                    console.log("Spremljeno", doc);
                    this.newTitle = "";
                    this.imageReference.remove();
                    this.newPrice = "";
                    this.getDrinks();
                    this.loadOn();
                  })
                  .catch((e) => {
                    console.error("greška");
                  });
              })
              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            alert("Greška");
          });
      });
    },
    postNewImage() {
      this.loadOn();
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);

        let imageName = "meni/" + "/" + Date.now() + ".png";
        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            result.ref
              .getDownloadURL()
              .then((url) => {
                const title = this.newTitle;
                const price = parseFloat(this.newPrice);
                const drinkk = false;
                db.collection("jelo")
                  .add({
                    url: url,
                    desc: title,
                    Cijena: price,
                    Drinks: drinkk,
                    posted_at: Date.now(),
                  })
                  .then((doc) => {
                    console.log("Spremljeno", doc);
                    this.newTitle = "";
                    this.imageReference.remove();
                    this.newPrice = "";
                    this.getMeni();
                    this.loadOn();
                  })
                  .catch((e) => {
                    console.error("greška");
                  });
              })
              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            alert("Greška");
          });
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
