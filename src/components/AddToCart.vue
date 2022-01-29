<template>
    <div class="AddToCart">
         <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on"  color="red lighten-1" text> Naruči </v-btn>


   
         
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Količina
          </v-card-title>
  
          <v-card-text>
           Unesite količinu
           <v-row>
           <v-btn
        class="mx-2"
        fab
        dark
        small
        color="pink"
        style="margin-top:20px;"        
        @click="decrement"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn><v-col cols="12" sm="3" md="3">
           <v-text-field v-model="item.kolicina" type="number" label="Količina"></v-text-field></v-col>
 <v-btn
        class="mx-2"
        fab
        dark
        small
        color="pink"
        style="margin-top:20px;"
        @click="increment"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn></v-row>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="addToCart"
            >
              Dodaj u košaricu
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
        kol: Number,
    },
    data(){
        return{
            
            dialog: false,
            item: {
            infoName: this.name,
            infoPrice: this.price,
            info_id: this.infoId,
            kolicina: 1
            }
        }
    },
    methods:{
       increment(){
           if(this.item.kolicina>0 && this.item.kolicina<20)
{this.item.kolicina = parseFloat(this.item.kolicina,10) + 1}
       },
       decrement(){
           if(this.item.kolicina>1){
           this.item.kolicina = parseFloat(this.item.kolicina,10) -1}
       },
       addToCart(){
           this.dialog = false;
           console.log(this.item.kolicina + 10);
        this.$store.commit('addToCart', this.item);
              this.$emit('onCommit')
    }}
}

</script>