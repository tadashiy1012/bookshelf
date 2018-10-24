const state = {
    books: [],
    categories: [],
    leftMode: true,
    rightMode: true
};

const getters = {
    books: state => state.books,
    categories: state => state.categories,
    leftMode: state => state.leftMode,
    rightMode: state => state.rightMode
};

const mutations = {
    addBook(state, payload) {
        state.books = [...state.books, payload.book];
    },
    setLeftMode(state, payload) {
        state.leftMode = payload.leftMode;
    },
    setRightMode(state, payload) {
        state.rightMode = payload.rightMode;
    }
};

const actions = {
    addBook({commit}, book) {
        commit('addBook', {book});
    },
    setLeftMode({commit}, leftMode) {
        commit('setLeftMode', {leftMode});
    },
    setRightMode({commit}, rightMode) {
        commit('setRightMode', {rightMode});
    }
};

const store = {
    state, getters, mutations, actions
};

export default store;