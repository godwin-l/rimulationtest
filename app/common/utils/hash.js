var crypto = require('crypto');
var self=module.exports = {
  genRandomString : function(length){
      return crypto.randomBytes(Math.ceil(length/2))
              .toString('hex') /** convert to hexadecimal format */
              .slice(0,length);   /** return required number of characters */
  },

 sha512 : function(password, salt){
      var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
      hash.update(password);
      var value = hash.digest('hex');
      return {
          salt:salt,
          passwordHash:value
      };
  },
   saltHashPassword:function(userpassword) {
      var salt = self.genRandomString(16); /** Gives us salt of length 16 */
      var passwordData = self.sha512(userpassword, salt);
      var hashedpassword=passwordData.passwordHash;
      var salt1=passwordData.salt;
      return{hashedpassword,salt1};
    },
  updatecheck:function(oldpassword,userpassword,salt2,userId,oldhash){
    console.log("ïn update check");
    var salt=salt2;
    var passwordData = self.sha512(oldpassword, salt);
    var hashedpassword=passwordData.passwordHash;
    console.log(hashedpassword);
    console.log(oldhash);
    if(hashedpassword==oldhash){
    var newp=self.saltHashPassword(userpassword);
    return{
      hashedpassword:newp.hashedpassword,
      salt:newp.salt1
    };
    }
else{
  return "error";
}
  }
};
