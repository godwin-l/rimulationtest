var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var package = new Schema({
  _id: String,
  packageId: String,
  packageName: {
    type: String
  },
  packageSize: {
    type: Number
  },
  unit: {
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
module.exports = mongoose.model('package', package);
