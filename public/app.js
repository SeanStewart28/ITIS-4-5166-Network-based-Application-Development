var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var categoryC = require('../routes/categoryController');
var profileController = require('../routes/profileController');

app.set('view engine', 'ejs');
app.set('views', '../views');

// middleware
app.use(express.static(__dirname + '/../assets'));
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));

/**
 * The main controller
 */

app.get('/', function(req, res){
  res.render('index');
});

app.get('/index', function(req, res){
  res.render('index');
});

app.get('/item', function(req, res){
  res.render('item');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/register', function(req,res){
  res.render('register');
});

app.use('/categories', categoryC);
app.use('/myParts', profileController);


app.listen(3000);
