/**
 * Created by Karthick Eswar K R on 16/05/2017.
 */
var express = require('express');
var router = express.Router();
var commonService = require("../common/commonService.js");
var config = require('../config/config');
var InputsError = config.get('errorcodes:InputsError');
var validator = require("../common/validator.js");
var userservice = require('../services/userservice');
router.post('/adduser', function(req,res) {
  var data=validator.adduser(req,res)
    if(data==true){
      userservice.addservice(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.post('/subscribe', function(req,res) {
  var data=validator.subscribe(req,res)
    if(data==true){
      userservice.subscribe(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.get('/geturl', function(req,res) {
  userservice.geturl(req,res);
});
router.get('/autocomplete', function(req,res) {
  userservice.autocomplete(req,res);
});
router.post('/validatetoken', function(req,res) {
  userservice.validatetoken(req,res);
});

router.get('/getcodes', function(req,res) {
  userservice.getcodes(req,res);
});
router.post('/updateprofilepic', function(req,res) {
    var data=validator.updateprofilepic(req,res)
    if(data==true){
      userservice.updateprofilepic(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.post('/forgetPassword', function(req,res) {
    var data=validator.forgetpassword(req,res)
    if(data==true){
      userservice.forgetpassword(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.post('/resetpassword', function(req,res) {
    var data=validator.resetpassword(req,res)
    if(data==true){
      userservice.resetpassword(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.get('/checkemail', function(req,res) {
  userservice.checkemail(req,res);
});
router.post('/validatetoken', function(req,res) {
    var data=validator.validatetoken(req,res)
    if(data==true){
      userservice.validatetoken(req,res);
    }else{
      commonService.error(res, "InputsError", {
        code: InputsError
      });
    }
});
router.get('/getuser', function(req,res) {
  userservice.getuser(req,res);
});
router.post('/deleteuser', function(req,res) {
  commonService.delete(req,res, 'user');
});

module.exports = router;
