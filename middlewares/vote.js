var AV = require('leanengine');

exports.vote = function(req, res, next){
    var cql = 'update PicObject set vote = vote+1 where userinfo = ?';
    var pvalue = 'li';
    AV.Query.doCloudQuery(cql, pvalue).then(function (data) {
        console.log(i + " "+ userinfo);
    },function(error){
        console.log(error);
    });
}
