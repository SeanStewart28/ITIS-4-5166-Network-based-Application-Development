var User = require('../models/User');
var UserItem = require('../models/UserItem');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PCPartsDB');
var Schema = mongoose.Schema;

/**
 * UserDB Schema
 */

var userdbSchema = new Schema({
  userID: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
},{collection: 'User'});

module.exports = mongoose.model('User', userdbSchema);
