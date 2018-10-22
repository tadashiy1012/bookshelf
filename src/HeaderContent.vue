<template>
    <div class="content">
        <h1>bookshelf</h1>
        <div>
            <button v-on:click="onToggleLeft">toggle left</button>
            <button v-on:click="onToggleRight">toggle right</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        onToggleLeft: function() {
            const current = this.$store.getters.leftMode;
            this.$store.dispatch('setLeftMode', !current);
        },
        onToggleRight: function() {
            const current = this.$store.getters.rightMode;
            this.$store.dispatch('setRightMode', !current);
        }
    }
}
</script>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 230px 1fr;
}
.content > * {
    align-self: center;
}
h1 {
    margin: 4px 0px;
}
</style>
