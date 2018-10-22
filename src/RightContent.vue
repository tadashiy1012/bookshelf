<template>
    <div :class="mode">
        <h2>right</h2>
        <button v-on:click="onClose">close</button>
    </div>
</template>
<script>
export default {
    computed: {
        mode: function() {
            const mode = this.$store.getters.rightMode;
            if (mode) {
                return 'content';
            } else {
                return 'content-hide';
            }
        }
    },
    methods: {
        onClose: function() {
            this.$store.dispatch('setRightMode', false);
        }
    }
}
</script>
<style scoped>
.content-hide {
    display: none;
}
</style>
