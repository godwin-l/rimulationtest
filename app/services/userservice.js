var express = require('express');
var uuid = require("node-uuid");
var countrycode = require('../models/countrycode');
var aws = require('aws-sdk');
var AWS_ACCESS_KEY = 'AKIAINGHEEUSFQKB3DMA'
var AWS_SECRET_KEY = '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';
var S3_BUCKET = 'virtualgd';
var userservice = require('../services/userservice');
var userdao = require('../dao/userdao');
var md5 = require('md5');
var http = require('http');
var utils = require("../common/utils.js");
var accessToken = require('../models/accessToken');
var UserIdentificationKeys = require('../models/user-identification-keys');
var users = require('../models/users.js');
var crypto = require('crypto');
var mailService=require('../common/mail/mailService');
var config = require('../config/config');
var InternalServerError = config.get('errorcodes:InternalServerError');
var InputsError = config.get('errorcodes:InputsError');
var DuplicateUser = config.get('errorcodes:DuplicateUser');
var DuplicateEmail = config.get('errorcodes:DuplicateEmail/Mobile');
var tokenExpired = config.get('errorcodes:tokenExpired');
var unauthorised = config.get('errorcodes:unauthorised');
var passwordNotMatch = config.get('errorcodes:passwordNotMatch');
var EmailNotverified = config.get('errorcodes:Email/MobileNotverified');
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
exports.addservice = function(req, res) {
  var start = new Date();
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var userId = uuid.v1();
  var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  var orgId = uuid.v1();
  var user = new users({
    _id: userId,
    userId: userId,
    userName: req.body.userName.toLowerCase(),
    fullName: req.body.fullName,
    password: req.body.password,
    email: [{
      email: req.body.userName.toLowerCase(),
      type: 2
    }],
    org: [{
      organisationId: orgId,
      role: 'admin'
    }]
  });
  try {
    users.findOne({
      userName: req.body.userName.toLowerCase()
    }, function(err, data) {
      if (err) {
        //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
        commonService.error(res, err.message, {
          code: DuplicateUser
        });

      } else if(data){
         if(data.status==config.get('status:user:active:subscribe')){
users.update({_id:data._id},{$set:{    fullName: req.body.fullName,
    password: req.body.password}},{upsert:true},function(err,info){
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, info);
      }
    })

  }
}else {
        if (!data) {
          try {
            user.save(function(err, add) {
              if (err) {
                //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });

                commonService.error(res, "Internal Server Error", {
                  code: InternalServerError
                });
              } else {
                resHandler.success(res, add);
              }
            });
          } catch (err) {
            commonService.error(res, "Internal Server Error", {
              code: InternalServerError
            });
          }
        } else {
          commonService.error(res, "Email is already registered with virtualgodown . Try with different email or retrieve yours.", {
            code: tokenExpired
          });
        }
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};
exports.subscribe = function(req, res) {
  console.log(req.body.email);
  var userId = uuid.v1();
  var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  var orgId = uuid.v1();
  var user = new users({
    _id: userId,
    userId: userId,
    userName: req.body.email.toLowerCase(),
    email: [{
      email: req.body.email.toLowerCase(),
      type: 2
    }],
    org: [{
      organisationId: orgId,
      role: 'admin'
    }],
    status:config.get('status:user:active:subscribe')
  });
  try {
    users.findOne({
      userName: req.body.email.toLowerCase()
    }, function(err, data) {
      if (err) {
        //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
        commonService.error(res, err.message, {
          code: DuplicateUser
        });
      } else {
        if (!data) {
          try {
            user.save(function(err, add) {
              if (err) {
                //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });

                commonService.error(res, "Internal Server Error", {
                  code: InternalServerError
                });
              } else {
                resHandler.success(res, add);
              }
            });
          } catch (err) {
            commonService.error(res, "Internal Server Error", {
              code: InternalServerError
            });
          }
        }  else{
          commonService.error(res, "Email is already registered with virtualgodown . Try with different email or retrieve yours.", {
            code: tokenExpired
          });
        }
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};

exports.getimage = function(req, res) {
  var httpOptions = {
    hostname: 'http://maps.googleapis.com',
    path: 'http://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i6!2i34!3i31!4i256!2m3!1e0!2sm!3i386080964!3m14!2sen-US!3sUS!5e18!12m1!1e68!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy5lOmx8cC52Om9mZixzLnQ6MXxzLmU6Z3xwLnY6b2ZmLHMudDoyMXxwLnY6b2ZmLHMudDoyMHxwLnY6b2ZmLHMudDoyfHAudjpvZmYscy50OjN8cy5lOmwuaXxwLnY6b2ZmLHMudDo0fHAudjpvZmY!4e0!5m1!5f2&token=25076',
    port: 80,
    method: 'GET'
  };

  http.request(httpOptions, function(response) {
    var idx = 0;
    var len = parseInt(response.header("Content-Length"));
    var body = new Buffer(len);

    response.setEncoding('binary');

    response.on('data', function(chunk) {
      body.write(chunk, idx, "binary");
      idx += chunk.length;
    });

    response.on('end', function() {
      res.contentType = 'image/jpg';
      res.send(body);
    });
  })
}
exports.autocomplete = function(req, res) {
  try {
    users.find({
      userName: {
        "$regex": req.query.term,
        "$options": "i"
      }
    }).limit(5).exec(function(err, data) {
      if (err) {

        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {

        resHandler.success(res, data);
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};
exports.getUserRoles = function(userId, orgId, callback) {
  users.findOne({
    _id: userId,
    'org.organisationId': orgId
  }, function(err, add) {
    if (err) {
      callback(null)
    } else if (!add) {
      callback(null)
    } else {
      for (i = 0; i < add.org.length; i++) {
        if (add.org[i].organisationId == orgId) {
          callback({
            permission: add.org[i].role.toUpperCase()
          })
        }
      }
    }
  })
}
exports.checkemail = function(req, res) {
    try {
      console.log(req.query.term);
      users.findOne({
        userName: req.query.term
      }, function(err, add) {
        console.log("after func");
        if (err) {
          console.log(err);
          commonService.error(res, "Internal Server Error", {
            code: InternalServerError
          });
        } else if (add == null || !add || add == undefined) {
          console.log("sdd");
          resHandler.success(res, {
            "exist": false
          });
        } else {
          console.log("id");
          resHandler.success(res, {
            "exist": true
          });

        }
      });
    } catch (err) {
      console.log(err);
      commonService.error(res, "Internal Server Error", {
        code: InternalServerError
      });

    }
}
exports.getcodes = function(req, res) {
  var start = new Date();
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  try {
    countrycode.findOne({}, function(err, data) {
      if (err) {;
          commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, data);
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};

exports.getuser = function(req, res) {
  var userId = utils.getUserId(req.header('Authorization'));
  try {
    users.findOne({
      userId: userId
    }).select('userId org status fullName profilePic dob address company userName organisation email secondaryEmail mobile primaryMobile').exec(function(err, data) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else if (!data) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        try {
          var org = data.organisation.toObject();
          for (i = 0; i < org.length; i++) {

            var month = monthNames[org[i].from.getUTCMonth()]; //months from 1-12
            var year = org[i].from.getUTCFullYear();
            var month1 = monthNames[org[i].to.getUTCMonth()]; //months from 1-12
            var year1 = org[i].to.getUTCFullYear();
            org[i].from = month + " " + year;
            org[i].to = month1 + " " + year1;
            if (org[i].to == "December 9999" || org[i].to == "undefined 9999") {
              org[i].to = "till-now"
            }
          }
          var info = data.toObject();
          info.organisation = org;
          resHandler.success(res, info);
        } catch (err) {
          commonService.error(res, "Internal Server Error", {
            code: InternalServerError
          });
        }
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
}
exports.geturl = function(req, res) {
  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
  });
  var Id = uuid.v1();
  var s3 = new aws.S3();
  var key = Id + ".jpg";
  var options = {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60000000,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', options, function(err, data) {
    if (err) {;
      return res.send('Error with S3');
    } else {
      var url = 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + Id + ".jpg";
      res.json({
        name: Id,
        signed_request: data,
        url: url
      });
    }
  });
};
exports.updateprofilepic = function(req, res) {
  try {
    var userId = utils.getUserId(req.header('Authorization'));
    users.update({
      userId: userId
    }, {
      $set: {
        profilePic: req.body.img
            }
    }, {
      upsert: true
    }, function(err, data) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        res.json({
          status: "success"
        });
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
}
exports.delete = function(info, password, data, callback) {
  try {
    users.findOne(info, function(err, data) {
      if (err) {

        callback(err);

      } else {
        if (password == null || password == undefined || !password) {

          callback(err);
        } else {
          var oldpassword = password.toString();
          var salt2 = data.salt;
          var oldhash = data.hashedPassword;
          var userId = userId;
          var salt = salt2;
          var hash = crypto.createHmac('sha1', salt); /** Hashing algorithm sha512 */
          hash.update(oldpassword);
          var value = hash.digest('hex');
          var hashedpassword = value;
          if (hashedpassword == oldhash) {
            try {
              users.update({
                userId: userId
              }, {
                $set: {
                  status: config.get('status:user:inactive:' + data + 'Deleted')
                }
              }, {
                upsert: true
              }, function(err, data) {
                if (err) {

                  callback(err);
                } else {
                  callback(null, data);
                }
              })
            } catch (err) {

              callback(err);
            }
          } else {

            callback(err);

          }
        }
      }
    })
  } catch (err) {

    callback(err);

  }
}
/**
 *
 * @param req
 * @param res
 * @description Service for forgetpassword
 */
exports.forgetpassword = function(req, res) {
  var username = req.body.username;
  try {
    users.findOne({
      userName: username.toLowerCase()
    }, function(err, userdata) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        if (userdata === null || userdata === undefined || userdata === "") {

          commonService.error(res, 'error in forgetpassword', {
            code: tokenExpired
          });
        } else {
          var _id = uuid.v1();
          var userId = userdata._id;
          var a = Math.floor(100000 + Math.random() * 900000);
          a = a.toString();
          a = a.substring(-2);          // add userIdentificationKeys
          var userIdentificationKeys = new UserIdentificationKeys({
            _id: _id,
            userId: userId,
            type: "forgetPassword",
            token:a,
            expiredOn: 12
          });
          try {
            userIdentificationKeys.save(function(err, userIdentificationKeys) {
              if (err) {
                commonService.error(res, "Internal Server Error", {
                  code: InternalServerError
                });
              } else {
                mailService.sendmail(req, res, req.body.username.toLowerCase(), a);
              }
            });
          } catch (error) {
            commonService.error(res, "Internal Server Error", {
              code: InternalServerError
            });

          }
        }
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
 * @description Service for resetpassword
 */
exports.validatetoken = function(req, res) {
  try {
    UserIdentificationKeys.findOne({
      token: req.body.token
    }, function(err, use) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        if (use == null || use == undefined) {
          resHandler.success(res, {
            valid: false
          });
        } else {
          resHandler.success(res, {
            valid: true
          });
        }
      }
    })
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
}
exports.resetpassword = function(req, res) {
  try {
    UserIdentificationKeys.findOne({
      token: req.body.token
    }, function(err, use) {
      if (err) {
        commonService.error(res, "Internal Server Error", {
          code: InternalServerError
        });
      } else {
        if (use == null || use == undefined) {
          commonService.error(res, "Internal Server Error", {
            code: InternalServerError
          });
        } else {
          var id = use.userId;
          users.findOne({
            _id: id
          }, function(err, user) {
            if (err) {
              resHandler.serverError(err, res);
            } else {
              var password = req.body.newPassword;
              var salt = crypto.randomBytes(32).toString('hex');
              var hashedPassword = crypto.createHmac('sha1', salt).update(password).digest('hex');
              try {
                users.update({
                  _id: id
                }, {
                  $set: {
                    hashedPassword: hashedPassword,
                    salt: salt
                  }
                }, {
                  upsert: true
                }, function(err, user) {
                  if (err) {
                    console.error("{" + "'Message':'error in resetpassword" + ",'Url':" + req.originalUrl + "}");
                    commonService.error(res, "Internal Server Error", {
                      code: InternalServerError
                    });
                  } else {
                    try {
                      accessToken.remove({
                        userId: id
                      }, function(err, rdata) {
                        if (err) {
                          console.error("{" + "'Message':'error in resetpassword" + ",'Url':" + req.originalUrl + "}");
                          commonService.error(res, "Internal Server Error", {
                            code: InternalServerError
                          });
                        } else {
                          var data = {
                            "isadded": "true",
                            "message": "User Password updated Successfully"
                          }
                          resHandler.success(res, data);
                        }
                      })
                    } catch (error) {
                      commonService.error(res, "Internal Server Error", {
                        code: InternalServerError
                      });

                    }

                  }

                });
              } catch (error) {
                commonService.error(res, "Internal Server Error", {
                  code: InternalServerError
                });

              }
            }
          });
        }
      }
    });
  } catch (err) {
    commonService.error(res, "Internal Server Error", {
      code: InternalServerError
    });

  }
};
