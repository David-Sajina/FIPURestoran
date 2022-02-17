<template>
  <div>
    <v-layout row wrap style>
      <RezCard class="rez" v-for="n in cards" :key="n.id" :info="n" />
    </v-layout>
  </div>
</template>

<script>
import RezCard from "@/components/RezCard.vue";
import { db } from "@/firebase";
import store from "@/store.js";

export default {
  name: "Rezervacije",
  components: {
    RezCard,
  },
  data() {
    return {
      cards: [],
      store,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      db.collection("rezervacije")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.cards.push({
              id: doc.id,
              ime: data.ime,
              broj: data.broj,
              email: data.email,
              datum: data.datum,
              vrijeme: data.vrijeme,
            });
          });
        });
    },
  },
};
</script>
