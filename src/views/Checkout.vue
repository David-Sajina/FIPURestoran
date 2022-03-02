<template>
	<div>
		<!-- <div>
<Stavka
            v-for="item in te" :key="item.id" :item="item" 
          />
</div> -->
		<div id="app" style="max-width: 1000px; margin: auto; padding: 10px">
			<v-app id="inspire">
				<v-card>
					<v-simple-table>
						<thead>
							<tr>
								<th class="text-left">Jelo</th>
								<th class="text-left">Cijena</th>
								<th class="text-left">Količina</th>
								<th class="text-left">Ukloni</th>
							</tr>
						</thead>
						<tbody>
							<Stavka v-for="item in te" :key="item.id" :item="item" />
						</tbody>
					</v-simple-table>
					<hr style="margin-top: 10px; height: 3.5px; background: black" />
					
					       
        
        <v-select v-model="test.stol"
            :items="items"
            label="Odaberite stol"
			style="width:30%;margin-left:30px;margin-top:20px;"
          ></v-select>
			<div class="my-2">
				
              <v-btn v-if="test.stol!=''"
			  @click="orderCommit()"
                m-large
                color="success"
                dark
				style="float:right;	margin-right:50px;margin-top:10px;margin-bottom:10px;"
              >
                Potvrdi narudžbu
              </v-btn>
			  <v-card style="float:right;	margin-right:50px;margin-top:20px;margin-bottom:15px;"><h3>Ukupno: {{ test.tf }} kn</h3></v-card> 
            </div>
				</v-card></v-app
			>
		</div>
	</div>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store.js";
	import Stavka from "@/components/Stavka.vue";
	export default {
		name: "Checkout",

		components: {
			Stavka,
		},
		data() {
			
			return {
				 items: ['Stol 1', 'Stol 2', 'Stol 3', 'Stol 4', 'Stol 5'],
				test: { tf: 0, stol: "" },
				te: this.$store.state.cart,
				store,
			};
		},
		mounted() {
			this.getTotal();
		},
		methods: {
			getTotal() {
				console.log("cart", this.te);
				console.log(this.test);
				for (let index = 0; index < this.te.length; index++) {
					this.test.tf =
						this.test.tf + this.te[index].kolicina * this.te[index].infoPrice;
				}
			},
			removeFromCart() {
				console.log(this.te.kolicina);
				this.$store.commit("removeFromCart", this.te);
				console.log(this.te);
				this.test.tf = 0;
				this.getTotal();
			},
			orderCommit(){
				console.log("orderCommit", this.te, this.test.stol, this.test.tf)
				db.collection("narudzba")
                  .add({
                    stavke: this.te,
                    stol: this.test.stol,
                    ukupno: this.test.tf,
                    posted_at: Date.now(),
                  })
                  .then((doc) => {
                    console.log("Spremljeno", doc);
                  })
			}

			
		},
		/* addOrder(te){
			for (let index = 0; index < this.te.length; index++) {
				OrderCommit(te.infoName)
				}
		} */ 
	};
</script>
