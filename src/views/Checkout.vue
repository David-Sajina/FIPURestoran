<template >
	<div><div v-if="this.test.tf == 0"><h2 style="margin-left:20px;">Nemate ništa u košarici</h2></div>
		<!-- <div>
<Stavka
            v-for="item in te" :key="item.id" :item="item" 
          />
</div> -->
		<div v-if="this.test.tf != 0" id="app" style="max-width: 1000px; margin: auto; padding: 10px">
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
							<Stavka v-for="item in te" :key="item.id" :item="item" @remov="getTotal()"/>
						</tbody>
					</v-simple-table>
					<hr style="margin-top: 10px; height: 3.5px; background: black" />
					
					       
        
        <v-select v-model="test.stol"
            :items="items"
            label="Odaberite stol"
			style="width:35%;margin-left:30px;margin-top:20px;"
          ></v-select>
			  <h3 style="float:right;	margin-right:50px;margin-top:20px;margin-bottom:15px;">Ukupno: {{ this.test.tf }} kn</h3>
			<div class="my-2">
				
              <v-btn v-if="test.stol!=''"
			  @click="orderCommit()"
                x-large
                color="success"
                dark
				style="float:right;	margin-right:50px;margin-top:10px;margin-bottom:10px;"
              >
                Potvrdi narudžbu
              </v-btn>
			  <h4 v-if="test.stol==''" style="margin-left:30px;">*obavezno je odabrati stol</h4>
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
				a: Number,
				store,
			};
		},
		mounted() {
			this.getTotal();
		},
		methods: {
			deleteCart(){
			for (let index = this.te.length -1; index >=0; index--) {
					 this.$store.commit('removeFromCart', this.te[index]);
					 this.getTotal()	
					 this.test.stol=''	}
		},
			getTotal() {
				
				console.log(this.test);
				this.test.tf = 0
				for (let index = 0; index < this.te.length; index++) {
					 this.test.tf =
						this.test.tf + this.te[index].kolicina * this.te[index].infoPrice;
				}
				console.log("getTotal, cart", this.te, this.test.tf);
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
                    console.log("Spremljeno", doc)
					this.deleteCart();
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
