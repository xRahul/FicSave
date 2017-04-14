const Koa = require('koa');
const KoaSocket = require('koa-socket');

const app = new Koa();
const io = new KoaSocket();

io.attach(app);
io.on('join', (ctx, data) => {
  console.log('join event fired', data);
});

app.listen(process.env.PORT || 3000);
