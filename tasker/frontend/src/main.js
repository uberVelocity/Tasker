import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import ServerComponent from './components/ServerComponent'
import AboutComponent from './components/AboutComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import HomeComponent from './components/HomeComponent';
import StatusComponent from './components/StatusComponent';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/about',
    name: 'About', 
    component: AboutComponent
  },
  {
    path: '/login',
    name: 'Login', 
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterComponent
  },
  {
    path: '/servers',
    name: 'Server',
    component: ServerComponent
  },
  {
    path: '/dashboard/status',
    name: 'Status',
    component: StatusComponent
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
