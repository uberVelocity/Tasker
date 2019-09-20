// Entry point to vuex
import Vuex from 'vuex';
import Vue from 'vue';
import posts from './modules/posts';

// Load Vuex
Vue.use('Vuex');

// Create Store
export default new Vuex.Store({
    modules: {
        posts
    }
});