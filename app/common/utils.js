/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var async = require("async");
var jwtDecode = require('jwt-decode');
var accessToken = require('../models/accessToken');
var userservice = require('../services/userservice');
var resHandler = require("../common/res-handler");
var config = require('../config/config');
var commonService = require('../common/commonService');
var utils = require('../common/utils');
var InternalServerError = config.get('errorcodes:InternalServerError');
exports.getUserId = function(accessToken) {
  var token = utils.getToken(accessToken)
  var decoded = jwtDecode(token);
  return decoded.sub;
};
exports.getToken = function(bearerToken) {
  return bearerToken != null && bearerToken.split(' ').length == 2 ? bearerToken.split(' ')[1] : null;
};
exports.delete = function(req, res, data) {
  var value = config.get("deleteType:" + data);
  var errorcode;
  var userId = utils.getUserId(req.header('Authorization'));
  var info;
  if (data == 'user') {
    info = {
      userId: userId
    }
  }
  async.waterfall([
      function(callback) {
        console.log("in user");
        if (value <= 1) {
          userservice.delete(info, req.body.password, data, (err, info) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          })
        } else {
          callback(null);
        }
      }
    ],
    function(err, result) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, "Successfully deleted");
      }
    });
};
