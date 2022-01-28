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
    addToCart(state, item){
      state.cart.push(item);
      console.log("dodano u košaricu: ", item)
    }
  }

})
