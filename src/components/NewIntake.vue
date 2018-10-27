<template>
    <div id="new-intake">
        <h3>New Intake</h3>
        <div class="row">
            <form @submit.prevent="saveIntake" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="quantity" required>
                        <label>Quantity</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="text" v-model="purchase_price" required>
                        <label>Purchase Price</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="supplier" required>
                        <label>Supplier</label>
                    </div>
                </div>
                <button type="submit" class="btn"><i class="fa fa-save"></i></button>
                <router-link to="/" class="btn grey"><i class="fa fa-ban"></i></router-link>
            </form>
        </div>
    </div>
</template>

<script>
import firebaseApp from './firebaseInit'

export default {
    name: 'new-intake',
    data () {
        return {
            quantity: null,
            purchase_price: null,
            supplier: null
        }
    },
    methods: {
        saveIntake () {

            var db = firebaseApp.firestore();

            db.collection('intakes').add({
                product_id: this.$route.params.product_id,
                purchase_price: this.purchase_price,
                quantity: this.quantity,
                supplier: this.supplier
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