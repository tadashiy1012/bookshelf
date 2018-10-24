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
    {path: '/'}
];

const app = new Vue({
    template: '<main-container />',
    components: {MainContainer},
    router: new VueRouter({routes}),
    store: new Vuex.Store(store),
    created: async function() {
        const resp = await fetch('/books');
        const json = await resp.json();
        json.forEach(elm => {
            this.$store.dispatch('addBook', elm);
        });
    }
}).$mount('#app');

console.log(app);