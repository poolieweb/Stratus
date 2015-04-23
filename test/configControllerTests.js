var assert = require("assert"); // node.js core module
var controller = require('../lib/configController');

var jf = require('jsonfile');
require('console.json');

var validateJson = {};


var file = './configs/examples/basicConfig.json'
jf.readFile(file, function (err, obj) {
    if (obj != null)  validateJson = obj;
    if (err != null)  console.json('', err);
})


describe('configController', function () {

    describe('validateJson', function () {
        it("should return 'false' when the json is null", function () {
            var result = controller.validateJson(null);
            assert.equal(result, false, "Null JSON does not return 'false'")
        })

        //it("should return 'false' when the json is {}", function () {
        //    var result = controller.validateJson({"test": "test"});
        //    assert.equal(result, false, "{} JSON does not return 'false'")
        //
        //})

        it("should return 'true' when the base json is given", function () {
            var result = controller.validateJson(validateJson);
            assert.equal(result, true, "JSON does return 'true'")
        })
    })
})
