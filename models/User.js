/**
 * Creates User
 * @param {*} _userID
 * @param {*} _password
 * @param {*} _firstName
 * @param {*} _lastName
 * @param {*} _email
 */
class User {
  constructor(userID, password, firstName, lastName, email){
    this._userID = userID;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  // Getters and Setters
  get userID() {
    return this._userID;
  }

  set userID(value) {
    this._userID = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }
}

module.exports = User;
