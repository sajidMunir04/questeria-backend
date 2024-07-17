var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ['http://localhost:5173/'], // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization','Origin', 'Accept'], // Allowed headers
  credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
};

app.use(cors(corsOptions));

// view engine setup
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));


// Add middleware should go here

app.use(session({
  secret: 'zasdXkjaskdSADJal',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.get('/auth',
  passport.authenticate('session'),
  function(req, res, next) {
    
});

//

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var getFormDataRouter = require('./routes/formData/getFormData');
var postFormDataRouter = require('./routes/formData/postFormData');


app.get('/',(req,res,next) => {
  res.send("Hi, you are on homepage");
})

app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/api',getFormDataRouter);
app.use('/api',postFormDataRouter);

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
