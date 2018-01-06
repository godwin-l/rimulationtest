var express = require('express');
var discussion = require('../models/discussion.js');
var uuid = require("node-uuid");
var resHandler = require("../common/res-handler");
var utils = require("../common/utils.js");
var uuid=require('node-uuid');
var commonService = require("../common/commonService.js");
var config = require('../config/config')
var InternalServerError = config.get('errorcodes:InternalServerError');
var InputsError = config.get('errorcodes:InputsError');
var DuplicateUser = config.get('errorcodes:DuplicateUser');
var DuplicateEmail = config.get('errorcodes:DuplicateEmail/Mobile');
var tokenExpired = config.get('errorcodes:tokenExpired');
var unauthorised = config.get('errorcodes:unauthorised');
var passwordNotMatch = config.get('errorcodes:passwordNotMatch');
var EmailNotverified = config.get('errorcodes:EmailNotverified');
exports.adddiscussion = function(req, res) {
  var userId = utils.getUserId(req.header('Authorization'));
  var discussionId = uuid.v1();
  var newinfo = new discussion({
    _id: discussionId,
    createdBy: userId,
    name: req.body.name,
    owner: req.body.owner
  });
  console.log(req.body);
  newinfo.save(function(err, add) {
    if (err) {
      commonService.error(res, "Internal Server Error", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, add);
    }
  });
}
exports.getdiscussions = function(req, res) {
  discussion.find({
  }).populate({
    path:'owner',
    select:'fullName userName profilePic'
  }).exec(function(err, data) {
    if (err) {
      commonService.error(res, "Something went Wrong Try again", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, data);
    }
  })
};
exports.getdiscussion = function(req, res) {
  discussion.findOne({
    name: req.query.discussionId
  }).populate('owner comments.owner').exec(function(err, data) {
    if (err) {
      commonService.error(res, "Something went Wrong Try again", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, data);
    }
  })
};
exports.addcomment=function(req,res){
  var userId = utils.getUserId(req.header('Authorization'));
  var comment = {
    comment:req.body.comment,
    owner:userId
  }
  discussion.update({
    _id: req.body.discussionId
  }, {
    $push: {
      comments: comment
    }
  }, {
    upsert: true
  }, function(err, info) {
    if (err) {
      commonService.error(res, err.message, {
        code: InternalServerError
      });
    } else {
      resHandler.update(res, info);
    }
  })
}
exports.autocomplete = function(req, res) {
  try {
    discussion.find({
      name: {
        "$regex": req.query.term,
        "$options": "i"
      },
      status: 200
    }, function(err, value) {
      if (err) {
        commonService.error(res, err.message, {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, value);
      }
    })
  } catch (err) {
    commonService.error(res, "Something went Wrong Try again", {
      code: InternalServerError
    });
  }
};
