<template>
    <div>
        <h2>category:<span>{{path}}</span></h2>
    </div>
</template>
<script>
export default {
    computed: {
        path: function() {
            const path = this.$route.path;
            if (path === '/') {
                return 'all';
            } else {
                return path.substr(1, path.length);
            }
        }
    }
}
</script>
