<template>
  <v-app app >
    <v-app-bar app style="background-color:grey;">
       <v-app-bar-nav-icon @click="drawer = true" 
                           class="d-flex d-sm-none" 
                           ></v-app-bar-nav-icon>
        <v-toolbar-title> <router-link to="/">FIPU RESTORAN</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
  
       
	<div class="navv">
          <router-link to="/about"><a href="" class="p" 
            >Meni</a></router-link>
         <a href="" class="p" >Naruči</a>
           <router-link to="/rezerviraj"> <a href="" class="p" 
            >Rezerviraj</a></router-link><a class="pa">|</a>
            <router-link to="/login"><a href="" class="p" 
            >Prijava</a></router-link>
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
  <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      tab: null,
    }
  }
}
</script><style scoped src="@/assets/css/style.css">

</style> 
