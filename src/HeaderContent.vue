<template>
    <div class="content">
        <h1>bookshelf</h1>
        <div>
            <button>toggle left</button>
            <button>toggle right</button>
        </div>
    </div>
</template>
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
