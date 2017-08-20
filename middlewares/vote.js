var AV = require('leanengine');
exports.vote = function(req, res, next){
    var signedToken = req.body.token;
    var cql = 'select * from PicObject where userinfo = ?';
    var cql1 = 'update PicObject set vote = ? where objectId = ?'
    var pvalue = [signedToken];
    var pvalues =[];
    AV.Query.doCloudQuery(cql,pvalue).then(function (data) {
        var vote = data.results[0].get('vote');
        var objectId = data.results[0].get('objectId');
        vote += 1;
        pvalues.push(vote);
        pvalues.push(objectId);
        AV.Query.doCloudQuery(cql1, pvalues).then(function (data) {
            res.send({
                success:true,
                msg:'ok',
                data: null
            });
        },function(error){
            res.send({
              success:false,
              msg:error,
              data:null
          });
        });
    },function(error){
        res.send({
          success:false,
          msg:error,
          data:null
      });
    });
}
