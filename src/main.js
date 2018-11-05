// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import './plugins/vuetify'
import App from './App'
import router from './router'
//import firebaseApp from '@/components/firebaseInit'
import firebase from 'firebase';
import './components/firebaseInit';
import store from './store';
import { i18n } from './plugins/i18n.js'
//import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueCarousel from 'vue-carousel';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueCarousel);
Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      i18n,
      components: { App },
      template: '<App/>'
    })
  }
})