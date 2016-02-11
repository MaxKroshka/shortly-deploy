var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  timestamp: Date
});

var User = mongoose.model('User', UserSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});



module.exports = User;
