<template>
    <div class="AddToCart">
        <v-btn @click="addToCart" color="red lighten-1" text> Naruči </v-btn>
    </div>
</template>

<script>
export default {
    name: "AddToCart",
    props: {
        name: String,
        price: String,
        infoId: String,
    },
    data(){
        return{
            item: {
            infoName: this.name,
            infoPrice: this.price,
            info_id: this.infoId
            }
        }
    },
    methods:
   { addToCart(){
        this.$store.commit('addToCart', this.item)
    }}
}
</script>