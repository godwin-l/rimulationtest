var express = require('express');
var router = express.Router();
var config = require('../config/config');
var commonService = require("../common/commonService.js");
var InputsError = config.get('errorcodes:InputsError');
var validator = require("../common/validator.js");
var discussionservice = require('../services/discussionservice');

router.get('/getdiscussions', function(req, res, next) {
  discussionservice.getdiscussions(req, res);
});
router.post('/adddiscussion', function(req, res, next) {
  var data=validator.adddiscussion(req,res);
    if(data==true){
      discussionservice.adddiscussion(req, res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.post('/addcomment', function(req, res, next) {
    var data=validator.addcomment(req,res)
        if(data==true){
      discussionservice.addcomment(req, res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.get('/getdiscussion', function(req, res, next) {
    var data=validator.getdiscussion(req,res)
    if(data==true){
      discussionservice.getdiscussion(req, res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
module.exports = router;
