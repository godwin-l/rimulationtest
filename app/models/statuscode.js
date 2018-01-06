/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var statuscode = new Schema({
  _id: String,
  code: {
    type: String
  },
  desc: {
    type: String
  },
  type: {
    type: String
  }
});
module.exports = mongoose.model('statuscode', statuscode);
