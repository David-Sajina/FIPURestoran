<template>
	<div class="meni">
		<v-container class="my-5">
			<v-layout row wrap>
				<v-card class="text-xs-center ma-3" max-width="344">
					<v-img :src="info.url" height="200px"></v-img>

					<v-card-title> {{ info.title }} </v-card-title>

					<v-card-subtitle> {{ info.price }} kn </v-card-subtitle>

					<v-card-actions>
						<add-to-cart @onCommit="emmitt" :name="info.title" :price="info.price" :info-id="info.id"/>
						<v-spacer></v-spacer>
						<v-btn
							v-if="store.currentUser == 'admin1@gmail.com'"
							dark
							color="red lighten-1"
							@click="deleteMeni(info.id, info.url, info.Drinks, info)"
							>Obriši</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	
	import AddToCart from "@/components/AddToCart.vue";
	import { firebase, db, storage } from "@/firebase";
	import store from "@/store.js";


	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in.

			store.currentUser = user.email;
		} else {
			// User is not signed in.

			store.currentUser = null;
		}
	});
	export default {
		props: ["info", "Title", "Price"],
		name: "MeniCard",
		components: {
			AddToCart,
		},
		data() {
			return {
				drawer: false,
				tab: null,
				store,
				dialog:false,
			};
		},

		methods: {
			emmitt(){
				this.$emit('onCommit')
			},
			deleteMeni(docc, urlp, drink, info) {
        const self = this;
				if (confirm("Jeste li sigurni da želite izbrisati?")) {
					console.log(docc);
					console.log(urlp);
					console.log("drink", drink)
					console.log(info,"info")
					let ime="jelo"
					if(drink==true){ime="pice"}
					console.log("ime", ime)
					db.collection(ime)
						.doc(docc)
						.delete()
						.then(function () {
							console.log("obrisano collection");
							let Ref = storage.refFromURL(urlp);

							console.log("URL datoteke koju brisem u storage: " + Ref);

							// Delete the file using the delete() method
							Ref
								.delete()
								.then(function () {
									// File deleted successfully
									console.log("Slika obrisana");
                  self.$emit('ondelete');
								})
								.catch(function (error) {
									// Some Error occurred
								});
						})
						.catch((e) => {
							console.error(e);
						});
				} else {
					
				}
			},
			logout() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						this.$router.push({ name: "Login" });
					});
			},
		},
	};
</script>
