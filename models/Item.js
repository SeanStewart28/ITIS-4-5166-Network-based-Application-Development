/**
 * Creates Item
 * @param {*} _itemCode
 * @param {*} _itemName
 * @param {*} _catalogCategory
 * @param {*} _description
 * @param {*} _rating
 * @param {*} _imageURL
 */
class Item {
  constructor(itemCode, itemName, catalogCategory, description, rating, imageURL){
    this._itemCode = itemCode;
    this._itemName = itemName;
    this._catalogCategory = catalogCategory;
    this._description = description;
    this._rating = rating;
    this._imageURL = imageURL;
  }

  // Getters and Setters
  get itemCode() {
    return this._itemCode;
  }

  set itemCode(value) {
    this._itemCode = value;
  }

  get itemName() {
    return this._itemName;
  }

  set itemName(value) {
    this._itemName = value;
  }

  get catalogCategory() {
    return this._catalogCategory;
  }

  set catalogCategory(value) {
    this._catalogCategory = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
  }

  get imageURL() {
    return this._imageURL;
  }

  set imageURL(value) {
    this._imageURL = value;
  }

  getImageURL(itemCode) {
    var db = require('../models/itemDB');
    var item = db.getItem(itemCode);
    var finalURL = '../assets/' + item.imageURL;
    return finalURL;
  }

};

module.exports = Item;
