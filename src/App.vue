<template
>
  <v-app>
    <div id="app">
      <v-app id="inspire">
        <v-card class="overflow-hidden">
          <v-app-bar
            absolute
            color="#b00e29"
            dark
            shrink-on-scroll
            prominent
            key=""
            src="https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/1:1/w_1519,h_1519,c_limit/Cooking-Home-Collection.jpg"
            fade-img-on-scroll
            scroll-target="#scrolling-techniques-5"
            scroll-threshold="500"
          >
            <template v-slot:img="{ props }">
              <v-img
                v-bind="props"
                gradient="to top right, rgba(255,0,0,.5), rgba(25,32,72,.7)"
              >
              </v-img>
            </template>
            <v-spacer></v-spacer>
            <v-btn> Meni </v-btn>
            <v-btn> Naruči </v-btn>
            <v-btn> Rezerviraj </v-btn>
            <v-btn> Prijava </v-btn>
         <!--    <v-btn icon> <v-icon>mdi-heart</v-icon> </v-btn>
            <v-btn icon> <v-icon>mdi-dots-vertical</v-icon> </v-btn> -->
          </v-app-bar>
          <v-sheet
            id="scrolling-techniques-5"
            class="overflow-y-auto"
            max-height="600"
          >
            <v-container style="height: 1500px"></v-container>
          </v-sheet>
        </v-card>
      </v-app>
    </div>
    <v-main> <router-view /> </v-main>
  </v-app>
</template>
    
