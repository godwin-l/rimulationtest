/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var accessToken = require('../models/accessToken.js');
var client = require('../models/client.js');
var auth = require('../auth/auth-util');
var jwt = require('jsonwebtoken');
var commonService = require("../common/commonService.js");
var uuid = require("node-uuid");
var crypto = require('crypto');
var authUtils = require('../auth/auth-util.js');
var md5 = require('md5');
var fs = require('fs');
var utils = require("../common/utils.js");
var resHandler = require("../common/res-handler");
var config = require('../config/config')
var InternalServerError = config.get('errorcodes:InternalServerError');
var InputsError = config.get('errorcodes:InputsError');
var DuplicateUser = config.get('errorcodes:DuplicateUser');
var DuplicateEmail = config.get('errorcodes:DuplicateEmail/Mobile');
var tokenExpired = config.get('errorcodes:tokenExpired');
var unauthorised = config.get('errorcodes:unauthorised');
var passwordNotMatch = config.get('errorcodes:passwordNotMatch');
var EmailNotverified = config.get('errorcodes:EmailNotverified');
var users = require('../models/users');
const signCert = fs.readFileSync('key/public.pem');

// Requires setup for auth module
const appIssuer = config.get('auth:issuer');
const appAudience = config.get('auth:aud')
/**
 *
 * @param req
 * @param res
 * @description Service for tokenvalidator
 */
exports.tokenvalidator = function(req, res) {

  try {
    jwt.verify(req.body.access_token, signCert, {
      audience: appAudience,
      issuer: appIssuer
    }, function(err, decoded) {
      if (err) {
        console.log(err);
        commonService.error(res, "Token is not Valid", {
          code: "400"
        });
      } else {

        res.send({
          "status": "success",
          "userId": req.body.userId,
          "code": "200",
          "message": "Successfully Verified"
        })

      }
    });
  } catch (err) {


    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });
  }
};
/**
 *
 * @param req
 * @param res
 * @description Service for logout
 */
exports.logout = function(req, res) {
  var start = new Date();
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  try {
    var token = authUtils.getToken(req.headers['authorization']);
    accessToken.findOneAndRemove({
      userId: req.body.userId,
      token: token
    }, function(err, data) {
      if (err) {;

        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, "Successfully loged out");
      }
    });
  } catch (err) {;

    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};
const issuer = process.env.ISSUER || config.get('auth:issuer');
const nonce = process.env.NONCE || config.get('auth:nonce');
const aud = process.env.AUD || config.get('auth:aud');
exports.login = function(req, res) {
  try {
    client.findOne({
      clientId: req.body.client_id,
      clientSecret: req.body.client_secret
    }, function(err, clientinfo) {
      if (err) {


        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else if (clientinfo === null || clientinfo === "") {


        commonService.error(res, "Invalid client data", {
          code: InputsError
        });
      } else {
        users.findOne({
          userName: req.body.username
        }, function(err, data) {
          if (data === null || data === "") {
            commonService.error(res, "Internal Server Error", {
              code: InputsError
            });
          } else if (err) {
            commonService.error(res, "Internal Server Error", {
              code: InternalServerError
            });
          } else if (data.status == config.get('status:user:inactive:userDeleted')) {
            var oldpassword = req.body.password.toString();
            var oldhash = data.hashedPassword;
            var userId = req.headers['userid'];
            var salt = data.salt;
            var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha512 */
            hash.update(oldpassword);
            var value = hash.digest('hex');
            var hashedpassword = value;
            if (hashedpassword == oldhash) {
              var token = auth.generateToken(data._id, issuer, aud, nonce)
              var token = new accessToken({
                userId: data._id,
                token: token,
                clientId: req.body.client_id
              })
              token.save(function(err, info) {
                if (err) {

                  commonService.error(res, "Internal Server Error", {
                    code: InternalServerError
                  });
                } else {
                  users.update({
                      userName: req.body.username
                    }, {
                      $set: {
                        status: config.get('status:user:active:After_Reactivation')
                      }
                    }, {
                      upsert: true
                    },
                    function(err, userinfo) {
                      if (err) {

                        commonService.error(res, "Internal Server Error", {
                          code: InternalServerError
                        });
                      } else {
                        res.send(data);
                      }
                    })
                }
              })
            } else {

              commonService.error(res, "Password does not match", {
                code: passwordNotMatch
              });
            }
          } else {
            var oldpassword = req.body.password.toString();
            var oldhash = data.hashedPassword;
            var userId = req.headers['userid'];
            var salt = data.salt;
            var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha512 */
            hash.update(oldpassword);
            var value = hash.digest('hex');
            var hashedpassword = value;
            if (hashedpassword == oldhash) {
              var token = auth.generateToken(data._id, issuer, aud, nonce)
              var token = new accessToken({
                userId: data._id,
                token: token,
                clientId: req.body.client_id
              })
              token.save(function(err, data) {
                if (err) {

                  commonService.error(res, "Internal Server Error", {
                    code: InternalServerError
                  });
                } else {
                  res.send(data);
                }
              })
            } else {


              commonService.error(res, "Password does not match", {
                code: passwordNotMatch
              });
            }
          }
        });
      }
    })
  } catch (err) {


    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};
