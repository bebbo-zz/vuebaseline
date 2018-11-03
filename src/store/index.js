import 'es6-promise/auto'

import Vue from 'vue'
import Vuex from 'vuex'
//import * as types from './mutation-types'

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
      commit('addToCart', product);
    }
  }

// mutations
const mutations = {
  addToCart(state, product) {
    const record = state.added.find(p => p.id === product.id)

    if (!record) {
          state.added.push(product)
          if(product.quantity == undefined) {
            Vue.set(product, 'quantity', 1);
            Vue.set(product, 'totalPrice', product.price);
          }
    } else {
          var additionalQuantity = 1
          if(product.quantity == undefined) {
            additionalQuantity = 1
          }else{
            additionalQuantity = product.quantity
          }
          record.quantity = record.quantity + additionalQuantity
          record.totalPrice = record.quantity * record.price
    }
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