#! /usr/bin/env node

var program = require('commander');
require('console.json');
var jf = require('jsonfile');


var ConfigController = require("./lib/configController");

program
    .option('-c, --configFile [file]', 'locatation of config file')
    .option('-m, --mode [mode]', 'mode of operation (setup/teardown) [setup]', 'setup')
    .option('-t, --test', 'preview the changes to console')
    .option('-e,--example', 'used to display example config file');


program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ stratus --help   (Displays this screen)');
    console.log('    $ stratus -c simpleNetwork.json   (Validates the config file)');
    console.log('    $ stratus -c simpleNetwork.json -m setup');
    console.log('    $ stratus -c simpleNetwork.json -m teardown');
    console.log('    $ stratus -c simpleNetwork.json -m setup -t');
    console.log('    $ stratus -c simpleNetwork.json -m teardown -t');
    console.log('');
    console.log('  Notes:');
    console.log('');
    console.log('    stratus will navigate the config file top to bottom in setup mode, traversing the tree normally.');
    console.log('    stratus will in teardown mode will work bottom up and work from the deepest child node.');
    console.log('');
    console.log('  Exmaple config.json:');
    console.log('');
    console.log('    to view example config json file use the command "stratus --example"');

    exit(0);
});


program.parse(process.argv);

//Process request for example
if (program.example) {
    var file = './configs/examples/basicConfig.json'
    jf.readFile(file, function (err, obj) {
      if(obj!=null)  console.json('', obj);
      if(err!=null)  console.json('', err);
      exit(0);
    })
}


//Process help if no arg are supplied
if (program.configFile == null && program.example == null) {
    program.emit('--help');
}


//Process help if no arg are supplied
if (program.configFile != null) {

    var controller = new ConfigController(program.configFile,true);
    console.log('Config file was successfully parsed, no issues found.');
    console.log('Schema has : ' + controller.nodeCount + ' nodes.');

}

function exit(exitCode) {
    process.exit(code = exitCode);
}


