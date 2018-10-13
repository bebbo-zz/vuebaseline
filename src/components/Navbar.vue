<template>
        <b-navbar toggleable="md" type="dark" variant="info">
                
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">
                <!--router-link to="/" class="brand-logo">
                    
                </router-link-->
                <b-row align-h="start">
                    <router-link to="/"><b-button><i class="fa fa-home"></i></b-button></router-link>                
                    <b-dropdown text="Category">
                            <b-dropdown-item href="#">Clothes</b-dropdown-item>
                            <b-dropdown-item href="#">Kitchen</b-dropdown-item>
                    </b-dropdown>
                    <!--input size="sm" class="mr-sm-2" type="text" placeholder="Search" width="150" /-->
                    <b-button><i class="fa fa-search"></b-button>
                </b-row>
                <b-row align-h="end">
                    <!-- maybe fas fa-user-circle -->
                    <router-link to="/login"><b-button><i class="fa fa-user-circle"></i></b-button></router-link>
                    <router-link to="/"><b-button><i class="fa fa-shopping-cart"></i></b-button></router-link>
                    <!--router-link to="/register"><b-button>Register</b-button></router-link-->
                </b-row>
            </b-collapse>
        </b-navbar>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            //
        }
    }
}
</script>

