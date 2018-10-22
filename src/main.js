import Vue from 'vue';
import Vuex from 'vuex';
import pdfjs from 'pdfjs-dist';
import MainContainer from './MainContainer.vue';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.bundle.js';

Vue.use(Vuex);

const store = {
    state: {
        books: [],
        indexs: [],
        lastIndex: -1
    },
    getters: {
        books: state => state.books,
        indexs: state => state.indexs,
        lastIndex: state => state.lastIndex
    },
    mutations: {
        addBook(state, payload) {
            state.books = [...state.books, payload.book];
        },
        setIndexs(state, payload) {
            state.indexs = payload.indexs;
        },
        setLastIndex(state, payload) {
            state.lastIndex = payload.lastIndex;
        }
    },
    actions: {
        addBook({commit, state}, book) {
            commit('addBook', {book});
            commit('setLastIndex', {
                lastIndex: state.books.lastIndexOf(book)
            });
        },
        setIndexs({commit}, indexs) {
            commit('setIndexs', {indexs});
        }
    }
};

const app = new Vue({
    template: '<main-container />',
    components: {MainContainer},
    store: new Vuex.Store(store)
}).$mount('#app');

console.log(app);