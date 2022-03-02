<template><div>
    <!-- <div>
<Stavka
            v-for="item in te" :key="item.id" :item="item" 
          />
</div> -->
<div id="app">
  <v-app id="inspire">
    <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              Jelo
            </th>
            <th class="text-left">
              Cijena
            </th>
			<th class="text-left">
              Količina
            </th>
			<th class="text-left">
              Ukloni
            </th>
          </tr>
        </thead>
        <tbody>
          <Stavka
            v-for="item in te" :key="item.id" :item="item" 
          />
        </tbody>
    </v-simple-table>
	<hr style="margin-top:10px;;height:3.5px; background:black;">TOTAL: {{test.tf}}
  </v-app>
</div>
</div>
					
</template>

<script>

	import store from "@/store.js";
    import Stavka from "@/components/Stavka.vue";
export default {
		name: "Checkout",
    
		components: {
            Stavka,
        },
		data() {
     
			return {
				test: { tf: 0 },
                te: this.$store.state.cart,
				store,
        
			};
            
		},  mounted() {
    this.getTotal();
  },
		methods: {
			getTotal() {
                console.log("cart",this.te)
                console.log(this.test)
				for (let index = 0; index < this.te.length; index++) {
					this.test.tf =
						this.test.tf +
						this.te[index].kolicina *
							this.te[index].infoPrice;
				}
			},
      removeFromCart(){
           console.log(this.te.kolicina);
        this.$store.commit('removeFromCart', this.te);
        console.log(this.te)
        this.test.tf = 0;
        this.getTotal()
    }
			
		},
	};
</script>