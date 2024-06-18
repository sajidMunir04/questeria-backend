var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getFormDataRouter = require('./routes/formData/getFormData');
var postFormDataRouter = require('./routes/formData/postFormData');

var app = express();

const corsOptions = {
  origin: `'*'`, // Allow a specific origin
  methods: ['GET', 'POST'],     // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow only headers with Content-Type
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/getFormData',getFormDataRouter);
app.use('/api/postFormData',postFormDataRouter)

const PORT = process.env.PORT || 3000;

app.listen(3000,() => {
  console.log(`Listening on ${PORT}`);
})


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
