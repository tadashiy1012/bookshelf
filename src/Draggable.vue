<template>
    <div draggable="true" class="draggable">
        <span><slot /></span>
        <input type="hidden" name="bookIndex" :value="itemIndex">
    </div>
</template>
<script>
export default {
    props: ['itemIndex']
}
</script>
<style scoped>
.draggable > span {
    pointer-events: none;
}
</style>
