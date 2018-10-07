<template>
    <div id="new-product">
        <h3>New Product</h3>
        <div class="row">
            <form @submit.prevent="updateProduct" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="barcode" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="article_number" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="name_ger" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="price" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="category" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
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
// import db from './firebaseInit'
import firebaseApp from './firebaseInit'

export default {
    name: 'new-product',
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
    methods: {
        saveEmployee () {
            var db = firebaseApp.firestore();

            db.collection('products').add({
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
            .then(docRef => {
                this.$router.push('/')
            })
            .catch(error => {
                console.log(err)
            })
        }
    }
}
</script>