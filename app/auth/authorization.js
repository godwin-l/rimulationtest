var async = require('async');
var fs = require('fs');
var where = require("lodash.where");
var jwtDecode = require('jwt-decode');

var userService = require('../services/userservice');
var authUtils = require('./auth-util');

/**
 * @author PalMurugan C
 *
 * @description This is a Authorization service to authorize a user to access secured API
 */

exports.checkPermissions = function(req, res, next) {
  var accessToken = authUtils.getToken(req.header("Authorization"));
  async.waterfall([
    function(callback) {
      fs.readFile('json/rest-permission.json', function(err, data) {
        var restPermissions = JSON.parse(data);
        var filtered = where(restPermissions, {
          "rest": req.baseUrl,
          "method": req.method
        });
        callback(null, err, filtered[0].permission);
      });
    },
    function(err, restPermission, callback) {
      var userId = authUtils.getUserId(accessToken);
      if (req.headers['organisationid']) {
        var organisationId = req.headers['organisationid'];
        // Pass this userId to service to get userRole Details.
        userService.getUserRoles(userId, organisationId, function(result) {
          if (result) {
            if (restPermission.indexOf(result.permission) > -1) {
              next();
            } else {
              res.status(403).send("Access Denied!");
            }
          } else {
            res.status(403).send("Access Denied!");
          }
        });
      } else {
        res.status(403).send("Access Denied!");
      }
    }
  ]);
}
