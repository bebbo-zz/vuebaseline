<template>
    <div>
        <div class="fixed-action-btn">
            <router-link v-if="isEmployee" to="/new" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
        <div class="row" v-for="i in Math.ceil(products.length / 3)" v-bind:key="i">
            <div v-for="product in products.slice((i - 1) * 3, i * 3)" v-bind:key="product.id" class="col-md-4 col-6 my-1">
                <b-card 
                    v-bind:img-src="product.thumbUrl"
                    img-fluid
                    img-alt="image"
                    overlay>
                <!-- img-src="https://picsum.photos/400/400/?image=41"
                    {{item}} -->
                    <div slot="footer">
                        <small class="text-muted">{{product.name}}<br />{{product.price}} VND</small>   
                    </div>
                        <router-link v-bind:to="{name: 'view-product', params: {product_id: product.product_id}}" class="secondary-content">
                            <i class="fa fa-eye"></i>
                        </router-link>
                        <router-link v-if="isEmployee" v-bind:to="{name: 'edit-product', params: {product_id: product.product_id}}" class="secondary-content">
                            <i class="fa fa-pencil"></i>
                        </router-link>
                        <button @click='addToCart(product)' class='button is-info'><i class="fa fa-cart-arrow-down"></i></button>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
// storage reference:   gs://vnshoptest.appspot.com          
import firebaseApp from './firebaseInit'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'display',
    data () {
        return {
            isLoggedIn: false,
            currentUser: false,
            isEmployee: false,
            products: []
        }
    },
    created () {
      var db = firebaseApp.firestore();

      if(firebaseApp.auth().currentUser) {
            this.isLoggedIn = true
            this.currentUser = firebaseApp.auth().currentUser.email
            console.log("this current user " + this.currentUser)

            db.collection('users').where('email', '==', this.currentUser).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    var role = doc.data().role
                    if(role == 'employee') {
                        this.isEmployee = true
                    }
                })
            })
      }

        db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                var thumbPicture = null
                if(doc.data().thumbUrl == undefined) {
                    thumbPicture = "https://firebasestorage.googleapis.com/v0/b/vnshoptest.appspot.com/o/images%2Fno-image-icon-6.png?alt=media&token=4b4b8e91-6525-4607-b845-b2e8f0ce3b98"
                }else{
                    thumbPicture = doc.data().thumbUrl
                }
                const data = {
                    'product_id': doc.id,
                    'article_number': doc.data().article_number,
                    'barcode': doc.data().barcode,
                    'category': doc.data().category,
                    'colour': doc.data().colour,
                    'description': doc.data().description,
                    'name': doc.data().name,
                    'name_ger': doc.data().name_ger,
                    'price': doc.data().price,
                    'size': doc.data().size,
                    'thumbUrl': thumbPicture,
                    'tags': null
                    // tags
                }
                this.products.push(data)
            })
        }) 
    },
    computed: mapGetters({
        products: 'allProducts',
        length: 'getNumberOfProducts'
    }),
    methods: {
        ...mapActions(['addToCart'])
    }
}
</script>
    