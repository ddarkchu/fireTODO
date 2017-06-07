var admin = require("firebase-admin");
var serviceAccount = require("./config/adminKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://todo-47c04.firebaseio.com"
});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

// write log module
var wins = require('./log.js')
var logger = require('morgan');
// write log module //


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = require('./config.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// app.use(logger('dev'));

app.use(logger('combined', {
    stream: wins.stream
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace

app.use(function(err, req, res, next) {
    wins.error(err);
    var result = {
        message: err.message,
        error: ""
    };
    if (config && config.env === 'development') {
        result.error = err;
    }

    res.status(err.status || 500);
    res.render('error', result);
});

process.on('uncaughtException', function(err) {
    //죽기 방지용 루틴.
    wins.error(err);
});

module.exports = app;
