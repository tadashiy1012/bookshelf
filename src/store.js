const state = {
    books: [],
    indexs: [],
    lastIndex: -1,
    leftMode: true,
    rightMode: true
};

const getters = {
    books: state => state.books,
    indexs: state => state.indexs,
    lastIndex: state => state.lastIndex,
    leftMode: state => state.leftMode,
    rightMode: state => state.rightMode
};

const mutations = {
    addBook(state, payload) {
        state.books = [...state.books, payload.book];
    },
    setIndexs(state, payload) {
        state.indexs = payload.indexs;
    },
    setLastIndex(state, payload) {
        state.lastIndex = payload.lastIndex;
    },
    setLeftMode(state, payload) {
        state.leftMode = payload.leftMode;
    },
    setRightMode(state, payload) {
        state.rightMode = payload.rightMode;
    }
};

const actions = {
    addBook({commit, state}, book) {
        commit('addBook', {book});
        commit('setLastIndex', {
            lastIndex: state.books.lastIndexOf(book)
        });
    },
    setIndexs({commit}, indexs) {
        commit('setIndexs', {indexs});
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