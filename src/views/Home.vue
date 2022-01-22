<template>
  <v-parallax img src="@/assets/back.png" height="700">
    <v-layout
      column
      align-center
      justify-center
      class="white--text spacing-playground pa-60"
    >
      <h1
        class="white--text mb-20 display-1 text-xs-center"
        style="font-weight: 900; text-shadow: 3px 2px #000000"
      >
        DOBRODOŠLI U FIPU RESTORAN
      </h1>
      <div
        class="white--text subheading mb-3 text-xs-center"
        style="font-weight: 900; text-shadow: 2px 2px #000000"
      >
        ...nešto se dobro kuha!
      </div>
      <v-btn href="/meni" x-large dark color="red lighten-1 mt-7 ">
        Naručite
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: "Home",
};
</script>
