
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

/**
 * Environment variables
 */

var dbServer   = 'localhost',
    collection = 'nullspace'; 

var db  = mongoose.createConnection(dbServer, collection);
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Models
 */
var notComment = new mongoose.Schema({
    author: String,
    body: String,
    date: {type: Date, default: Date.now},
    hidden: Boolean
});
var notLog = new mongoose.Schema({
    title: String,
    author: String,
    body:   String,
    comments: [notComment],
    hidden: Boolean,
    meta: {
        votes: Number,
        tags: [{ tag: String }]
    }
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
