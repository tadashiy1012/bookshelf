<template>
    <div :class="mode">
        <h2>add book</h2>
        <div>
            <button id="inFile" v-on:click="onFile">chose file</button>
        </div>
        <h2>category</h2>
        <ul>
            <template v-for="(ctgr, idx) in categories">
                <li :key="idx">
                    <router-link :to="ctgr.name">{{ctgr.name}}</router-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
import {makeThumbnail} from './util.js';
export default {
    data: function() {
        return {
            sendBtnEnabled: true,
            formdata: null
        }
    },
    computed: {
        mode: function() {
            const mode = this.$store.getters.leftMode;
            if (mode) { return 'content'; } 
            else { return 'content-hide'; }
        },
        categories: function() {
            return this.$store.getters.categories;
        }
    },
    methods: {
        onFile: function() {
            const file = document.createElement('input');
            file.setAttribute('type', 'file');
            file.setAttribute('name', 'upload');
            file.setAttribute('accept', '.pdf');
            file.addEventListener('change', async (ev) => {
                try {
                    const book = await makeThumbnail(file.files[0]);
                    const fd = new FormData();
                    fd.append('book', book);
                    fd.append('upload', file.files[0]);
                    const option = {method: 'POST', body: fd};
                    const resp = await fetch('/books', option);
                    console.log(resp.status);
                } catch (err) {
                    console.log(err);
                }
            });
            file.click();
        }
    }
}
</script>
<style scoped>
.content-hide {
    display: none;
}
.addContainer {
    display: grid;
    grid-template-columns: 1fr;
}
</style>