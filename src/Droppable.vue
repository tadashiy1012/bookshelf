<template>
    <div class="droppable"
        v-on:dragstart="start"
        v-on:dragover="over"
        v-on:dragleave="leave"
        v-on:drop="drop"
    ><slot /></div>
</template>
<script>
let tgt = null;
export default {
    props: ['cellIndex'],
    methods: {
        start: function(ev) {
            tgt = ev.target;
            ev.dataTransfer.setData('tgt', tgt.innerHTML);
        },
        over: function(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        },
        leave: function(ev) {
            ev.preventDefault();
        },
        drop: function(ev) {
            ev.stopPropagation();
            tgt.innerHTML = ev.target.innerHTML;
            ev.target.innerHTML = ev.dataTransfer.getData('tgt');
            const cellIdx = this.cellIndex;
            const bookIdx = this.$children[0].$el.children[1].value;
            console.log(cellIdx, bookIdx);
        }
    }
}
</script>
<style>
.droppable {
    margin: 8px;
    border: solid 1px darkgray;
}
</style>
