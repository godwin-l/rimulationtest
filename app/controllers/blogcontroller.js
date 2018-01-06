var express = require('express');
var router = express.Router();
var blogservice = require('../services/blogservice');
router.get('/autocomplete', function(req, res, next) {
  blogservice.autocomplete(req, res);
});
router.get('/getblogs', function(req, res, next) {
  blogservice.getblogs(req, res);
});
router.post('/addblog', function(req, res, next) {
  blogservice.addblog(req, res);
});
router.post('/addcomment', function(req, res, next) {
  blogservice.addcomment(req, res);
});
router.get('/getblog', function(req, res, next) {
  blogservice.getblog(req, res);
});
module.exports = router;
