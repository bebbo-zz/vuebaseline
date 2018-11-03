<template>
            <b-form-group>
                <b-form-radio-group 
                    id="paymentmethod" 
                    v-model="selected" 
                    name="radioSubComponent">
                    <b-form-radio value="cash"><img src="@/assets/icons/cash.png" /></b-form-radio>
                    <b-form-radio value="bankcard"><img src="@/assets/icons/bank_card.png" /></b-form-radio>
                    <b-form-radio value="creditcard"><img src="@/assets/icons/credit_card.png" /></b-form-radio>
                    <b-form-radio value="paypal"><img src="@/assets/icons/paypal.png" /></b-form-radio>
                </b-form-radio-group>
            </b-form-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'checkout',
    data () {
        return {
            selected: 'cash'
        }
    }
}
</script>
    