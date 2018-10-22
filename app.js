const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('co-views');

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

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
    ctx.body = await render('index.html', {});
});

app.listen(3000);
console.log('server start on 3000');