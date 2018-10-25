const state = {
    books: [],
    categories: [],
    leftMode: true,
    rightMode: true,
};

const getters = {
    books: state => state.books,
    categories: state => state.categories.map(elm => elm),
    leftMode: state => state.leftMode,
    rightMode: state => state.rightMode,
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
};

const actions = {
    addBook({commit}, book) {
        commit('addBook', {book});
    },
    setCategory({commit}, categories) {
        commit('setCategory', {categories});
    },
    pushCategory({state}) {
        state.categories.filter(elm => elm.name !== 'all').forEach(async (elm) => {
            console.log(elm);
            try {
                const fd = new FormData();
                fd.append('books', JSON.stringify(elm.books));
                const option = {method: 'PATCH', body: fd};
                const resp = await fetch('/categories/' + elm._id, option);
                console.log(resp.status);
            } catch (err) {
                console.log(err);
            }
        });
    },
    setLeftMode({commit}, leftMode) {
        commit('setLeftMode', {leftMode});
    },
    setRightMode({commit}, rightMode) {
        commit('setRightMode', {rightMode});
    },
};

const store = {
    state, getters, mutations, actions
};

export default store;