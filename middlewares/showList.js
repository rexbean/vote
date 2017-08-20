var AV = require('leanengine');

exports.showList = function(req, res, next){
    var cql = 'select * from PicObject';
    AV.Query.doCloudQuery(cql).then(function (data) {
        var list = [];
        for(var i=0; i<data.results.length; i++){
            var obj = {
              vote : data.results[i].get('vote'),
              userinfo : data.results[i].get('userinfo'),
              base64 : data.results[i].get('picture')
            }
            list.push(JSON.stringify(obj))
        }
        res.send({
          success:true,
          msg:"ok",
          data:list
        })
    },function(error){
        res.send({
          success:false,
          msg:error,
          data:null
        })
    });
}
