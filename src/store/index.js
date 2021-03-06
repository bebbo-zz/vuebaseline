import 'es6-promise/auto'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  added: [],
  totalSum: 0
}

// getters
const getters = {
  getNumberOfProducts: state => (state.added) ? state.added.length : 0,
  cartProducts: state => state.added
}
  
// actions
const actions = {
  addToCart({ commit }, product){ 
    commit('addToCart', product)
  },
  removeFromCart({commit}, item){
    commit('removeFromCart', item)
  },
  moveTotalSum({commit}, totalSumIn){
    commit('moveTotalSum', totalSumIn)
  }
}

// mutations
const mutations = {
  addToCart(state, product) {
    const record = state.added.find(p => p.product_id === product.product_id)
    
    if (!record) {
     // console.log("p id: " + p.id)
      console.log("product id: " + product.product_id)
      console.log(product.name)
          state.added.push(product)
          if (product.quantity == undefined) {
            Vue.set(product, 'quantity', 1)
            Vue.set(product, 'totalPrice', product.price)
          }
    } else {
          var additionalQuantity = 1
          if (product.quantity == undefined) {
            additionalQuantity = 1
          } else {
            additionalQuantity = product.quantity
          }
          record.quantity = record.quantity + additionalQuantity
          record.totalPrice = record.quantity * record.price
    }
  },
  removeFromCart(state, item) {
    let index = state.added.indexOf(item);

    if (index > -1) {
      // let product = state.added[index];
      state.added.splice(index, 1);
    }
  },
  moveTotalSum(state, totalSumIn) {
    state.totalSum = totalSumIn
    this.$router.push('/checkout')
  }
}

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})