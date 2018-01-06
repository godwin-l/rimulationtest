var express = require('express');
var brand = require('../models/brand.js');
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
exports.addbrand = function(req, res) {
  if(!req.body.brandName || !req.body.brandOwner || !req.body.brandtype){
    commonService.error(res, "Inputs Error", {
      code: InputsError
    });
  }else{
  var userId = utils.getUserId(req.header('Authorization'));
  var brandId = uuid.v1();
  var newbrand = new brand({
    _id: brandId,
    createdBy: userId,
    brandName: req.body.brandname,
    brandOwner: req.body.brandowner,
    type:req.body.brandtype,
    description:req.body.branddescription,
    logo: req.body.logo
  });
  newbrand.save(function(err, add) {
    if (err) {
      //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
      commonService.error(res, "Internal Server Error", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, add);
    }
  });
}
};
exports.editbrand = function(req, res) {
  if(!req.body.brandId){
    commonService.error(res, "InputsError", {
      code: InputsError
    });
  }else{
  brand.update({_id:req.body.brandId},{$set:{logo:req.body.logo,description:req.body.branddescription,
}},{upsert:true},function(err, add) {
    if (err) {
      //log.error({"ip":ip,"userid":req.headers['userid'],"url":req.originalUrl,"user-agent":req.headers['user-agent'],"host":req.hostname,"method":req.method,"responseTime": new Date() - start });
      commonService.error(res, "Internal Server Error", {
        code: InternalServerError
      });
    } else {
      resHandler.success(res, add);
    }
  });
}
};
exports.brand = function(req, res) {
  brand.find({
    brandName: req.body.name
  }, function(err, data) {
    if (err) {
      commonService.error(res, "Something went Wrong Try again", {
        code: InternalServerError
      });
    } else {
      res.send(data[0]);
    }
  })
};
exports.brandinfo = function(req, res) {
  brand.findOne({
    _id: req.query.brandId
  }, function(err, data) {
    if (err) {
      commonService.error(res, "Something went Wrong Try again", {
        code: InternalServerError
      });
    } else {
      resHandler.update(res, data);
    }
  })
};
exports.addlike=function(req,res){
  var userId = utils.getUserId(req.header('Authorization'));
  var key = {
    userId:userId
  }
  brand.update({
    _id: req.body.brandId
  }, {
    $addToSet: {
      likes: key
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
exports.removelike=function(req,res){
  var userId = utils.getUserId(req.header('Authorization'));
  var key = {
    userId:userId
  }
  brand.update({
    _id: req.body.brandId
  }, {
    $pull: {
      likes: key
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
    brand.find({
      brandName: {
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
exports.getbrands = function(req, res) {
  try {
    var userId = utils.getUserId(req.header('Authorization'));
    var info;
    if(!req.query.brandId && !req.query.type && req.query.term){
    info={
        brandName: {
          "$regex": req.query.term,
          "$options": "i"
        },
        status: 200
      }
    }else if(req.query.brandId){
      info={
        _id:brandId,
        status: 200
      }
    }
   else if (req.query.type !== null || req.query.type !== undefined && req.query.type == 'private'){
      info = {
        $or: [{
          type: config.get('product:type:withInNetwork'),
          brandOwner: req.headers['organisationid'],
          createdBy: userId
        }, {
          type: config.get('product:type:withInOrganisation'),
          brandOwner: req.headers['organisationid'],
          createdBy: userId
        }]

      }
    }
    brand.find(info, function(err, value) {
      if (err) {
        console.log(err);
        commonService.error(res, err.message, {
          code: InternalServerError
        });
      } else {
        resHandler.success(res, value);
      }
    })
  } catch (err) {
    console.log(err);
    commonService.error(res, "Something went Wrong Try again", {
      code: InternalServerError
    });
  }
};
