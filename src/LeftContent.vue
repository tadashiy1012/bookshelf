<template>
    <div :class="mode">
        <h2>add book</h2>
        <button>add</button>
        <h2>category</h2>
        <ul>
            <li><router-link to="/">all</router-link></li>
            <li><router-link to="/java">java</router-link></li>
            <li><router-link to="/php">php</router-link></li>
            <li><router-link to="/javascript">javascript</router-link></li>
            <li><router-link to="/swift">swift</router-link></li>
            <li><router-link to="/etc">etc</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    computed: {
        mode: function() {
            const mode = this.$store.getters.leftMode;
            if (mode) {
                return 'content';
            } else {
                return 'content-hide';
            }
        }
    }
}
</script>
<style scoped>
.content-hide {
    display: none;
}
</style>