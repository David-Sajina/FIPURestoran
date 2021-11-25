<template>
  <v-app app >
    <v-app-bar app style="background-color:grey;">
       <v-app-bar-nav-icon @click="drawer = true" 
                           class="d-flex d-sm-none" 
                           ></v-app-bar-nav-icon>
        <v-toolbar-title>FIPU RESTORAN</v-toolbar-title>
        <v-spacer></v-spacer>
  
       
	<div class="navv">
        <a href="" class="p" 
            >Meni</a>
         <a href="" class="p" >Naruči</a>
            <a href="" class="p" 
            >Rezerviraj</a><a class="pa">|</a>
            <a href="" class="p" 
            >Prijava</a>
        </div>
    </v-app-bar>
    <!-- Add a navigation bar -->
    <v-navigation-drawer style="background-color:grey;"
      v-model="drawer"
      absolute
      temporary
    >
       <v-list
        nav
        dense>
		<a href="" class="pa">Meni</a><v-spacer></v-spacer>
      <a href="" class="pa" >Naruči</a>
            <a href="" class="pa" 
            >Rezerviraj</a>
            <a href="" class="pa" 
            >Prijava</a>


      </v-list>
    </v-navigation-drawer>
    <!-- Navigation bar ends -->
    <v-content class="ma-5">
       <v-tabs-items v-model="tab" class="d-flex flex-column align-center">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          You are on {{ item }}
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>
<script>
export default {
  el: '#app',
  data () {
    return {
      drawer: false,
      tab: null,
      items: [
        'Meni', 'naruči', 'rezerviraj', 'prijava', 
      ],
    }
  }
}
</script><style scoped src="@/assets/css/style.css">

</style> 
