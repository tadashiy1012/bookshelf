<template>
    <div>
        <h2>category:<span>{{category}}</span></h2>
        <p>{{books.length}}</p>
        <div class="bookContainer">
            <template v-for="(book, idx) in books">
                <Droppable :key="idx" :cell-index="idx">
                    <Draggable :item-index="book._id">
                        <img :src="book.book" />
                    </Draggable>
                </Droppable>
            </template>
        </div>
    </div>
</template>
<script>
import Draggable from './Draggable.vue';
import Droppable from './Droppable.vue';
export default {
    components: {
        Droppable, Draggable
    },
    computed: {
        category: function() {
            const path = this.$route.path;
            if (path === '/') {
                return 'all';
            } else {
                return path.substr(1, path.length);
            }
        },
        books: function() {
            const all = this.$store.getters.books;
            return all;
        }
    }
}
</script>
<style scoped>
.bookContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
}
.bookContainer > div {
    align-self: center;
    text-align: center;
}
.bookContainer > div > img {
    border: solid 1px dimgray;
}
</style>
