<template>
    <div class="container">
        <h2>category:<span>{{category}}</span></h2>
        <button v-on:click="onToggleRight">add book</button>
        <p>{{books.length}}</p>
        <div :class="'dropArea ' + dropAreaDisplay"
            :style="'width:' + dropAreaSize[0] + 'px;height:' + dropAreaSize[1] + 'px;'"
            v-on:dragover="over" v-on:dragleave="leave" v-on:drop="drop">
            <p><span>drop here</span></p>
        </div>
        <div class="bookContainer">
            <template v-for="(book, idx) in books">
                <div :key="idx">
                    <img class="bookImg" :src="book.book" draggable="true" />
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            dropAreaDisplay: '',
            dropAreaSize: [],
            dropAreaObserver: null
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
    methods: {
        over: function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        },
        leave: function(ev) {
            ev.preventDefault();
        },
        drop: function(ev) {
            ev.stopPropagation();
            const data = ev.dataTransfer.getData('tgt');
            console.log(data);
        },
        onToggleRight: function() {
            const current = this.$store.getters.rightMode;
            this.$store.dispatch('setRightMode', !current);
        }
    },
    created: function() {
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(({target, contentRect}) => {
                const w = parseInt(contentRect.width);
                const h = parseInt(contentRect.height) + 20;
                this.dropAreaSize = [w, h];
            })
        });
        this.dropAreaObserver = resizeObserver;
    },
    mounted: function() {
        if (this.$el !== void 0) { 
            console.log('el found!');
            const container = this.$el.querySelector('.bookContainer');
            this.dropAreaObserver.observe(container);
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
.dropArea {
    border: dashed 2px dimgray;
    opacity: 0.5;
    position: absolute;
    background-color: aquamarine;
}
.dropArea > p {
    text-align: center;
    font-size: 32px;
    font-weight: bolder;
}
.dropArea-hide {
    display: none;
}
</style>
