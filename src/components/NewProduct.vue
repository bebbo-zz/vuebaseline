<template>
    <div id="new-product">
        <h3>New Product</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="barcode" required>
                        <label>Barcode</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="article_number" required>
                        <label>Article Number</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="name_ger" required>
                        <label>Name (German)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Name (Display)</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="price" required>
                        <label>Price</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="category" required>
                        <label>Category</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="description" required>
                        <label>Description</label>
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
                article_number: this.article_number,
                barcode: this.barcode,
                category: this.category,
                colour: this.colour,
                description: this.description,
                name: this.name,
                name_ger: this.name_ger,
                price: this.price,
                size: this.size
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