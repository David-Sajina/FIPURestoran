<template>
  <v-app app>
    <v-app-bar app style="background-color: grey">
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">FIPU RESTORAN</router-link></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <div class="navv">
        <router-link to="/meni"> <a v-if="store.currentUser" href="" class="p">Narudžbe</a></router-link>
        
        <router-link to="/meni"> <a v-if="store.currentUser=='admin1@gmail.com'" href="" class="p">Osoblje</a></router-link>
        <router-link to="/meni"><a href="" class="p">Meni</a></router-link>


        <router-link to="/rezerviraj">
          <a v-if="store.currentUser=='admin1@gmail.com'" href="" class="p">Rezervacije</a></router-link
        >
        
        <router-link to="/rezerviraj">
          <a v-if="!store.currentUser" href="" class="p">Rezerviraj</a></router-link
        >


        <a class="pa" style="pointer-events: none; cursor: default">|</a>

        <router-link to="/login"
          ><a v-if="!store.currentUser" href="" class="p"
            >Prijava</a
          ></router-link
        >
        <a href="#" v-if="store.currentUser" @click.prevent="logout" class="p"
          >Odjava</a
        >
      </div>
    </v-app-bar>
    <!-- Add a navigation bar -->
    <v-navigation-drawer
      style="background-color: grey"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <a href="" class="pa">Meni</a><v-spacer></v-spacer>
        <a href="" class="pa">Naruči</a>
        <a href="" class="pa">Rezerviraj</a>
        <a href="" class="pa">Prijava</a>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { firebase } from "@/firebase";
import store from "@/store.js";
import router from "./router";

firebase.auth().onAuthStateChanged((user) => {
  const currentroute = router.currentRoute;
  if (user) {
    // User is signed in.
    console.log("*** User", user.email);
    store.currentUser = user.email;
    
  } else {
    // User is not signed in.
    console.log("*** No user");
    store.currentUser = null;
    if (currentroute.meta.needsUser ){
      router.push ({name: 'Login'});
    }
  }
});

export default {
  name: "App",
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
<style scoped src="@/assets/css/style.css"></style>
