var Validator = require('jsonschema').Validator;
var v = new Validator();
var jf = require('jsonfile');


function ConfigController (path) {

    var json = this.loadJson(path);

    if(!this.validate(json))
    {
        throw "Configuration Error"
    }
};

ConfigController.prototype.validate = function(json){


    var systemName = this.validate_prop( "systemName",json.systemName,{"type":"string"});
    var systemDescription = this.validate_prop( "systemDescription",json.systemDescription,{"type":"string"});
    var version = this.validate_prop( "version",json.version,{"type":"string"});
    var schema = this.validate_prop( "schema",json.schema,{"type":"array"});

    return systemName && systemDescription && version && schema;
};

ConfigController.prototype.validate_prop = function(propName,prop,schema){

    if(prop == undefined){

        console.log("Config Element Missing: " + propName);

        return false;
    }

    var result =  v.validate(prop, schema);

    if (!(result.valid && prop != "")) {
        console.log("Config Element Empty or Wrong Type: " + propName);
        return false;
    }

    return true;
};

ConfigController.prototype.loadJson = function(path){

    if (path == null) {
        console.log("Config Missing");
        return false;
    }

    return jf.readFileSync(path);
};

exports.ConfigController = ConfigController;