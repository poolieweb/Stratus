var Validator = require('jsonschema').Validator;
var v = new Validator();
var controller = module.exports;



var schema = {
    "type": "object",
    "properties": {
        "systemName": {"type": "string"},
        "systemDescription": {"type": "string"},
        "schema": {"type": "array"},
        "version": {"type": "string"}
    }
};

controller.validateJson = function (json) {

    if (json == null) {
        return false
    }

    var result =  v.validate(json, schema)

    return result.valid;

};