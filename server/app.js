var createError = require('http-errors');
var express = require('express');//nodejs的框架
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//日志组件

var indexRouter = require('./routes/index');//引入路由
var usersRouter = require('./routes/users');//引入路由
var goods = require('./routes/goods');//引入路由

var ejs = require('ejs');//模板引擎
var app = express();//使用express

// view engine setup
app.set('views', path.join(__dirname, 'views'));//前端可视目录
app.engine('.html',ejs.__express);//模板引擎，前端文件后缀
app.set('view engine', 'html');//html模板，可换

app.use(logger('dev'));//日志操作
app.use(express.json());//通过json数据传输到前端
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));//静态资源目录

//载入路由的前进行是否登录校验
app.use(function (req,res,next) {
  if(req.cookies.userId){
    next();
  }else{
    if(req.originalUrl == '/users/register'||req.originalUrl == '/users/login'||req.originalUrl == '/users/logout'||req.originalUrl.indexOf('/goods/list')>-1){
      next();
    }else{
      res.json({
        status:'10001',
        msg:'当前未登录',
        result:''
      });
    }
  }
});

app.use('/', indexRouter);//访问/跳index路由
app.use('/users', usersRouter);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
