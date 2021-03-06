import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import ServerComponent from './components/ServerComponent'
import AboutComponent from './components/AboutComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import HomeComponent from './components/HomeComponent';
import StatusComponent from './components/StatusComponent';
import BarComponent from './components/charts/BarComponent';
import UserComponent from './components/UserComponent';
import ChatComponent from './components/ChatComponent';


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
  },
  {
    path: '/chart',
    name: 'Chart',
    component: BarComponent
  },
  {
    path: '/user',
    name: 'User',
    component: UserComponent
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatComponent
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
