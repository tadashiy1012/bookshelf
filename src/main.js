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
        const books = await resp.json();
        books.forEach(elm => {
            this.$store.dispatch('addBook', elm);
        });
        const resp2 = await fetch('/categories');
        const categories = await resp2.json();
        const all = {name: 'all', books: books.map(elm => elm._id)};
        this.$store.dispatch('setCategory', [all, ...categories]);
    }
}).$mount('#app');

console.log(app);