<template>
    <div :class="'dropArea ' + display"
        :style="'width:' + dropAreaSize[0] + 'px;height:' + dropAreaSize[1] + 'px;'"
        v-on:dragover="over" v-on:dragleave="leave" v-on:drop="drop">
        <p><span>drop here</span></p>
    </div>
</template>
<script>
export default {
    props: ['display'],
    data: function() {
        return {
            dropAreaSize: [],
            dropAreaObserver: null
        };
    },
    methods: {
        over: function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        },
        leave: function(ev) {
            ev.preventDefault();
        },
        drop: async function(ev) {
            ev.stopPropagation();
            const data = ev.dataTransfer.getData('tgt');
            const div = document.createElement('div');
            div.innerHTML = data;
            const input = div.querySelector('input');
            const json = JSON.parse(input.value);
            const ctgrs = this.$store.getters.categories;
            const path = this.$route.path.substr(1);
            const ctgr = ctgrs.find(elm => elm.name === path);
            const books = ctgr.books;
            ctgr.books = [...ctgr.books, json._id];
            await this.$store.dispatch('setCategory', ctgrs);
            await this.$store.dispatch('pushCategory');
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
            const container = this.$el.parentNode.querySelector('.bookContainer');
            this.dropAreaObserver.observe(container);
        }
    }
}
</script>
<style scoped>
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
