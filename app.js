const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const asyncBusboy = require('async-busboy');
const views = require('co-views');
const Nedb = require('nedb');
const fs = require('fs');

const UPLOAD_DIR = 'upload';

function getUniqueStr(myStrong){
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

const db = {};
db.books = new Nedb({filename: 'booksfile'});
db.books.loadDatabase();

const get = (query) => {
    return new Promise((resolve, reject) => {
        db.books.find(query, (err, docs) => {
            if (err) { reject(err); }
            else { resolve(docs); }
        });
    }); 
};

const put = (doc) => {
    return new Promise((resolve, reject) => {
        db.books.insert(doc, (err, newDoc) => {
            if (err) { reject(err); }
            else { resolve(newDoc); }
        });
    });
};

const del = (query) => {
    return new Promise((resolve, reject) => {
        db.books.remove(query, {}, (err, result) => {
            if (err) { reject(err); }
            else { resolve(result); }
        });
    });
};

const app = new Koa();
const router = new Router();
const render = views(__dirname + '/views', {map:{html: 'swig'}});

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
  
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(serve(__dirname + '/public'));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
    ctx.body = await render('index.html', {});
});

router.get('/books', async (ctx) => {
    let result = 'ng';
    try {
        const books = await get({});
        result = JSON.stringify(books);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.get('/books/:id', async (ctx) => {
    let result = 'ng';
    console.log(ctx.params);
    const id = ctx.params.id;
    try {
        const book = await get({_id: id});
        result = JSON.stringify(book);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.post('/books', async (ctx) => {
    let result = 'ng';
    try {
        const {files, fields} = await asyncBusboy(ctx.req);
        const fileName = getUniqueStr() + '.pdf';
        const writer = fs.createWriteStream(UPLOAD_DIR + '/' + fileName);
        writer.on('finish', () => { console.log('file save ok!'); });
        files[0].pipe(writer);
        const category = fields.category;
        const resp = await put({book: fields.book, file: fileName, category: category});
        console.log(resp);
        result = JSON.stringify(resp);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.delete('/books/:id', async (ctx) => {
    let result = 'ng';
    console.log(ctx.params);
    const id = ctx.params.id;
    try {
        const resp = await del({_id: id});
        console.log(resp);
        result = 'ok';
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

app.listen(3000);
console.log('server start on 3000');