<template>
    <div id="view-product">
        <b-container>
            <b-row>
                <b-col>
                    <!-- Gallerie -->
                    <b-carousel id="carousel1"
                        controls
                        indicators
                        background="#ffffff"
                        :interval="4000"
                    >
                        <b-carousel-slide v-for="picture in pictures" v-bind:key="picture">
                            <img v-bind:src="picture" />
                        </b-carousel-slide>
                    </b-carousel>
                    <!-- v-for="item in upcomingMovies.slice(0, 3)" -->
                </b-col>
                <b-col>
                    <ul class="colection with-header">
                        <li class="collection-header"><h4>{{name}}</h4></li>
                        <li class="collection-item">Barcode: {{barcode}}</li>
                        <li class="collection-item">Article Number: {{article_number}}</li>
                        <li class="collection-item">Name (German): {{name_ger}}</li>
                        <li class="collection-item">Category: {{category}}</li>
                        <li class="collection-item">Description: {{description}}</li>
                    </ul>
                </b-col>
                <b-col>
                    <ul class="colection with-header">
                        <li class="collection-item">Price: {{price}}</li>
                    </ul>
                </b-col>
            </b-row>
           
        </b-container>
        <router-link to="/" class="btn grey"><i class="fa fa-ban"></i></router-link>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'view-product', params: {product_id: product_id}}" class="btn-floating btn-large red">
                <i class="fa fa-cart-plus"></i>
            </router-link>
            <p>&nbsp;</p>
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
            tags: null,
            pictures: []
        }
    },
    beforeRouteEnter(to, from, next) {
      /*  var storage = firebaseApp.storage("gs://vnshoptest.appspot.com");
        var curImgUrl = null
            // First we sign in the user anonymously
        firebaseApp.auth().signInAnonymously().then(function() {
                // Once the sign in completed, we get the download URL of the image
                
                    var fileName = 'images/' + to.params.product_id + '_0'
                    var pathReference = storage.ref(fileName)
                    console.log(pathReference)
                    pathReference.getDownloadURL().then(function(url) {
                        // Once we have the download URL, we set it to our img element
                        curImgUrl = url
                        console.log(url);
                    });
        });
        */
        // https://firebasestorage.googleapis.com/v0/b/vnshoptest.appspot.com/o/images%2FbX572QaOCEfqMODWKAzW_0?alt=media&token=d5334ef0-25a3-4e9c-82c5-44185e4a72e7

        var db = firebaseApp.firestore();
//        console.log("routerbeforeenter: " + to.params.product_id)
        
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
                        vm.pictures = doc.data().picsUrl
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
                            this.pictures = doc.data().picsUrl
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })
        }
    }
}
</script>