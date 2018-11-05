<template>
   <b-row>
       <b-col>
          <div class="row">
             <form @submit.prevent="enterProduct" class="col s12">
                <div class="row">
                   <div class="input-field col s12">
                       <label>Barcode</label>
                       <br />
                       <input type="text" v-model="barcode" required>
                   </div>
                </div>
                <div class="row">
                   <div class="input-field col s12">
                       <label>Quantity</label>
                       <br />
                       <input type="text" v-model="quantity" required>
                   </div>
                </div>
                <button type="submit" class="btn">Add to Cart</button>
                <button type="button" class="btn">Manual Entry</button>
           </form>
        </div>
      </b-col>
      <b-col>
        <Cart />
      </b-col>
   </b-row>
</template>

<script>
import Cart from '@/components/Cart'
import firebaseApp from './firebaseInit'
import { mapActions } from 'vuex'

// sample barcode 123123
export default {
  name: 'cashier',
  data () {
    return {
      product_id: null,
      barcode: null,
        category: null,
        price: null,
        name: null,
        quantity: 1
    }
  },
  components: {
      Cart
  },
  methods: {
    ...mapActions(['addToCart']),
    enterProduct() {
      var db = firebaseApp.firestore();
      db.collection('products').where('barcode', '==', this.barcode).get()
           .then(querySnapshot => {
             querySnapshot.forEach(doc => {
               var data = {
                   'product_id': doc.id,
                   'price': doc.data().price,
                   'quantity': this.quantity,
                   'barcode': doc.data().barcode,
                   'name': doc.data().name,
                   'category': doc.data().category
          }
          this.addToCart(data)
        })
      })
    }
  }
}
</script>
