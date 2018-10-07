<template>
<div>
    <!--img v-bind:src="imageLink" height="48" width="48" /-->
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>Products</h4>
            <div class="action-btn">
                <router-link to="/new" class="btn-floating btn-large red">
                    <i class="fa fa-plus"></i>
                </router-link>
            </div>
        </li>
        <li v-for="product in products" v-bind:key="product.id" class="collection-item">
                <img v-bind:src="product.imageUrl" height="80" width="80" />
                <div class="chip">{{product.category}}</div>
                {{product.barcode}}:{{product.name}}
                <b>{{product.price}} VND</b>
                <router-link v-bind:to="{name: 'view-employee', params: {product_id: product.id}}" class="secondary-content">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>
</div>
</template>

<script>
// import firebase from 'firebase'
// storage reference:   gs://vnshoptest.appspot.com          
import firebaseApp from './firebaseInit'

export default {
    name: 'display',
    data () {
        return {
            products: [],
            //imageLink: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'  
        }
    },
    created () {
        
/*
        pathReference.getDownloadURL().then(function(url) {
            this.imageLink = url;
        }).catch(function(error) {
            // Handle any errors
        });
*/
        var db = firebaseApp.firestore();
        
        db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              //  console.log(doc.data());
                const data = {
                    'id': doc.id,
                    'article_number': doc.data().article_number,
                    'barcode': doc.data().barcode,
                    'category': doc.data().category,
                    'colour': doc.data().colour,
                    'description': doc.data().description,
                    'name': doc.data().name,
                    'name_ger': doc.data().name_ger,
                    'price': doc.data().price,
                    'size': doc.data().size,
                    'imageUrl': null,
                    'tags': null
                    // tags
                }
                this.products.push(data)
            })
            this.fetchData()
        }) 
    },
    methods: {
        fetchData: function () {
           var vm = this

            var storage = firebaseApp.storage("gs://vnshoptest.appspot.com");
            // First we sign in the user anonymously
            firebaseApp.auth().signInAnonymously().then(function() {
                // Once the sign in completed, we get the download URL of the image
                
                vm.products.forEach(product => {
                    console.log("hier")
                    var fileName = 'images/' + product.barcode + '.jpg'
                    console.log(fileName)
                    var pathReference = storage.ref(fileName);
                    pathReference.getDownloadURL().then(function(url) {
                        // Once we have the download URL, we set it to our img element
                        product.imageUrl = url
                        console.log(url);
                    });
                }).catch(function(error) {
                // If anything goes wrong while getting the download URL, log the error
                console.error(error);
                });
            });
        }
    }
    //  https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png
}
</script>
    