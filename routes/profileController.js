var express = require('express');
var expressValidator = require('express-validator');
var router = module.exports = express();
var router = express.Router();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PCPartsDB');
var UserProfile = require('../models/UserProfile');
var UserItem = require('../models/UserItem');
var Item = require('../models/Item');
var ItemDB = require('../models/itemDB');
var UserDB = require('../models/UserDB');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.urlencoded({ extended: false}));
router.use(expressValidator());
var exportCurrentUser;

/**
 * This the profile controller.
 */

router.use(session({
  key: 'a_id',
  secret: 'work pls'
}));

// Login Route
router.get('/login', function(req, res){
  res.locals.err = false;
  res.render('login');
});

// Sends registation information to database to store
// Requires a username, password, firstname, lastname, and email
// Sha512 Hashing algorithm used
router.post('/register', urlencodedParser, function(req, res) {
  UserDB.create({
    userID: Math.round(Math.random()*100),
    username: req.body.username,
    password: sha512(req.body.password, SALT),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
    }).then(()=>{})
    console.log("*** User created ***");
  res.redirect('login');
});

/**
 * POST '/'
 * Validation check for user sign in
 * @param {} req
 * @param {*} res
 */
router.post('/', urlencodedParser, function(req, res){
  // Check for duplicate/active session
  console.log('req.body');
  console.log(req.body);

  if(req.session.currentUser){
    res.locals.userName = req.session.currentUser[0].firstName;
    UserDB.find({userID:'1'})
      .then(function(user){
        ItemDB.find({userID: user[0].userID})
          .then(function(userItemList){
            res.render('myItems', {userItemList: userItemList});
          })
      })

    } else {
      UserDB.find({userID:'1'})
        .then(function(user){
          // Validation check upon sign in
          req.check('username').not().isEmpty().equals(user[0].username);
          req.check('password').not().isEmpty().equals(user[0].password);

          var errors = req.validationErrors();

          console.log(errors);

          if(errors === false){
            // Checks for an active session
            req.session.currentUser = user;
            res.locals.userName = req.session.currentUser[0].firstName;
            currentUser = req.session.currentUser[0];
            ItemDB.find({userID: currentUser.userID})
              .then(function(userItemList){
                res.render('myitems', {userItemList: userItemList});
              })
          } else {
              res.locals.err = true;
              res.render('login');
          }
        });
  }
});

/**
 * Grabs the POST '/'
 * Get the user information after sign in
 * saves the input from user to their myItems page
 * @param {} req
 * @param {*} res
 */
router.get('/', function(req, res){
  // Checks for an active session
  if(req.session.currentUser){
    res.locals.userName = req.session.currentUser[0].firstName;
    UserDB.find({userID:'1'})
      .then(function(user){
        ItemDB.find({userID: user[0].userID})
          .then(function(userItemList){
            res.render('myItems', {userItemList: userItemList});
          })
      })

    } else {
      res.locals.err = false;
      res.render('login');
  }
});

/**
 * Save
 * requests validation for the user profile
 * saves the input from user to their myItems page
 * @param {} req
 * @param {*} res
 */
router.post('/save', urlencodedParser, function(req, res){
  req.check('itemName').notEmpty();
  req.check('category').notEmpty();
  req.check('description').notEmpty();
  req.check('rating').isInt({ gt: -1, lt: 6})
  req.check('madeIt').notEmpty();
  req.check('imageURL').notEmpty();

  // validation check
  var errors = req.validationErrors();

  if(errors != false){
    res.send("*** Invalid validation ***");
  } else {
    // Checks for an active session
    if(req.session.currentUser){
      var currentUser = req.session.currentUser[0];
      res.locals.userName = req.session.currentUser[0].firstName;

      ItemDB.findOneAndUpdate({itemCode: req.body.itemCode}, {$set:{userID:currentUser.userID}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("ERROR: ******");
        }
        ItemDB.find({userID: currentUser.userID})
          .then(function(userItemList){
            res.render('myitems', {userItemList: userItemList});
          })
      });
    } else {
      res.locals.err = false;
      res.render('login');
    }
  }

});

/**
 * Update User Profile
 * requests validation for the user profile
 * will update profile, based on items within their cart
 * @param {} req
 * @param {*} res
 */
