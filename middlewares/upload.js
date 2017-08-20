var AV = require('leanengine');


exports.upload = function(req, res, next){
    return res.sendfile(global.PATH + '/public/index.html');
};

exports.saveToDB = function(req, res, next){
  var signedToken = req.body.token;
  var img = req.body.img;

  var PicObject = AV.Object.extend('PicObject');
  var picObject = new PicObject();
  picObject.save({
      userinfo:signedToken,
      picture:img,
  });
  res.send({
      sucess:true,
      msg:'ok',
      data:null
  });
}
