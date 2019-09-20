import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import PostComponent from './components/PostComponent'
import AboutComponent from './components/AboutComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    name: 'Post',
    component: PostComponent
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
