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
    }
  },  

})
