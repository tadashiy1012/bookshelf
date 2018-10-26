<template>
    <div class="container">
        <h2>category:<span>{{category}}</span></h2>
        <button v-on:click="onToggleRight(false)">add book</button>
        <button v-on:click="onToggleRight(true)">remove book</button>
        <p>{{books.length}}</p>
        <drop-area :display="dropAreaDisplay" />
        <div class="bookContainer" v-on:dragstart="start" v-on:dragover="over" v-on:dragleave="leave">
            <template v-for="(book, idx) in books">
                <div :key="idx">
                    <div class="draggableContainer" draggable="true">
                        <img class="bookImg" :src="book.book" />
                        <input type="hidden" name="book" :value="JSON.stringify(book)" />
                    </div>
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
            dropAreaDisplay: ''
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
            if (this.$store.getters.rightMode && !this.$store.getters.rightFuncMode) {
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
        onToggleRight: function(funcMode) {
            this.$store.dispatch('setRightMode', true);
            this.$store.dispatch('setRightFuncMode', funcMode);
        },
        start: async function(ev) {
            let tgt = ev.target
            ev.dataTransfer.setData('tgtrm', tgt.querySelector('input').outerHTML);
        },
        over: function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        },
        leave: function(ev) {
            ev.preventDefault();
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
.draggableContainer > * {
    pointer-events: none;
}
.bookImg {
    border: solid 1px darkgray;
}
</style>
