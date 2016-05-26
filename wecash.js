var Koa = require('koa')
var Router = require('koa-router')
var body = require('koa-bodyparser')
var logger = require('koa-logger')
var Task = require('shell-task')

const app = new Koa()

app.use(body())
app.use(logger())

const router = new Router()

router
.get('/', function *(next) {
  this.body = 'Hello Koa'
})
.get('/wecash', function *(next) {
  this.body = 'This is wecash'
  process.chdir('/home/lxxyx/Desktop/wecash')
  new Task('pm2 stop run.js')
  .then('git pull')
  .then('pm2 start run.js')
  .run((err, next) => {
    if (err) {
      console.log(err)
    }
  })
  
})

app.use(router.routes())

app.listen(12315)
