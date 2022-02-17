<template>
  <div>
    <v-container style="margin-left: 20px" height="200px" class="my-4">
      <v-layout row wrap>
        <v-card class="text-xs-center ma-4" height="auto" width="auto">
          <v-card-text>
            <div>Rezervacija</div>
            <p class="text-h3 text--primary">{{ info.ime }}</p>
            <p class="text-h5 text--primary">{{ info.datum }}</p>
            <p class="text-h5 text--primary">{{ info.vrijeme }}</p>
            <div class="text--primary">BROJ MOBITELA: {{ info.broj }}</div>

            <div class="text--primary">EMAIL: {{ info.email }}</div>

            <v-btn color="red lighten-1" dark> Poništi </v-btn>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["info", "ime", "datum", "vrijeme", "broj", "email"],

  name: "RezCard",
};
</script>

<style></style>
