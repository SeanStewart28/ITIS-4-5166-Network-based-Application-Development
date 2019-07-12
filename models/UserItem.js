var Item = require('../models/Item');

/**
 * Creates UserItem
 * @param {*} _userID
 * @param {*} _item
 * @param {*} _category
 * @param {*} _rating
 * @param {*} _madeIt
 */
class UserItem {
  constructor(userID, item, category, rating, madeIt){
    this._userID = userID,
    this._item = item;
    this._category = category;
    this._rating = rating;
    this._madeIt = madeIt;
  }

  // Getters and Setters
  get item() {
    return this._item;
  }

  set item(newItem) {
    this._item = newItem;
  }

  get category() {
    return this._category;
  }

  set category(newCategory){
    this._category = newCategory
  }

  get rating() {
    return this._rating;
  }

  set rating(newRating){
    this._rating = newRating;
  }

  get madeIt() {
    return this._madeIt;
  }

  set madeIt(newMadeIt){
    this._madeIt = newMadeIt;
  }
}

module.exports = UserItem;
