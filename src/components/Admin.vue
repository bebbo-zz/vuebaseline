<template>
  <div class="row">
      <button v-on:click="productUpload" type="button" class="btn">Start Upload</button>
      <button v-on:click="deleteAll" type="button" class="btn">Delete Barcodes</button>
  </div>
</template>

<script>
import firebaseApp from './firebaseInit'

export default {
    name: 'admin',
  data () {
      return {
        products: [
          //   { barcode: '123456', name: 'test product', name_ger: 'test produkt', price: 123.00 },
          { barcode: '4333991030791', name: 'Pepperts clogs bé gái, xanh turkis', name_ger: 'pepperts maedchen clogs, sz 30/31, turkis' , price: 160000 }
        ]
      }
  },
  methods: {
      productUpload() {
        var db = firebaseApp.firestore();
        this.products.forEach(item => {
          db.collection('products').add({
              barcode: item.barcode,
              name: item.name,
              name_ger: item.name_ger,
              price: item.price,
          })
          .then(docRef => {
              console.log("product added")
          })
          .catch(error => {
              console.log(err)
          })
        });
      },
      deleteProducts() {
        var db = firebaseApp.firestore();
        this.products.forEach(item => {
          db.collection("products").where('barcode', '==', item.barcode).get()
          .then(querySnapshot => {
              querySnapshot.forEach(doc => { doc.delete();})
          })
        });
      },
      deleteAll() {
        var db = firebaseApp.firestore();
        db.collection("products").where('barcode', '!=', '123123').get()
          .then(querySnapshot => {
              querySnapshot.forEach(doc => { doc.delete();})
          })
      }
  }
}
</script>
