var assert = require("assert"); // node.js core module
var sinon = require("sinon");
var chai = require("chai");
var controller = require('../lib/configController');

var jf = require('jsonfile');
var file = './configs/examples/basicConfig.json';

var validJson = jf.readFileSync(file);

describe('configController', function () {

    describe('validateJson', function () {

        var sandbox;

        beforeEach(function () {
            // create a sandbox
            sandbox = sinon.sandbox.create();

            // stub some console methods
            sandbox.stub(console, "log");
            sandbox.stub(console, "error");
        });

        afterEach(function () {
            // restore the environment as it was before
            sandbox.restore();
        });
        describe('validate config', function () {

            it("should return 'false' when the json is null", function () {

                chai.expect(function (result) {
                    new controller.ConfigController(null);
                }).to.throw('Configuration Error');

                sinon.assert.calledWithExactly(console.log, "Config Missing")

            });

            it("should return 'true' when the base json is given", function () {
                chai.expect(function (result) {
                    new controller.ConfigController(file);
                }).not.to.throw('Configuration Error');
            })

        });

        describe('validate systemName', function () {


            it("should return 'false' when 'systemName' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = null;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: systemName")
            });

            it("should return 'false' when 'systemName' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = 1;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemName")
            });

            it("should return 'false' when 'systemName' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = "";

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemName")
            });

            it("should return 'true' when 'systemName' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, true, "systemName is string should return 'true'")
            })


        });

        describe('validate systemDescription', function () {

            it("should return 'false' when 'systemDescription' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = null;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: systemDescription")
            });

            it("should return 'false' when 'systemDescription' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = 1;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemDescription")
            });

            it("should return 'false' when 'systemDescription' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = "";

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemDescription")
            });

            it("should return 'true' when 'systemDescription' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, true, "systemDescription is string should return 'true'")
            })
        });

        describe('validate version', function () {

            it("should return 'false' when 'version' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = null;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: version")
            });

            it("should return 'false' when 'version' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = 1;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: version")
            });

            it("should return 'false' when 'version' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = "";

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: version")
            });

            it("should return 'true' when 'version' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, true, "version is string should return 'true'")
            })
        });

        describe('validate schema', function () {

            it("should return 'false' when 'schema' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.schema = null;

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "schema missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: schema")
            });

            it("should return 'false' when 'schema' is not a array", function () {
                var validateJson = Object.create(validJson);
                validateJson.schema = "test";

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "schema not type array should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: schema")
            });

            it("should return 'false' when 'schema' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.schema = [];

                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, false, "schema empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: schema")
            });

            it("should return 'true' when 'schema' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new controller.ConfigController(file).validate(validateJson);
                assert.equal(result, true, "schema is non-empty array should return 'true'")
            })
        });


    })
});
