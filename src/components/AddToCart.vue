<template>
    <div class="AddToCart">
         <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="addToCart" color="red lighten-1" text> Naruči </v-btn>


   
         
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Količina
          </v-card-title>
  
          <v-card-text>
           Unesite količinu
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>


    </div>
</template>

<script>
    
export default {
    name: "AddToCart",
    props: {
        name: String,
        price: Number,
        infoId: String,
    },
    data(){
        return{
            item: {
            infoName: this.name,
            infoPrice: this.price,
            info_id: this.infoId,
            },
            dialog: false,
        }
    },
    methods:
   { addToCart(){
        this.$store.commit('addToCart', this.item)
    }}
}

</script>
<style>


</style>