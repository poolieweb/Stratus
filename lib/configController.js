var Validator = require('jsonschema').Validator;
var v = new Validator();


function ConfigController (json,outputToConsole) {

    this.json = json;
    this.outputToConsole = outputToConsole;

};

ConfigController.prototype.validate = function(){

    if (this.json == null) {
        if(this.outputToConsole)console.log("Config Missing");
        return false;
    }

    var systemName = this.validate_prop( "systemName",this.json.systemName,{"type":"string"});
    var systemDescription = this.validate_prop( "systemDescription",this.json.systemDescription,{"type":"string"});
    var version = this.validate_prop( "version",this.json.version,{"type":"string"});
    var schema = this.validate_prop( "schema",this.json.schema,{"type":"array"});

    return systemName && systemDescription && version && schema;
}

ConfigController.prototype.validate_prop = function(propName,prop,schema){

    if(prop == undefined){

        if(this.outputToConsole)console.log("Config Element Missing: " + propName);

        return false;
    }

    var result =  v.validate(prop, schema);

    if (!(result.valid && prop != "")) {
        if (this.outputToConsole)console.log("Config Element Empty or Wrong Type: " + propName);
        return false;
    }

    return true;
}

exports.ConfigController = ConfigController;