<template>
<div>
    <div class="loadin" v-if="!load"><loadinga/></div>
	<div class="meni">
		<v-container class="my-5">
			<v-layout row wrap>
				<meni-card @ondelete="getMeni" v-for="n in cards" :key="n.id" :info="n" />
				<!-- Card za dodat -->

				<div class="meni" v-if="store.currentUser">
					<v-container class="my-5">
						<v-layout row wrap>
							<v-card class="text-xs-center ma-3" max-width="344">
								<v-col cols="auto">
									<v-dialog>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												dark
												color="red lighten-1"
												height="315px"
												width="324px"
												v-bind="attrs"
												v-on="on"
												><h1>Dodaj novo jelo</h1></v-btn
											>
										</template>
										<template v-slot:default="dialog">
											<v-card>
												<v-toolbar dark color="red lighten-1"
													>DODAJ NOVO JELO</v-toolbar
												>
												<v-card-text>
													<form
														@submit.prevent="postNewImage"
														class="form-inline mb-5"
													>
														<div class="form-group">
														
															<croppa
																:width="400"
																:height="400"
																placeholder="Učitaj sliku..."
																v-model="imageReference"
															></croppa>
														</div>
                            
														<div class="form-group">
															<v-text-field
																v-model="newTitle"
																type="text"
																class="form-control ml-2"
																placeholder="Unesite ime jela"
																id="Title"
															/>
														</div>
														<div class="form-group">
															<v-text-field
																v-model="newPrice"
																type="number"
																class="form-control ml-2"
																placeholder="Unesite cijenu jela"
																id="Price"
															/>
														</div>
														<v-btn block
															type="submit"
															class="btn btn-primary ml-2"
															@click="dialog.value = false"
														>
															Objavi jelo
														</v-btn>
													</form>
												</v-card-text>
												<v-card-actions class="justify-end">
													<v-btn
														text
														@click="dialog.value = false"
														value="Reload Page"
														>Zatvori</v-btn
													>
												</v-card-actions>
											</v-card>
										</template>
									</v-dialog>
								</v-col>
							</v-card>
						</v-layout>
					</v-container>
				</div>
			</v-layout>
		</v-container>
	</div></div>
</template>
<script>
	import MeniCard from "@/components/MeniCard.vue";
	import { firebase } from "@/firebase";
	import { db } from "@/firebase";
	import store from "@/store.js";
	import { storage } from "@/firebase";
import Loadinga from '../components/Loadinga.vue';

	/* 	let cards = [
		"https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png",
		"https://bigseventravel.com/wp-content/uploads/2019/06/Screenshot-2019-06-29-at-13.12.09.png",
		"http://bhglas.dk/wp-content/uploads/2020/05/sarajevski-cevapi-PR.jpg",
	];
 */
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
		name: "Meni",
		components: {
			MeniCard,
      Loadinga
		},
		data() {
			return {
        load:true,
				newTitle: "",
				newImageUrl: "",
				newPrice: Number,
				cards: [],
				drawer: false,
				store,
				imageReference: null,
			};
		},
		mounted() {
			this.getMeni();
		},
		methods: {
      loadOn(){
        let a=this.load;
      this.load=!a;},
			getMeni() {
        this.loadOn();
        console.log("getMeni")
				db.collection("jelo")
					.get()
					.then((query) => {
						this.cards = [];
						query.forEach((doc) => {
							const dok = doc.data();

							this.cards.push({
								id: doc.id,
								price: dok.Cijena,
								title: dok.desc,
								url: dok.url,
							});
						});
            this.loadOn();
					});
        
			},
			postNewImage() {
				console.log(this.newPrice + 1000)
				console.log(parseFloat(this.newPrice)+ 1000)
        this.loadOn();
				this.imageReference.generateBlob((blobData) => {
					console.log(blobData);

					let imageName = "meni/" + "/" + Date.now() + ".png";
					storage
						.ref(imageName)
						.put(blobData)
						.then((result) => {
							result.ref.getDownloadURL().then((url) => {
								const title = this.newTitle;
								const price  = parseFloat(this.newPrice)
								db.collection("jelo")
									.add({
										url: url,
										desc: title,
										Cijena: price,
										posted_at: Date.now(),
									})
									.then((doc) => {
										console.log("Spremljeno", doc);
										this.newTitle = "";
										this.imageReference.remove();
										this.newPrice = "";
										this.getMeni();
                    this.loadOn();
									})
									.catch((e) => {
										console.error("greška");
									});
							}).catch((e)=>{console.error(e)});
						})
						.catch((e) => {
							alert("Greška");
						});
				});
			},
			logout() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						this.$router.push({ name: "Login" });
					});
			},
			obavijest() {
				alert("Dodali ste jelo u meni!");
			},
		},
	};
</script>
