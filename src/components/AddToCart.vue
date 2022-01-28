<template>
    <div class="AddToCart">
        <v-btn color="red lighten-1" text> Naruči </v-btn>
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
            infoName: this.name,
            infoPrice: this.price,
            info_id: this.infoId,
        }
    }
}
</script>