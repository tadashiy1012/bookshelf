<template>
    <div class="rootContainer">
        <header-content />
        <div class="container">
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
    }
}
</script>
<style scoped>
.rootContainer {
    width: 90%;
    margin: auto;
}
.container {
    display: grid;
    grid-template-columns: 200px 1fr 360px;
}
</style>
