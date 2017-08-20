let jwt = require("jsonwebtoken");
let key = 'vote';

module.exports = function(){
  let token = {
    signToken : function(pk){
      return jwt.sign(pk, key ,{
        'expiresIn': '7d'
      });
    },
    decodeToken : function(sk){
      return jwt.verify(sk, key);
    }
  };
  return token;
}
