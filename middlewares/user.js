var AV = require('leanengine');
var md5 = require('js-md5');

exports.setUser = function(req, res, next){
    var useragent = req.body.useragent;
    var token = 'voteuser' + (global.userid++) + '@' + Date.now();
    signedToken = md5(token);

    var UserObject = AV.Object.extend('UserObject');
    var userObject = new UserObject();
    userObject.save({
        useragent: useragent,
        token: signedToken,
    });
    var resList = [];
    var obj = {
        token: signedToken,
        servertime:Date.now()
    }
    resList.push(JSON.stringify(obj));
    res.send({
      success:true,
      msg:"ok",
      data:resList
    });
}
