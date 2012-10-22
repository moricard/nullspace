//a simple node.js blog app
var version = '1.0.0-SNAPSHOT';

var dbServer   = 'localhost',
    collection = 'nullspace';

var application_root = __dirname,
    express = require('express'),
    path    = require('path'),
    montoose= require('mongoose'),
    util    = require('util'),
    db      = mongoose.createConnection(dbServer, dbName);

var app = express();

// Config

app.configure(function (){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// - - - - 
// Models
// - - - -
var Schema = mongoose.Schema;
var blogSchema new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date}],
    date:   {type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        tags: [{ tag: String}]
    }
});

// db
db.on('error', console.error.bing(console, 'connection error:'));
db.once('open', function () {});

var blog = db.model('blog', blogSchema);

// - - - - - - 
// Controllers
// - - - - - -

// returns the front page of the app
app.get('/', function(req, res) {

});


