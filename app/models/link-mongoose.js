var mongoose = require('mongoose');
var crypto = require('crypto');

var UrlSchema = new mongoose.Schema({
  url : String, 
  baseUrl: String,
  code : String,
  title: String,
  visits: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

var Link = mongoose.model('Link', UrlSchema);

Link.prototype.initialize = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
};


module.exports = Link;