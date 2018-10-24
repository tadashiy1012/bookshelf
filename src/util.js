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

export {
    makeThumbnail
};