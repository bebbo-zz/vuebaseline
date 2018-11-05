<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
                
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">
                <!--router-link to="/" class="brand-logo">
                    
                </router-link-->
                <b-row align-h="start">
                    <b-button v-on:click="home"><i class="fa fa-home"></i></b-button>                
                    <b-dropdown text="Category">
                            <b-dropdown-item href="#">Clothes</b-dropdown-item>
                            <b-dropdown-item href="#">Kitchen</b-dropdown-item>
                    </b-dropdown>
                    <!--input size="sm" class="mr-sm-2" type="text" placeholder="Search" width="150" /-->
                    <b-button><i class="fa fa-search"></i></b-button>
                    <!-- maybe fas fa-user-circle -->
                    <!--span v-if="isLoggedIn" class="black-text">{{currentUser}}</span-->
                    <b-button v-if="isLoggedIn"><i class="fa fa-user-circle"></i></b-button>
                    <b-button v-if="!isLoggedIn" v-on:click="login"><i class="fa fa-lock"></i></b-button>                    
                    <b-button v-if="isLoggedIn" v-on:click="logout"><i class="fa fa-unlock"></i></b-button>
                    <b-button v-on:click="cart"><i class="fa fa-shopping-cart"></i></b-button>
                    <b-button v-if="isEmployee" v-on:click="cashier"><i class="fa fa-laptop"></i></b-button>
                    <b-button v-if="isEmployee" v-on:click="admin"><i class="fa fa-wrench"></i></b-button>
                    <!--router-link to="/register"><b-button>Register</b-button></router-link-->
                    <b-button v-on:click="language"><i class="fa fa-globe"></i></b-button>
                </b-row>
            </b-collapse>
        </b-navbar>


        <b-modal 
            ref="modalLang" 
            title="Select Language"
            hide-footer>
            <b-row>
                <b-col>
                    <button type="button" @click="changeLang('en')" class="btn">English</button>
                </b-col>
                <b-col>
                    <button type="button" @click="changeLang('vn')" class="btn">Tiếng Việt</button>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import firebaseApp from './firebaseInit'
import { mapGetters } from 'vuex'

export default {
    name: 'navbar',
    data () {
        return {
            isLoggedIn: false,
            currentUser: false,
            isEmployee: false,
        }
    },
  /*  computed: {
        itemsInCart(){
        let cart = this.$store.getters.cartProducts;
        return cart.reduce((accum, item) => accum + item.quantity, 0)
        }
    }, */
    created() {
        if(firebaseApp.auth().currentUser) {
            this.isLoggedIn = true
            this.currentUser = firebaseApp.auth().currentUser.email
            console.log("this current user " + this.currentUser)

            var db = firebaseApp.firestore();
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
    },
    methods: {
        home: function(e) {
            console.log('home')
            this.$router.push('/')
            e.preventDefault()
        },
        cart: function(e) {
            console.log('cart')
            this.$router.push('/cart')
            e.preventDefault()
        },
        cashier: function(e) {
            console.log('cashier')
            this.$router.push('/cashier')
            e.preventDefault()
        },
        admin: function(e) {
            console.log('admin')
            this.$router.push('/admin')
            e.preventDefault()
        },
        logout: function(e) {
            console.log('logout')
            firebaseApp.auth().signOut().then(() => {
                console.log('start to route')
                this.$router.go({path: this.$router.path});
            })
            e.preventDefault()
        },
        login: function(e) {
            console.log('home')
            this.$router.push('/login')
            e.preventDefault()
        },
        language: function(e) {
            this.$refs.modalLang.show() 
        },
        changeLang(lang) {
            this.$i18n.locale = lang
            this.$refs.modalLang.hide()
        }
    }
}
</script>

