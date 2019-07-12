var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PCPartsDB' , { useNewUrlParser: true });

var ItemDB = require('../models/itemDB');
var currentUser = require('../routes/profileController');
var session = require('express-session');

/**
 * This the category controller.
 */


// display categories and data to the user
router.get('/', function(req, res) {
  // displays if user is signed in or not. Obtained from designs/user-navigation
  if(req.session.currentUser){
    res.locals.userName = req.session.currentUser[0].firstName;
  } else {
    res.locals.userName = undefined;
  }
    ItemDB.find()
      .then(function(doc){
        res.render('categories', {list: doc});
      });
  });

// display a specific item from user request
router.get('/item', function(req, res){
  // displays if user is signed in or not. Obtained from designs/user-navigation
  if(req.session.currentUser){
    res.locals.userName = req.session.currentUser[0].firstName;
  } else {
    res.locals.userName = undefined;
  }

  // check for req.query and validate it's position within the database
  ItemDB.countDocuments({}, function (err, count) {
    if(Object.values(req.query)[0] >= 0 && Object.values(req.query)[0] <=count) {
      var userCode = Object.values(req.query)[0];
      ItemDB.find({itemCode: userCode})
        .then(function(doc){
          var item = doc[0];
          res.render('item', {item: item})
        });
    } else {
      ItemDB.find()
        .then(function(doc){
          res.render('categories', {list: doc});
        });
    }
  });

});

module.exports = router;
