var Validator = require('jsonschema').Validator;
var v = new Validator();
var jf = require('jsonfile');


function ConfigController (path) {

    this.json = loadJson(path);

    if(!this.validate(this.json))
    {
        throw "Configuration Error"
    }

    function loadJson(path){

        if (path == null) {
            console.log("Config Missing");
            return false;
        }

        return jf.readFileSync(path);
    };
};

ConfigController.prototype.validate = function(json){


    var systemName = validate_prop( "systemName",json.systemName,{"type":"string"});
    var systemDescription = validate_prop( "systemDescription",json.systemDescription,{"type":"string"});
    var version = validate_prop( "version",json.version,{"type":"string"});
    var schema = validate_prop( "schema",json.schema,{"type":"array"});

    return systemName && systemDescription && version && schema;


    function validate_prop (propName,prop,schema){

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

};

module.exports = ConfigController;