router.post('/updateProfile', urlencodedParser, function(req, res){
  req.check('itemName').notEmpty();
  req.check('category').notEmpty();
  req.check('description').notEmpty();
  req.check('rating').isInt({ gt: -1, lt: 6})
  req.check('madeIt').notEmpty();
  req.check('imageURL').notEmpty();

  // validation check
  var errors = req.validationErrors();

  if(errors != false) {
    res.send("*** Invalid validation ***");
  } else {
    res.locals.userName = req.session.currentUser[0].firstName;
    ItemDB.find({itemCode: req.body.itemCode})
      .then(function(item){
        res.render('feedback', {theItem: item[0]});
      })
  }
});

/**
 * Update Item Rating
 * requests validation for the user profile
 * will update the rating of the item
 * @param {} req
 * @param {*} res
 */
router.post('/updateRating', urlencodedParser, function(req, res){
  req.check('itemName').notEmpty();
  req.check('category').notEmpty();
  req.check('description').notEmpty();
  req.check('rating').isInt({ gt: -1, lt: 6})
  req.check('madeIt').notEmpty();
  req.check('imageURL').notEmpty();

  // validation check
  var errors = req.validationErrors();

  if(errors != false) {
    res.send("*** Invalid validation ***");
  } else {
    var currentUser = req.session.currentUser[0];
    res.locals.userName = req.session.currentUser[0].firstName;
    ItemDB.findOneAndUpdate({itemCode: req.body.itemCode}, {$set:{rating:req.body.rating}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("ERROR: ******");
      }
      ItemDB.find({userID: currentUser.userID})
        .then(function(userItemList){
          res.render('myitems', {userItemList: userItemList});
        })
    });
  }

});

/**
 * Update Item madeIt
 * requests validation for the user profile
 * will update the status of the item
 * @param {} req
 * @param {*} res
 */
router.post('/updateFlag', urlencodedParser, function(req, res){
  req.check('itemName').notEmpty();
  req.check('category').notEmpty();
  req.check('description').notEmpty();
  req.check('rating').isInt({ gt: -1, lt: 6})
  req.check('madeIt').notEmpty();
  req.check('imageURL').notEmpty();

  // validation check
  var errors = req.validationErrors();

  if(errors != false) {
    res.send("*** Invalid validation ***");
  } else {
    var currentUser = req.session.currentUser[0];
    res.locals.userName = req.session.currentUser[0].firstName;
    ItemDB.findOneAndUpdate({itemCode: req.body.itemCode}, {$set:{madeIt:req.body.madeIt}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      ItemDB.find({userID: currentUser.userID})
        .then(function(userItemList){
          res.render('myitems', {userItemList: userItemList});
        })
    });
  }

});

/**
 * Delete Item
 * requests validation for the user profile
 * will remove the item
 * @param {} req
 * @param {*} res
 */
router.post('/deleteItem', urlencodedParser, function(req, res){
  req.check('itemName').notEmpty();
  req.check('category').notEmpty();
  req.check('description').notEmpty();
  req.check('rating').isInt({ gt: -1, lt: 6})
  req.check('madeIt').notEmpty();
  req.check('imageURL').notEmpty();

  // validation check
  var errors = req.validationErrors();

  if(errors != false) {
    res.send("*** Invalid validation ***");
  } else {
    var currentUser = req.session.currentUser[0];
    res.locals.userName = req.session.currentUser[0].firstName;
    ItemDB.findOneAndUpdate({itemCode: req.body.itemCode}, {$set:{userID:'null', rating:'1', madeIt:'false'}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("ERROR: ******");
      }
      ItemDB.find({userID: currentUser.userID})
        .then(function(userItemList){
          res.render('myitems', {userItemList: userItemList});
        })
    });
  }

});

/**
 * signout
 * method used to destroy user cookies and log out
 * redirects user to index when signed out
 * @param {} req
 * @param {*} res
 */
router.post('/signout', function(req, res){
  if(req.session.currentUser){
        req.session.destroy();
        res.locals.userName = undefined;
        res.render('index');
  } else {
    res.render('index');
  }
});

var SALT = 'TF13TUY9MPDN';
/** Hashing algorithm sha512 */
var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};

module.exports = router;
