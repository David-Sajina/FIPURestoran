<template>
  <div>
    <v-layout row wrap>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/></v-layout>
    <!-- 
    <DodajOsoblje/> -->
  </div>
</template>
<script>
import DodajOsoblje from "@/components/DodajOsoblje.vue";
import OsobljeCard from '../components/OsobljeCard.vue';

export default {
  name: "Osoblje",
  components: {
    DodajOsoblje,
    OsobljeCard,
  },
};
</script>
<style></style>
