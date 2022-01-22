<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="red lighten-1">
                <v-toolbar-title>Prijava</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon=""
                    name="username"
                    label="Email"
                    type="email"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon=""
                    name="password"
                    label="Lozinka"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link to="/registracija"
                  ><v-btn text color="red lighten-1"
                    >Registriraj se
                  </v-btn></router-link
                >
                <v-btn @click="login" dark color="red lighten-1">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { firebase } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login..." + this.username);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("Uspješna prijava", result);

          this.$router.replace({ name: "meni" });
        })
        .catch(function (e) {
          console.error("Greška", e);
        });
    },
  },
};
</script>

<style></style>
