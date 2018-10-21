var app = require('koa')();
var router = require('koa-frouter');
var bodyparser = require('koa-bodyparser');
var static = require('koa-static');
var cors = require('koa-cors');
app.use(cors());
app.use(static('static'));

app.use(bodyparser());
app.use(router(app,'routers'));

app.listen(8000,function(){
  console.log('Server listening on:',8000);
})