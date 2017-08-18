var AV = require('leanengine');

exports.upload = function(req, res, next){
    return res.sendfile(global.PATH + '/public/upload.html');
};

exports.saveToDB = function(req, res, next){
    var userinfo = req.body.userinfo;
    console.log(userinfo);
    var base64 = req.body.base64;
    console.log(base64);
    var PicObject = AV.Object.extend('PicObject');
    var picObject = new PicObject();
    picObject.save({
        userinfo:"ren",
        picture:base64,
      })
};
