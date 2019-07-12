var Item = require('../models/Item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PCPartsDB');
var Schema = mongoose.Schema;

/**
 * itemDB Schema
 */

var itemdbSchema = new Schema({
  userID: {type: String, required: true},
  itemCode: {type: String, required: true},
  itemName: {type: String, required: true},
  catalogCategory: {type: String, required: true},
  description: {type: String, required: true},
  rating: {type: String, required: true},
  madeIt: {type: String, required: true},
  imageURL: {type: String, required: true},
},{collection: 'Item'});

module.exports = mongoose.model('Item', itemdbSchema);
