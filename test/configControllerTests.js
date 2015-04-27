var assert = require("assert"); // node.js core module
var sinon = require("sinon");
var chai = require("chai");
var ConfigController = require('../lib/configController');

var jf = require('jsonfile');
var file = './configs/examples/basicConfig.json';

var validJson = jf.readFileSync(file);

describe('Config Controller', function () {

    describe('Validate Json', function () {

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
                    new ConfigController(null);
                }).to.throw('Configuration Error');

                sinon.assert.calledWithExactly(console.log, "Config Missing")

            });

            it("should return 'true' when the base json is given", function () {
                chai.expect(function (result) {
                    new ConfigController(file);
                }).not.to.throw('Configuration Error');
            })

        });

        describe('validate systemName', function () {


            it("should return 'false' when 'systemName' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = null;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: systemName")
            });

            it("should return 'false' when 'systemName' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = 1;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemName")
            });

            it("should return 'false' when 'systemName' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemName = "";

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemName empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemName")
            });

            it("should return 'true' when 'systemName' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, true, "systemName is string should return 'true'")
            })


        });

        describe('validate systemDescription', function () {

            it("should return 'false' when 'systemDescription' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = null;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: systemDescription")
            });

            it("should return 'false' when 'systemDescription' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = 1;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemDescription")
            });

            it("should return 'false' when 'systemDescription' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.systemDescription = "";

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "systemDescription empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: systemDescription")
            });

            it("should return 'true' when 'systemDescription' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, true, "systemDescription is string should return 'true'")
            })
        });

        describe('validate version', function () {

            it("should return 'false' when 'version' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = null;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: version")
            });

            it("should return 'false' when 'version' is not a string", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = 1;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version not type string should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: version")
            });

            it("should return 'false' when 'version' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.version = "";

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "version empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: version")
            });

            it("should return 'true' when 'version' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, true, "version is string should return 'true'")
            })
        });

        describe('validate nodes', function () {

            it("should return 'false' when 'nodes' is null", function () {
                var validateJson = Object.create(validJson);
                validateJson.nodes = null;

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "nodes missing should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Missing: nodes")
            });

            it("should return 'false' when 'nodes' is not a array", function () {
                var validateJson = Object.create(validJson);
                validateJson.nodes = "test";

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "nodes not type array should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: nodes")
            });

            it("should return 'false' when 'nodes' is empty", function () {
                var validateJson = Object.create(validJson);
                validateJson.nodes = [];

                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, false, "nodes empty should return 'false'");
                sinon.assert.calledWithExactly(console.log, "Config Element Empty or Wrong Type: nodes")
            });

            it("should return 'true' when 'nodes' is string", function () {
                var validateJson = Object.create(validJson);
                var result = new ConfigController(file).validate(validateJson);
                assert.equal(result, true, "nodes is non-empty array should return 'true'")
            })
        });


    })

    describe('Parse nodes Nodes',function() {

        it("should have 5 nodes", function () {

            var file = './configs/testConfigs/5NodeTest.json';

            var result = new ConfigController(file)
            assert.equal(result.nodeCount, 5, "nodeCount should be 5");
        });

        it("should have 6 nodes", function () {

            var file = './configs/testConfigs/6NodeTest.json';

            var result = new ConfigController(file)
            assert.equal(result.nodeCount, 6, "nodeCount should be 6");

        });

        it("should have 12 nodes", function () {

            var file = './configs/testConfigs/12NodeTest.json';

            var result = new ConfigController(file)
            assert.equal(result.nodeCount, 12, "nodeCount should be 12");

        });

    })
});
