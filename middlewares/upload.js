var AV = require('leanengine');

exports.upload = function(req, res, next){
    return res.sendfile(global.PATH + '/public/upload.html');
};

exports.saveToDB = function(req, res, next){
  var userinfo = req.body.userinfo;
  var img = req.body.img;

  var PicObject = AV.Object.extend('PicObject');
  var picObject = new PicObject();
  picObject.save({
      userinfo:"ren",
      picture:img,
    })
};
