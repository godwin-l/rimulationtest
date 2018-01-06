/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var status = new Schema({
    _id: String,
    statusId:String,
    status:{
      type:String
        },
    code:{
      type:String,
      unique:true
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
    type: String,
    "default": "active"
}
});
module.exports = mongoose.model('brand', brand);
