var userItemModel = require('../models/UserItem');
var UserItem = require('../models/UserItem');
var userDB = require('../models/UserDB');
var itemDB = require('../models/itemDB');

/**
 * Creates User Profile
 * @param {*} _userID
 * @param {*} _userItemList
 */
class UserProfile {
  constructor(userID, userItemList){
    this._userID = userID;
    this._userItemList = userItemList;
  }

  // Getters and Setters
  get userID(){
    return this._userID;
  }

  set userID(value){
    this._userID = value;
  }

  get userItemList() {
    return this._userItemList;
  }

  set userItemList(value){
    this._userItemList = value;
  }

  // is the Item in the userItem list
  addItem(userItem) {
    for(var i=0; i<this._userItemList.length; i++){
  // if not check the list for a new userItem and add it to the userItemList
      if(this.userItemList[i]._item._itemCode === userItem._item._itemCode){
        console.log('ERROR: Duplicate Save');
      } else {
        var newUserItem = new UserItem(
          userItem._item,
          userItem._category,
          userItem._rating,
          userItem._madeIt
        );
  // Add item to the userItems
        this._userItemList.push(newUserItem);
        console.log('UPDATE: Item Added')
        }
        return this._userItemList;
    }

  }

  removeItem(item) {
    for(var i=0; i<this._userItemList.length; i++){
  // Remove the item if the item is currently in the list
      if(this._userItemList[i]._item._itemCode === item.item.itemCode){
        this._userItemList.splice(i, 1);
        return this._userItemList;
      } else {

      }
    }
  }

  updateItem(userItem, newRating, madeItValue){
  // Loops to find the userItem
  // is the item currently in the user list
    for(var i=0; i<this._userItemList.length; i++){
  // if not in the list then make a new userItem and add it to the userItemList
      if(this._userItemList[i]._item._itemCode === userItem._item._itemCode) {
        this.userItemList[i]._item._rating = newRating,
        this.userItemList[i]._rating = newRating,
        this.userItemList[i]._madeIt = madeItValue
        return this._userItemList[i];
      } else {
      }
    }
  }

  getItems() {
    return this._userItemList;
  }

  emptyProfile() {
    userProfile._userID = undefined,
    userProfile._userItemList = undefined
  }
};

module.exports = UserProfile;
