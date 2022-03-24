<template>
	<div>
		<div class="loadin" v-if="!load"><loadinga /></div>
		<v-tabs background-color="transparent" color="basil" grow>
			<v-tab> Narudzbe </v-tab>
			<v-tab> Arhivirano </v-tab>
			<v-tab-item>
				<v-layout row wrap style>
					<order-card
						@ref="getRef"
						v-for="n in cards"
						:key="n.id"
						:info="n"
					/>
				</v-layout>
			</v-tab-item>
			<v-tab-item>
				<v-layout row wrap style>
					<order-card
						@ref="getRef"
						v-for="n in cardsa"
						:key="n.id"
						:info="n"
					/>
				</v-layout>
			</v-tab-item>
		</v-tabs>
	</div>
</template>
<script>
	import OrderCard from "../components/OrderCard.vue";
	import { firebase } from "@/firebase";
	import { db } from "@/firebase";
	import store from "@/store.js";
	import Loadinga from "../components/Loadinga.vue";

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
		name: "Narudzbe",
		components: {
			OrderCard,
			Loadinga,
		},
		data() {
			return {
				dialog: false,
				store,
				load: true,
				cards: [],
				cardsa: [],
			};
		},
		mounted() {
			this.getOrder();
			this.getArh();
		},
		methods: {
			loadOn() {
				let a = this.load;
				this.load = !a;
			},
			getOrder() {
				this.loadOn();
				console.log("getorder");
				db.collection("narudzba")
					.orderBy("posted_at", "desc")
					.get()
					.then((query) => {
						this.cards = [];
						query.forEach((doc) => {
							const dok = doc.data();
							dok.id = doc.id;
							this.cards.push(dok);
						});

						console.log("final dok", this.cards);
					});
				this.loadOn();
			},
			getArh() {
				this.loadOn();
				console.log("getarh");
				db.collection("arhorder")
					.orderBy("posted_at", "desc")
					.get()
					.then((query) => {
						this.cardsa = [];
						query.forEach((doc) => {
							const dok = doc.data();
							dok.id = doc.id;
							this.cardsa.push(dok);
						});

						console.log("final dok", this.cardsa);
					});
				this.loadOn();
			},
			getRef(){
				this.getArh();
				this.getOrder();
			}
		},
	};
</script>

<style>
	.row {
		margin-right: -55px !important;
	}
</style>
