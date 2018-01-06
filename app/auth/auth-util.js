'use strict'

var jwtDecode = require('jwt-decode');
var jwt = require('jsonwebtoken');
var fs = require('fs');
const cert = fs.readFileSync('key/private.key');
module.exports = {
  getToken: function(bearerToken) {
    return bearerToken != null && bearerToken.split(' ').length == 2 ? bearerToken.split(' ')[1] : null;
  },
  getUserId: function(accessToken) {
    var decoded = jwtDecode(accessToken);
    return decoded.sub;
  },
  generateToken: function(subject, issuer, audience, nonce) {
    // Add required params
    var token = jwt.sign({
      sub: subject,
      iss: issuer,
      nonce: nonce,
      aud: audience
    }, cert, {
      algorithm: 'RS256'
    }, {
      expiresIn: '365d'
    });
    return token;
  }
}
