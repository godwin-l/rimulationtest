/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// AccessToken
var AccessToken = new Schema({
    userId: {
        type: String
    },

    clientId: {
        type: String
    },

    token: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('AccessToken', AccessToken);
