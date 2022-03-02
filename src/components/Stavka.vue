<template><div>
    

					<v-card-text>
						
							<v-list-item-content>
								<v-list-item-title
									>{{ item.infoName }} {{ item.infoPrice }} kn, količina
									{{ item.kolicina
									}}<v-btn
                    @click="removeFromCart()"
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
					</v-card-text><!-- 
					<v-list-item-title style="margin-left: 15px"
						>Total: {{ test.tf }} kn
					</v-list-item-title> -->
                    
</div>

					
</template>

<script>

	import store from "@/store.js";
export default {
		name: "Stavka",
        props: {
			item: Object,
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