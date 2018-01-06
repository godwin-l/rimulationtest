var express = require('express');
var blog = require('../models/blog.js');
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
exports.addblog = function(req, res) {
  var userId = utils.getUserId(req.header('Authorization'));
  var blogId = uuid.v1();
  var newinfo = new blog({
    _id: blogId,
    createdBy: userId,
    owner: userId,
    name:req.body.name,
    content:req.body.content,
    img:req.body.primaryimg,
    shortdesc:req.body.shortdesc,
    status:config.get('status:blog:active:default')
  });
  newinfo.save(function(err, add) {
    if (err) {
      console.log(err);
      commonService.error(res, "Internal Server Error", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, add);
    }
  });
}
exports.getblogs = function(req, res) {
  blog.find({
  }).populate('owner').exec(function(err, data) {
    if (err) {
      commonService.error(res, "Something went Wrong Try again", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, data);
    }
  })
};
exports.getblog = function(req, res) {
  blog.findOne({
    name: req.query.blogId
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
  blog.update({
    _id: req.body.blogId
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
    blog.find({
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
