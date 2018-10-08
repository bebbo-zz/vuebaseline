<template>
    <div id="edit-product">
        <h3>Edit Product</h3>
        <div class="row">
            <form @submit.prevent="updateProduct" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <label>Barcode</label>
                        <br />
                        <input type="text" v-model="barcode" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Article Number</label>
                        <br />
                        <input type="text" v-model="article_number" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Name (German)</label>
                        <br />
                        <input type="text" v-model="name_ger" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Name (Display)</label>
                        <br />
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Price</label>
                        <br />
                        <input type="text" v-model="price" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Category</label>
                        <br />
                        <input type="text" v-model="category" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Description</label>
                        <br />
                        <input type="text" v-model="description" required>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
//import db from './firebaseInit'
import firebaseApp from './firebaseInit'
export default {
    name: 'edit-product',
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
                    next(vm => {
                        vm.product_id = doc.id,
                        vm.article_number = doc.data().article_number,
                        vm.barcode = doc.data().barcode,
                        vm.category = doc.data().category,
                        vm.colour = doc.data().colour,
                        vm.description = doc.data().description,
                        vm.name = doc.data().name,
                        vm.name_ger = doc.data().name_ger,
                        vm.price = doc.data().price,
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
        },
        updateEmployee() {
            var db = firebaseApp.firestore();
            console.log("fetchdata: " + this.$route.params.product_id)
            var docRef = db.collection("products").doc(this.$route.params.product_id);
            // db.collection('products').where('barcode', '==', this.$route.params.product_id).get()
            docRef.update({
                            article_number: doc.data().article_number,
                            barcode: doc.data().barcode,
                            category: doc.data().category,
                            colour: doc.data().colour,
                            description: doc.data().description,
                            name: doc.data().name,
                            name_ger: doc.data().name_ger,
                            price: doc.data().price,
                            size: doc.data().size
            })
                .then(() => {
                    this.$router.push({name: 'view-product', params: {product_id: this.product_id}}) 
            })
        }
    }
}
</script>