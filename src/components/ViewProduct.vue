<template>
    <div id="view-product">
        <ul class="colection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Barcode: {{barcode}}</li>
            <li class="collection-item">Article Number: {{article_number}}</li>
            <li class="collection-item">Name (German): {{name_ger}}</li>
            <li class="collection-item">Price: {{price}}</li>
            <li class="collection-item">Category: {{category}}</li>
            <li class="collection-item">Description: {{description}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteProduct" class="btn red">Delete</button>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-product', params: {product_id: product_id}}" class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
//import db from './firebaseInit'
import firebaseApp from './firebaseInit'

export default {
    name: 'view-product',
    data () {
        return {
            product_id: null,
            article_number: null,
            barcode: null,
            category: null,
            colour: null,
            description: null,
            name: null,
            name_ger: null,
            price: null,
            size: null,
            tags: null
        }
    },
    beforeRouteEnter(to, from, next) {
        var db = firebaseApp.firestore();
        console.log("routerbeforeenter: " + to.params.product_id)
        var docRef = db.collection("products").doc(to.params.product_id);
        docRef.get().then(function(doc) {
            if (doc.exists) {
             //   console.log("Document data:", doc.data());
                next(vm => {
                        vm.product_id = doc.id
                        vm.article_number = doc.data().article_number
                        vm.barcode = doc.data().barcode
                        vm.category = doc.data().category
                        vm.colour = doc.data().colour
                        vm.description = doc.data().description
                        vm.name = doc.data().name
                        vm.name_ger = doc.data().name_ger
                        vm.price = doc.data().price
                        vm.size = doc.data().size
                    })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
           var db = firebaseApp.firestore();
           console.log("fetchdata: " + this.$route.params.product_id)
            var docRef = db.collection("products").doc(this.$route.params.product_id);
           // db.collection('products').where('barcode', '==', this.$route.params.product_id).get()
           docRef.get().then(function(doc) {
                if (doc.exists) {
                //   console.log("Document data:", doc.data());
                    this.product_id = doc.id
                            this.article_number = doc.data().article_number
                            this.barcode = doc.data().barcode
                            this.category = doc.data().category
                            this.colour = doc.data().colour
                            this.description = doc.data().description
                            this.name = doc.data().name
                            this.name_ger = doc.data().name_ger
                            this.price = doc.data().price
                            this.size = doc.data().size
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })
        } ,
        deleteProduct() {
            if(confirm('Are you sure?')) {
                var db = firebaseApp.firestore();
                var docRef = db.collection("products").doc(this.$route.params.product_id);
                docRef.delete()
                this.$router.push('/')
            }
        } 
    }
}
</script>