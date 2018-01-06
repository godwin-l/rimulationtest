/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var resHandler = require("../common/res-handler");
var router = express.Router();
var users = require('../models/users.js');
var commonService = require("../common/commonService.js");
/* GET users listing. */

router.get('/', function(req, res, next) {
  var host = req.get('host');
  var origin = req.get('origin');
  if (req.originalUrl == '/api/users/otp' || req.originalUrl === '/api/users/verify') {
    next();
  } else {
    users.findOne({
      _id: req.headers['userid']
    }, function(err, data) {
      if (data === null || data.length === 0) {
        commonService.error(res, "BAD_REQUEST", 500);
      } else if (data.status == 22 && data.type == 'email') {
        next();
      } else {
        if (data.status == 22 && data.type == 'phone') {
          next();
        } else {
          resHandler.created(res, {
            "userStatusCode": data.status
          });
        }
      }
    });
  }
});
router.post('/', function(req, res, next) {

  var host = req.get('host');
  var origin = req.get('origin');
  if (req.originalUrl == '/api/users/addUser' || req.originalUrl == '/api/users/forgetPassword' || req.originalUrl == '/api/users/resetpassword' || req.originalUrl == '/api/users/otpVerification') {
    next();
  } else if (req.originalUrl == '/api/oauth/token') {} else {
    users.findOne({
      _id: req.headers['userid']
    }, function(err, data) {
      if (data === null || data.length === 0) {
        commonService.error(res, "BAD_REQUEST", 500);
      } else
        next();
    });
  }
});

module.exports = router;
