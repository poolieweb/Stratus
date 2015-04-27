var Validator = require('jsonschema').Validator;
var v = new Validator();
var jf = require('jsonfile');
var Nodes = require('collections/sorted-array');

function ConfigController(path) {


    this.json = {};
    var nodes = Nodes([]);
    this.nodes = nodes;

    this.json = loadJson(path);

    if (!this.validate(this.json)) {
        throw "Configuration Error"
    }

    this.nodeCount = nodeCount(this.json.nodes, 0);

    function loadJson(path) {

        if (path == null) {
            console.log("Config Missing");
            return false;
        }

        return jf.readFileSync(path);
    }
    function nodeCount(nodesSelection, sum) {

        sum = sum + nodesSelection.length;

        for (var i = 0; i < nodesSelection.length; i++) {

            nodes.add(nodesSelection[0].name)

            if (nodesSelection[i].nodes != undefined && nodesSelection[i].nodes.constructor === Array)
                sum = nodeCount(nodesSelection[i].nodes, sum);
        }

        return sum;

    }
}
ConfigController.prototype.validate = function (json) {


    var systemName = validate_prop("systemName", json.systemName, {"type": "string"});
    var systemDescription = validate_prop("systemDescription", json.systemDescription, {"type": "string"});
    var version = validate_prop("version", json.version, {"type": "string"});
    var nodes = validate_prop("nodes", json.nodes, {"type": "array"});

    return systemName && systemDescription && version && nodes;


    function validate_prop(propName, prop, schema) {

        if (prop == undefined) {

            console.log("Config Element Missing: " + propName);

            return false;
        }

        var result = v.validate(prop, schema);

        if (!(result.valid && prop != "")) {
            console.log("Config Element Empty or Wrong Type: " + propName);
            return false;
        }

        return true;
    }
};

module.exports = ConfigController;


