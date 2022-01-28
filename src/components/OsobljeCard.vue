<template>
	<div>
		<v-container style="margin-left: 20px" height="200px" class="my-4">
			<v-layout row wrap>
				<v-card class="text-xs-center ma-4" height="260" width="260">
					<v-card-text>
						<p class="text-h4 text--primary" style="text-align: center">
							{{ info.ime }} {{ info.prezime }}
						</p>
						<p></p>

						<div class="text--primary" style="text-align:center;!important">
							{{ info.pozicija }}<br />
						</div>
					</v-card-text>
					<v-card-actions>
						<v-btn
							text
							color="teal accent-4"
							style="margin-top: 90px"
							@click="reveal = true"
						>
							Prikaži više
						</v-btn>
					</v-card-actions>

					<v-expand-transition>
						<v-card
							v-if="reveal"
							class="transition-fast-in-fast-out v-card--reveal"
							style="height: 100%"
						>
							<v-card-text class="pb-0">
								<p class="text-h5 text--primary">Dodatne informacije</p>
								<p>OIB: {{ info.oib }}</p>
								<p>Broj mobitela: {{ info.broj }}</p>
								<p>Mjesto stanovanja: {{ info.mjesto_stan }}</p>
								<p>Email: {{ info.email }}</p>
							</v-card-text>
							<v-card-actions class="pt-0">
								<v-btn text color="teal accent-4" @click="reveal = false">
									Zatvori </v-btn
								><v-spacer></v-spacer>
								<v-btn @click="deleteZaposlenik(info)" text color="red">
									Obriši
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-expand-transition>
				</v-card>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { firebase, db, storage } from "@/firebase";
	import store from "@/store.js";
	export default {
		props: ["info", "ime", "prezime", "pozicija", "oib", "broj", "mjesto"],
		name: "OsobljeCard",
		data: () => {
			return {
				reveal: false,
			};
		},
		methods: {
			async deleteZaposlenik(user) {
				const self = this;
				if (confirm("Jeste li sigurni da želite izbrisati zaposlenika?")) {
					var config = {
						apiKey: "AIzaSyDg-uDj1CICi0MEb5qSI8AkT_Bc0Leq-fA",
						authDomain: "fipurestoran.firebaseapp.com",
						projectId: "fipurestoran",
					};
					const secondaryApp = firebase.initializeApp(config, "Secondary");

					if (!user.email || !user.password) {
						return console.warn(
							"Missing email or password to delete the user."
						);
					}

					await secondaryApp
						.auth()
						.signInWithEmailAndPassword(user.email, user.password)
						.then(() => {
							const userInFirebaseAuth = secondaryApp.auth().currentUser;
							userInFirebaseAuth.delete(); // Delete the user in Firebase auth list (has to be logged in).
							secondaryApp.auth().signOut();
							secondaryApp.delete();

							// Then you can delete the user from the users collection if you have one.
						});

					db.collection("zaposlenik")
						.doc(user.id)
						.delete()
						.then(function () {
							console.log("obrisano collection");

							self.$emit("ondeleteu");
						})
						.catch(function (error) {
							// Some Error occurred
						});
				} else {
				}

				// Need to create a second app to delete another user in Firebase auth list than the logged in one.
				// https://stackoverflow.com/a/38013551/2012407
			},
		},
	};
</script>
<style>
	.v-card--reveal {
		bottom: 0;
		opacity: 1 !important;
		position: absolute;
		width: 100%;
	}
</style>
