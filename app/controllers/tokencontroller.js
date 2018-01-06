/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var router = express.Router();
var commonService = require("../common/commonService.js");
var tokenservice = require('../services/tokenservice');
router.post('/checktoken', function(req, res, next) {
  tokenservice.tokenvalidator(req, res);
});
router.get('/logout', function(req, res, next) {

  tokenservice.logout(req, res);
});
router.post('/login', function(req, res, next) {
  tokenservice.login(req, res);
});
module.exports = router;
