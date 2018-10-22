<template>
    <div class="rootContainer">
        <header-content />
        <div :class="mode">
            <left-content />
            <center-content />
            <right-content />
        </div>
    </div>
</template>
<script>
import {
    LeftContent, RightContent, CenterContent, HeaderContent
} from './index.js';
export default {
    components: {
        LeftContent,
        RightContent,
        CenterContent,
        HeaderContent
    },
    computed: {
        mode: function() {
            const currentL = this.$store.getters.leftMode;
            const currentR = this.$store.getters.rightMode;
            if (currentL && currentR) {
                return 'content-full';
            } else if (currentL && !currentR) {
                return 'content-left';
            } else if (!currentL && currentR) {
                return 'content-right';
            } else {
                return 'content-center';
            }
        }
    }
}
</script>
<style scoped>
.rootContainer {
    width: 90%;
    margin: auto;
}
.content-full {
    display: grid;
    grid-template-columns: 200px 1fr 360px;
}
.content-left {
    display: grid;
    grid-template-columns: 200px 1fr;
}
.content-right {
    display: grid;
    grid-template-columns: 1fr 360px;
}
.content-center {
    display: block;
}
</style>
