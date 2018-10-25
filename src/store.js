const state = {
    books: [],
    categories: [],
    leftMode: true,
    rightMode: true,
    dndTarget: null
};

const getters = {
    books: state => state.books,
    categories: state => state.categories,
    leftMode: state => state.leftMode,
    rightMode: state => state.rightMode,
    dndTarget: state => state.dndTarget
};

const mutations = {
    addBook(state, payload) {
        state.books = [...state.books, payload.book];
    },
    setCategory(state, payload) {
        state.categories = payload.categories;
    },
    setLeftMode(state, payload) {
        state.leftMode = payload.leftMode;
    },
    setRightMode(state, payload) {
        state.rightMode = payload.rightMode;
    },
    setDndTarget(state, payload) {
        state.dndTarget = payload.dndTarget;
    }
};

const actions = {
    addBook({commit}, book) {
        commit('addBook', {book});
    },
    setCategory({commit}, categories) {
        commit('setCategory', {categories});
    },
    setLeftMode({commit}, leftMode) {
        commit('setLeftMode', {leftMode});
    },
    setRightMode({commit}, rightMode) {
        commit('setRightMode', {rightMode});
    },
    setDndTarget({commit}, dndTarget) {
        commit('setDndTarget', {dndTarget});
    }
};

const store = {
    state, getters, mutations, actions
};

export default store;