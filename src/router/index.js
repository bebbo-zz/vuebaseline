import Vue from 'vue'
import Router from 'vue-router'
import Display from '@/components/Display'
import EditProduct from '@/components/EditProduct'
import ViewProduct from '@/components/ViewProduct'
import NewProduct from '@/components/NewProduct'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NewIntake from '@/components/NewIntake'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'display',
      component: Display
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct
    },
    {
      path: '/newintake/:product_id',
      name: 'new-intake',
      component: NewIntake
    },
    {
      path: '/edit/:product_id',
      name: 'edit-product',
      component: EditProduct
    },
    {
      path: '/:product_id',
      name: 'view-product',
      component: ViewProduct
    }
  ]
})
