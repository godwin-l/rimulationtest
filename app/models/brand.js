/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var brand = new Schema({
  _id: String,
  brandId: String,
  brandName: {
    type: String,
    unique: true
  },
  likes: [{
    userId: {
      type: String,
      ref: 'Users'
    }
  }],
  brandOwner: {
    type: String
  },
  logo:{
    type:String
  },
  type:{
    type:String
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
  },
  description: Schema.Types.Mixed,
});
module.exports = mongoose.model('brand', brand);
