<template>
    <div :class="mode">
        <h2>add book</h2>
        <div class="addContainer">
            <div>
                <select name="category" id="inCtgr">
                    <option value="java">java</option>
                    <option value="php">php</option>
                    <option value="javascript">javascript</option>
                    <option value="swift">swift</option>
                    <option value="etc">etc</option>
                </select>
            </div>
            <div><button id="inFile" v-on:click="onFile">chose file</button></div>
            <div><span id="fileName">no file</span></div>
            <div><button id="sendBtn" :disabled="sendBtnEnabled" v-on:click="onSend">send</button></div>
        </div>
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
import pdfjs from 'pdfjs-dist';
const makeThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.addEventListener('load', (ev) => {
            const buf = ev.target.result;
            (async () => {
                const pdf = await pdfjs.getDocument(new Uint8Array(buf));
                const page = await pdf.getPage(1);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const viewport = page.getViewport(0.3);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const result = await page.render({
                    canvasContext: ctx,
                    viewport: viewport
                });
                const url = canvas.toDataURL('image/png');
                resolve(url);
            })();
        });
        fr.readAsArrayBuffer(file);
    });
};
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
            if (mode) {
                return 'content';
            } else {
                return 'content-hide';
            }
        }
    },
    methods: {
        onFile: function() {
            const lbl = document.querySelector('span#fileName');
            const file = document.createElement('input');
            file.setAttribute('type', 'file');
            file.setAttribute('name', 'upload');
            file.setAttribute('accept', '.pdf');
            file.addEventListener('change', async (ev) => {
                this.sendBtnEnabled = false;
                lbl.textContent = file.files[0].name;
                const book = await makeThumbnail(file.files[0]);
                const fd = new FormData();
                fd.append('book', book);
                fd.append('upload', file.files[0]);
                this.formdata = fd;
            });
            file.click();
        },
        onSend: async function() {
            const ctgr = document.querySelector('select#inCtgr');
            this.formdata.append('category', ctgr.value);
            try {
                const option = {method: 'POST', body: this.formdata};
                const resp = await fetch('/books', option);
                console.log(resp.status);
            } catch (err) {
                console.log(err);
            }
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
span#fileName {
    font-size: 11px;
}
</style>