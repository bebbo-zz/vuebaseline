import Vue from 'vue'
import Router from 'vue-router'
import Display from '@/components/Display'
import EditProduct from '@/components/EditProduct'
import ViewProduct from '@/components/ViewProduct'
import NewProduct from '@/components/NewProduct'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Cart from '@/components/Cart'
import Cashier from '@/components/Cashier'
import Checkout from '@/components/Checkout'
import firebaseApp from '@/components/firebaseInit'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'display',
      component: Display
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: Cashier
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:product_id',
      name: 'edit-product',
      component: EditProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:product_id',
      name: 'view-product',
      component: ViewProduct
    }
  ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
  // check for requiredAuth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // check if NOT logged in
    if(!firebaseApp.auth().currentUser) {
      // go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // proceed to route
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    // check if logged in
    if(firebaseApp.auth().currentUser) {
      // go to login page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // proceed to route
      next();
    }
  } else {
    next();
  }
})

export default router;