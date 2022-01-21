<template>
<form @submit.prevent="postNewImage" class="form-inline mb-5">
 <div class="form-group">
 <label for="imageUrl">Image URL</label>
 <input
 v-model="newImageUrl"
type="text"
class="form-control ml-2"
placeholder="Enter the image URL"
id="imageUrl"
 />
 </div>
 <div class="form-group">
 <label for="Title">Naslov</label>
 <input
 v-model="newTitle"
type="text"
class="form-control ml-2"
placeholder="Enter the image description"
id="Title"
 /></div>
 <div class="form-group">
 <label for="Price">Cijena</label>
 <input
 v-model="newPrice"
type="text"
class="form-control ml-2"
placeholder="Unesite cijenu"
id="Price"
 />
 </div>
 <button type="submit" class="btn btn-primary ml-2">Post
image</button>
 </form>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store.js";
import router from "@/router";

export default{
    name: 'rezervacije',
    data: function (){
        return{
            newTitle: "",
            newImageUrl: "",
            newPrice:"",
        }
    },
    methods: {
        postNewImage(){
            const imageUrl = this.newImageUrl;
            const title = this.newTitle;
            const price = this.newPrice;
            
            db.collection("jelo").add({
                url: imageUrl,
                desc: title,
                Cijena: price,
                posted_at: Date.now(),
            })
            .then((doc)=>{
                console.log("Spremljeno", doc)
                this.newTitle = "";
                this.newImageUrl = "";
                this.newPrice = "";
            })
            .catch((e)=>{
                console.error("greška")
            })
        }
    }
}
</script>
