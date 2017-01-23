const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  //logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index'),
  debug = require('debug')('myapp'),
  log = require('./common/logger_file'),
  // log = require('./common/bunyan_logger_config'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './public/images/a.ico'))); 
// app.use(logger('dev'));
log(app); // 日志
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  if(req.body) {
    // debug(req.body);
    // debug(Object.prototype.toString.call(req.body))
    Object.keys(req.body).forEach(key => req.body[key] = JSON.parse(req.body[key]));
    // debug(req.body);
    req.Body = req.body.Body;
    debug('req.Body', req.Body);
  }
  next();
});

routes(app); // 路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  debug(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
