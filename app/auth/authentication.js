'use strict'

var async = require('async');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var where = require("lodash.where");
var authUtils = require('./auth-util');
var authorization = require('./authorization');

/**
 * @author PalMurugan C
 *
 * @description This is a authentication service to authenticate our JWT Token
 */

const AUTHORIZATION = 'Auth'
var securedURL;
var appIssuer, appAudience;
var signCert;

var _setup = options => {
  var app = options.app;
  securedURL = options.securedURL;
  appIssuer = options.issuer;
  appAudience = options.audience;
  signCert = options.signCert;
};

module.exports = {
  setup: options => {
    return _setup(options);
  },
  authenticate: (req, res, next) => {
    async.waterfall([
      function(callback) {
        fs.readFile('json/rest-permission.json', function(err, data) {
          var restPermissions = JSON.parse(data);
          var url;

          var filtered = where(restPermissions, {
            "rest": req.baseUrl
          });

          callback(null, err, filtered);
        });
      },
      function(err, filtered, callback) {
        if (filtered.length == 0) {
          callback(true);
          res.status(404).send("resource not found");

        } else if (req.originalUrl.indexOf(securedURL) > -1) {
          callback(null);
        } else {
          callback(true);
          next();
        }
      },
      function(callback) {
        var accessToken = authUtils.getToken(req.header("Authorization"));
        if (accessToken == null) {
          callback(true);
          res.status(401).send("Invalid Token");
        } else {
          jwt.verify(accessToken, signCert, {
            audience: appAudience,
            issuer: appIssuer
          }, function(err, decoded) {
            if (err) {
              callback(true)
              res.status(401).send(err.message);
            } else {
              if (req.originalUrl.indexOf(securedURL + '/authorize') > -1) {
                callback(null);
              } else {
                callback(true)
                next();
              }
            }
          });
        }
      },
      function(callback) {
        authorization.checkPermissions(req, res, next);
      }
    ]);
  }
}
