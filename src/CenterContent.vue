<template>
    <div class="container">
        <h2>category:<span>{{category}}</span></h2>
        <button v-on:click="onToggleRight">add book</button>
        <p>{{books.length}}</p>
        <drop-area :display="dropAreaDisplay" />
        <div class="bookContainer">
            <template v-for="(book, idx) in books">
                <div :key="idx">
                    <img class="bookImg" :src="book.book" />
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import DropArea from './DropArea.vue';
export default {
    data: function() {
        return {
            dropAreaDisplay: '',
        };
    },
    computed: {
        category: function() {
            const path = this.$route.path;
            if (path === '/') {
                return 'all';
            } else {
                return path.substr(1);
            }
        },
        books: function() {
            if (this.$store.getters.rightMode) {
                this.dropAreaDisplay = '';
            } else {
                this.dropAreaDisplay = 'dropArea-hide';
            }
            const all = this.$store.getters.books;
            const ctgrs = this.$store.getters.categories;
            const path = this.$route.path.substr(1);
            const ctgr = ctgrs.find(elm => elm.name === path);
            if (path === '' || ctgr === void 0) {
                return all;
            } else {
                let books = [];
                ctgr.books.forEach(bookId => {
                    books = [...books, all.find(elm => elm._id === bookId)];
                });
                return books;
            }
        }
    },
    components: { DropArea },
    methods: {
        onToggleRight: function() {
            const current = this.$store.getters.rightMode;
            this.$store.dispatch('setRightMode', !current);
        }
    }
}
</script>
<style scoped>
.container {
    margin: 0px 12px;
}
.bookContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    padding: 18px 0px;
}
.bookContainer > div {
    align-self: center;
    text-align: center;
}
.bookImg {
    border: solid 1px darkgray;
}
</style>
