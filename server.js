var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Added
var passport = require('passport'); // Added
var methodOverride = require('method-override'); // Added

require('dotenv').config(); // Added
require('./config/database'); // Added
require('./config/passport'); // Added

var homeRouter = require('./routes/home');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playlistsRouter = require('./routes/playlists');
var reviewsRouter = require('./routes/reviews');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Added

// Session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available within every EJS template
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

const isLoggedIn = require('./config/auth');

app.use('/home', homeRouter);
app.use('/', indexRouter);
app.use('/playlists', playlistsRouter);
app.use('/users', usersRouter);
// Mounting (look into it)
app.use('/', reviewsRouter);

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
