<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
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
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(function () {
          console.log("Uspješna registracija");
        })
        .catch(function (error) {
          console.error("Došlo je do greške", error);
        });
      console.log("Nastavak");
    },
  },
};
</script>

<style></style>
