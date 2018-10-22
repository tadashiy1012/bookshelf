import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import pdfjs from 'pdfjs-dist';
import store from './store';
import MainContainer from './MainContainer.vue';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.bundle.js';

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
    {path: '/'},
    {path: '/java'},
    {path: '/php'},
    {path: '/javascript'},
    {path: '/swift'},
    {path: 'etc'}
];

const app = new Vue({
    template: '<main-container />',
    components: {MainContainer},
    router: new VueRouter({routes}),
    store: new Vuex.Store(store)
}).$mount('#app');

console.log(app);