import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store( {
  searchTerm: "",
  currentUser: null,
  state: {
    cart:[]
  },
  mutations :{
    addToCart: (state, item) => {
    let added = state.cart.filter((sItem) => sItem.info_id == item.info_id);
      if(added.length > 0) {
        added[0].kolicina = item.kolicina;
      }
     else{
       var test={};
       Object.assign(test,item)
      state.cart.push(test);
      console.log("dodano u košaricu: ", item)}
      item.kolicina = 1;
    },
  removeFromCart: (state, item) => {
    console.log("remove")
    console.log("item je ", item)
    let index = state.cart.indexOf(item,1);
    if(index == -1){
      index = 0;
    }
    console.log("index:", index)
    state.cart.splice(index,1);  
  },  
  }
})
