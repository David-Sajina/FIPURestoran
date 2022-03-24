<template>
	<div>
		<div class="loadin" v-if="!load"><loadinga /></div>
		<v-layout row wrap style>
			<order-card @ref="getOrder" v-for="n in cards" :key="n.id" :info="n" /><!-- 
			<meni-card @ondelete="getMeni" v-for="n in cards" :key="n.id" :info="n" /> -->
		</v-layout>
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
			};
		},
		mounted() {
			this.getOrder();
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
		},
	};
</script>

<style>
	.row {
		margin-right: -55px !important;
	}
</style>
