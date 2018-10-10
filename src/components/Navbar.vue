<template>
        <b-navbar toggleable="md" type="dark" variant="info">
                
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">
                <router-link to="/" class="brand-logo">
                    <i class="fa fa-home"></i>
                </router-link>
                <b-dropdown text="Category">
                        <b-dropdown-item href="#">Clothes</b-dropdown-item>
                        <b-dropdown-item href="#">Kitchen</b-dropdown-item>
                </b-dropdown>
                <input size="sm" class="mr-sm-2" type="text" placeholder="Search" width="150" />
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                <b-button><router-link to="/login">Login</router-link></b-button>
                <b-button><router-link to="/register">Register</router-link></b-button>
            </b-collapse>
        </b-navbar>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

export default {
    name: 'navbar',
    data () {
        return {
            //
        }
    }
}
</script>

