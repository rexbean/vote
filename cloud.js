'use strict';
var AV = require('leanengine');

var TestObject = AV.Object.extend('AVCloudTest');

var errorFn = function (res) {
    return function (error) {
        res.error(error);
    }
};

AV.Cloud.define('hello', function (request, response) {
    response.success('Hello world!');
});

AV.Cloud.define('echoError', function (request, response) {
    response.error(request.params);
});

AV.Cloud.define('echoSuccess', function (request, response) {
    response.success(request.params);
});

AV.Cloud.define('errorCode', function (req, res) {
    AV.User.logIn('NoThisUser', 'lalala', {
        error: function (user, err) {
            res.error(err);
        }
    });
});

AV.Cloud.define('basicErrorCode', function (req, res) {
    res.error('basic error message');
});

AV.Cloud.define('customErrorCode', function (req, res) {
    res.error({code: 123, message: 'custom error message'});
});

AV.Cloud.define('fetchObject', function (req, res) {
    var data = req.params.obj;
    // 更简洁的方法? create object from:
    //  {"__type":"Pointer","className":"Armor","objectId":"55d057a760b2b750996800fd"}
    var obj = AV.Object.createWithoutData(data.className, data.objectId);
    obj.fetch().then(function (obj) {
        res.success(obj);
    }, errorFn(res));
});

AV.Cloud.define('fullObject', function (req, res) {
    var obj = new TestObject();
    obj.set('boolean', true);
    obj.set('number', 1);
    obj.set('string', 'string');
    obj.set('date', new Date());
    obj.set('array', ["a", "b"]);
    obj.set('map', {"a": 1, "b": 2});
    obj.save().then(function () {
        res.success(obj._toFullJSON());
    }, errorFn(res));
});

AV.Cloud.define('complexObject', function (req, res) {
    var testObj = req.params.testObject;
    var obj = new TestObject();
    obj.set('boolean', true);
    obj.set('number', 1);
    obj.save().then(function () {
        res.success({
            foo: 'bar',
            i: 123,
            obj: {
                a: 'b',
                as: [1, 2, 3]
            },
            t: new Date('2015-05-14T09:21:18.273Z'),
            avObject: obj,
            avObjects: [obj, testObj],
            testObject: testObj
        });
    }, errorFn(res));
});

AV.Cloud.beforeSave('AVCloudTest', function (req, res) {
    var string = req.object.get('string');
    if (string) {
        if (string.length > 10) {
            req.object.set('string', string.substring(0, 10));
        }
        res.success();
    } else {
        res.success();
    }
});

module.exports = AV.Cloud;
