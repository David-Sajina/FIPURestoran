<template>
    

					<!-- <v-card-text>
						
							<v-list-item-content>
								<v-list-item-title
									>{{ item.infoName }} {{ item.infoPrice }} kn, količina
									{{ item.kolicina
									}}<v-btn
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
					</v-card-text> -->
<tr>
            <td>{{ item.infoName }}</td>
            <td>{{ item.infoPrice }}kn</td>
            <td>{{ item.kolicina }}</td>
			<td><v-btn
                    @click="removeFromCart(item)"
										class="ma-2"
										text
										icon
										relative
										right
										color="red lighten-2"
									>
										<v-icon>mdi-minus</v-icon>
									</v-btn></td>
      </tr>
     

					
</template>

<script>

	import store from "@/store.js";
export default {
		name: "Stavka",
        props: {
			item: Object,
			t: Object
		},
    
		components: {},
		data() {
     
			return {
				 
				test: { tf: 0 },
                te: this.$store.state.cart,
				store,
        
			};
            
		}, /*  mounted() {
    this.getTotal();
  }, */
		methods: {
			/* getTotal() {
                console.log(this.test)
				for (let index = 0; index < this.te.length; index++) {
					this.test.tf =
						this.test.tf +
						this.te[index].kolicina *
							this.te[index].infoPrice;
				}
			}, */
      removeFromCart(item){
           console.log(this.item.kolicina);
        this.$store.commit('removeFromCart', this.item);
        console.log(this.te)
		this.$emit('remov')
		
    }
			
		},
	};
</script>