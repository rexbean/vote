var AV = require('leanengine');

exports.showList = function(req, res, next){
    console.log('abcdedf');
    var cql = 'select * from PicObject';
    AV.Query.doCloudQuery(cql).then(function (data) {
        for(var i=0; i<data.results.length; i++){
            var result = data.results[i];
            var userinfo = result.get('userinfo');
            var base64 = result.get('picture');
            console.log(i + " "+ userinfo);
        }
    },function(error){
        console.log(error);
    });
}
