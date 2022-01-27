<template>
  <div>
    <v-layout row wrap style>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/><osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/><osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
    <osoblje-card/>
     <v-btn
        depressed
        color="primary"
        type=submit
        id="btndisclaimer"
      >
        Dodaj novog zaposlenika 
      </v-btn>


      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          
           <v-btn
        depressed
        v-bind="attrs"
        v-on="on"
        color="primary"
        type=submit
        id="btndisclaimer"
      >
        Dodaj novog zaposlenika 
      </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="Ime*"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  sm="6"
                  md="5"
                >
                  <v-text-field
                    label="Prezime*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="11">
                  <v-text-field
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="11">
                  <v-text-field
                    label="Lozinka*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                 <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    label="OIB*"
                    required
                  ></v-text-field>
                </v-col>
                   <v-col
                  cols="12"
                  sm="6"
                  md="5"
                >
                  <v-text-field
                    label="Broj mobitela*"
                    required
                  ></v-text-field>
                </v-col>
                   <v-col
                  cols="12"
                  md="11"
                >
                  <v-text-field
                    label="Mjesto stanovanja*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*polje je potrebno ispuniti</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    </v-layout>
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
  }, data: () => ({
    dialog: false,
  }),
};
</script>
<style>
.row {
    margin-right: -55px !important}
    #btndisclaimer {
  position: fixed;
  right: 0;
  bottom: 0;
  margin-bottom:10px;
  margin-right:10px;
}</style>
