/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserIdentificationKeys = new Schema({
  _id: String,
  type: {
    type: String
  },
  userId: String,
  collabratorId: String,
  token: {
    type: String
  },
  orgId: String,
  expiredOn: {
    type: Number

  },
  email: {
    type: String
  },
  createdOn: {
    type: Date,
    "default": Date.now
  },
  updatedOn: {
    type: Date,
    "default": Date.now
  },
  status: {
    type: Number,
    "default": 200
  }
});

module.exports = mongoose.model('UserIdentificationKeys', UserIdentificationKeys);
