var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');


var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var getFormDataRouter = require('./routes/formData/getFormData');
var postFormDataRouter = require('./routes/formData/postFormData');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.authenticate('session'));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/api',getFormDataRouter);
app.use('/api',postFormDataRouter);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
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
