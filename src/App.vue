<template>
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
            <!--  <a href=""><img src="@/assets/fipures.png"  style="height:50px;" alt=""></a>
   -->
  
						<v-spacer></v-spacer>
						<a href="" class="p" style="scroll-target=#scrolling-techniques-5"
							>Meni</a>
            
            <a href="" class="p" style="scroll-target=#scrolling-techniques-5">Naruči</a>
            <a href="" class="p" style="scroll-target=#scrolling-techniques-5"
            >Rezerviraj</a><a class="pa">|</a>
            <a href="" class="p" style="scroll-target=#scrolling-techniques-5"
            >Prijava</a>
          
			<!-- 			<v-btn> Naruči </v-btn>
						<v-btn> Rezerviraj </v-btn>
						<v-btn> Prijava </v-btn>
						   <v-btn icon> <v-icon>mdi-heart</v-icon> </v-btn>
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

<style scoped src="@/assets/css/style.css">
</style>