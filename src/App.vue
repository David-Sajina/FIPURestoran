<template>
	<v-app app>
		<v-app-bar app style="background-color: red" color="red lighten-1">
			<div class="dra">
				<v-app-bar-nav-icon
					@click="drawer = true"
					class="d-flex"
				></v-app-bar-nav-icon>
			</div>
			<v-toolbar-title>
				<router-link to="/"><img src="@/assets/fipuresT.png" height="50px" /></router-link
			></v-toolbar-title>
			<v-spacer></v-spacer> 

			<div class="navv">
				<router-link to="/narudzbe">
					<a v-if="store.currentUser" href="" class="p"
						>Narudžbe</a
					></router-link
				>

				<router-link to="/osoblje">
					<a v-if="store.currentUser == 'admin1@gmail.com'" href="" class="p"
						>Osoblje</a
					></router-link
				>
				<router-link to="/meni"><a href="" class="p">Meni</a></router-link>

				<router-link to="/rezervacije">
					<a v-if="store.currentUser == 'admin1@gmail.com'" href="" class="p"
						>Rezervacije</a
					></router-link
				>

				<router-link to="/rezerviraj">
					<a v-if="!store.currentUser" href="" class="p"
						>Rezerviraj</a
					></router-link
				>

				<a class="pa" style="pointer-events: none; cursor: default">|</a>

				<router-link to="/login"
					><a v-if="!store.currentUser" href="" class="p"
						>Prijava</a
					></router-link
				>
				<a href="#" v-if="store.currentUser" @click.prevent="logout" class="p"
					>Odjava</a
				>
			</div>
			<v-dialog v-model="dialog" width="500">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						id="btnnn"
						color="red lighten-2"
						dark
						v-bind="attrs"
						v-on="on"
						@click="getTotal"
					>
						Kart
					</v-btn>
				</template>

				<v-card>
					<v-card-title class="text-h5 grey lighten-2"> Kart </v-card-title>

					<v-card-text>
						<v-list-item v-for="item in this.$store.state.cart" :key="item.id">
							<v-list-item-content>
								<v-list-item-title
									>{{ item.infoName }} {{ item.infoPrice }} kn, količina
									{{ item.kolicina
									}}
                  <v-btn
                    @click="removeFromCart(item)"
										class="ma-2"
										text
										icon
										relative
										right
										color="red lighten-2"
									>
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-card-text>
					<v-list-item-title style="margin-left: 15px"
						>Total: {{ test.tf }} kn
					</v-list-item-title>
					<v-divider></v-divider>

					<v-card-actions>
						<router-link to="/checkout"><v-btn color="green" text @click="dialog = false">CHECKOUT</v-btn></router-link>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="dialog = false">
							Nastavi naručivati
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-app-bar>
		<!-- Add a navigation bar -->

		<v-navigation-drawer
			style="background-color: red"
			color="red lighten-1"
			v-model="drawer"
			absolute
			temporary
		>
			<v-list nav dense>
				<router-link to="/narudzbe"
					><a v-if="store.currentUser" href="" class="pa"
						>Narudžbe</a
					></router-link
				><v-spacer></v-spacer>
				<router-link to="/osoblje"
					><a v-if="store.currentUser == 'admin1@gmail.com'" href="" class="pa"
						>Osoblje</a
					></router-link
				><v-spacer></v-spacer>
				<router-link to="/meni"><a href="" class="pa">Meni</a></router-link
				><v-spacer></v-spacer>
				<router-link to="/naruci"
					><a v-if="!store.currentUser" href="" class="pa"
						>Naruči</a
					></router-link
				><v-spacer></v-spacer>
				<router-link to="/rezervacije"
					><a v-if="store.currentUser" href="" class="pa"
						>Rezervacije</a
					></router-link
				><v-spacer></v-spacer>
				<router-link to="/rezerviraj">
					<a v-if="!store.currentUser" href="" class="pa"
						>Rezerviraj</a
					></router-link
				><v-spacer></v-spacer>
				<router-link to="/login"
					><a v-if="!store.currentUser" href="" class="pa"
						>Prijava</a
					></router-link
				><v-spacer></v-spacer>
				<a href="#" v-if="store.currentUser" @click.prevent="logout" class="pa"
					>Odjava</a
				>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<router-view @onCommit="getTest" />
		</v-main>
	</v-app>
</template>

<script>
	import { firebase } from "@/firebase";
	import store from "@/store.js";
	import router from "./router";

	firebase.auth().onAuthStateChanged((user) => {
		const currentroute = router.currentRoute;
		if (user) {
			// User is signed in.
			console.log("*** User", user.email);
			store.currentUser = user.email;
			if (currentroute.meta.needsUser == false) {
				router.push({ name: "Home" });
			}
		} else {
			// User is not signed in.
			console.log("*** No user");
			store.currentUser = null;
			if (currentroute.meta.needsUser) {
				router.push({ name: "Login" });
			}
		}
	});

	export default {
		name: "App",
    
		components: {},
		data() {
     
			return {
				test: { tf: 0 },
				drawer: false,
				tab: null,
				dialog: false,
				store,
        
			};
		},
		methods: {
			getTotal() {
				this.test.tf = 0;
				for (let index = 0; index < this.$store.state.cart.length; index++) {
					this.test.tf =
						this.test.tf +
						this.$store.state.cart[index].kolicina *
							this.$store.state.cart[index].infoPrice;
				}
				console.log(this.test.tf);
			},
			getTest() {
				document.getElementById("btnnn").click();
			},
      removeFromCart(p){
		  console.log(p)
      },
			logout() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						this.$router.push({ name: "Home" });
					});
			},
		},
	};
</script>
<style scoped src="@/assets/css/style.css"></style>
