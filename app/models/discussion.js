/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var discussion = new Schema({
  _id: String,
  discussionId: String,
  name: {
    type: String
    },
  comments: [{
    comment: {
      type: String
    },
    owner:{
      type:String,
      ref:'Users'
    },
    createdOn:{
      type:Date,
      default:Date.now
    }
  }],
  owner: {
    type: String,
    ref:'Users'
  },
  createdBy:{
    type:String
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
module.exports = mongoose.model('discussion', discussion);
