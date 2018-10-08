import Vue from 'vue'
import Router from 'vue-router'
import Display from '@/components/Display'
import EditProduct from '@/components/EditProduct'
import ViewProduct from '@/components/ViewProduct'
import NewProduct from '@/components/NewProduct'
import ViewEmployee from '@/components/ViewEmployee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'display',
      component: Display
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct
    },
    {
      path: '/edit/:product_id',
      name: 'edit-product',
      component: EditProduct
    },
    {
      path: '/test/:employee_id',
      name: 'view-employee',
      component: ViewEmployee
    },
    {
      path: '/:product_id',
      name: 'view-product',
      component: ViewProduct
    }
  ]
})
