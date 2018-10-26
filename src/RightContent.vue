<template>
    <div :class="displayMode">
        <h2>right</h2>
        <button v-on:click="onClose">close</button>
        <p>{{books.length}}</p>
        <rm-drop-area :display="dropAreaDisplay" />
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
import RmDropArea from './RmDropArea.vue';
export default {
    props: ['mode'],
    data: function() {
        return {
            dropAreaDisplay: ''
        };
    },
    computed: {
        displayMode: function() {
            console.log(this.mode);
            if (this.mode) {
                this.dropAreaDisplay = '';
            } else {
                this.dropAreaDisplay = 'dropArea-hide';
            }
            const display = this.$store.getters.rightMode;
            if (display) { return 'content'; } 
            else { return 'content-hide'; }
            
        },
        books: function() {
            const all = this.$store.getters.books;
            const ctgrs = this.$store.getters.categories;
            const path = this.$route.path.substr(1);
            const ctgr = ctgrs.find(elm => elm.name === path);
            let books = all;
            if (ctgr === void 0) { return []; }
            ctgr.books.forEach(bookId => {
                books = books.filter(elm => elm._id !== bookId);
            });
            return books;
        }
    },
    components: {
        RmDropArea
    },
    methods: {
        onClose: function() {
            this.$store.dispatch('setRightMode', false);
        },
        start: async function(ev) {
            let tgt = ev.target
            ev.dataTransfer.setData('tgt', tgt.querySelector('input').outerHTML);
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
.content-hide {
    display: none;
}
.bookContainer {
    display: grid;
    grid-template-columns: 1fr;
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
    border: solid 1px dimgray;
}
</style>
