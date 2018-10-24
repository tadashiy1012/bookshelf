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
db.category = new Nedb({filename: 'categoryfile'});
db.category.loadDatabase();
const BOOKS = 'books';
const CATEGORY = 'category';

const get = (table, query) => {
    return new Promise((resolve, reject) => {
        db[table].find(query, (err, docs) => {
            if (err) { reject(err); }
            else { resolve(docs); }
        });
    }); 
};

const put = (table, doc) => {
    return new Promise((resolve, reject) => {
        db[table].insert(doc, (err, newDoc) => {
            if (err) { reject(err); }
            else { resolve(newDoc); }
        });
    });
};

const set = (table, query, doc) => {
    return new Promise((resolve, reject) => {
        db[table].update(query, {$set: doc}, {}, (err, result) => {
            if (err) { reject(err); }
            else { resolve(result); }
        });
    });
}

const del = (table, query) => {
    return new Promise((resolve, reject) => {
        db[table].remove(query, {}, (err, result) => {
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
        const books = await get(BOOKS, {});
        result = JSON.stringify(books);
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
        const resp = await put(BOOKS, {book: fields.book, file: fileName});
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
        const resp = await del(BOOKS, {_id: id});
        console.log(resp);
        result = 'ok';
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.get('/categories', async (ctx) => {
    let result = 'ng';
    try {
        const resp = await get(CATEGORY, {});
        result = JSON.stringify(resp);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.post('/categories', async (ctx) => {
    let result = 'ng';
    try {
        console.log(ctx.request.body);
        const name = ctx.request.body.name;
        const exist = await get(CATEGORY, {name});
        if (exist.length > 0) { throw new Error('category name exist'); }
        const resp = await put(CATEGORY, {name, books: []});
        result = JSON.stringify(resp);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

router.patch('/categories/:id', async (ctx) => {
    let result = 'ng';
    try {
        console.log(ctx.params);
        console.log(ctx.request.body);
        const id = ctx.params.id;
        const books = ctx.request.body.books;
        const resp = await set(CATEGORY, {_id: id}, {books});
        result = JSON.stringify(resp);
    } catch (err) {
        console.log(err);
    }
    ctx.body = result;
});

app.listen(3000);
console.log('server start on 3000');