/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var countrycode = new Schema({
    _id: String,
    code:Schema.Types.Mixed
    }, {strict: false});
module.exports = mongoose.model('countrycode', countrycode);
