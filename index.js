#! /usr/bin/env node

var program =   require('commander');
                require('console.json');
var jf =        require('jsonfile');
var util =      require('util');

program
    .version('0.0.1')
    .option('-p, --cloudProvider [name]', 'cloud provider [azure]', 'azure')
    .option('-c, --configFile [file]', 'locatation of config file')
    .option('-m, --mode [mode]', 'mode of operation (setup/teardown) [setup]','setup')
    .option('-t, --test', 'preview the changes to console')
    .option('-e,--example','used to display example config file');


program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ stratus --help');
  console.log('    $ stratus -p Azure -c simpleNetwork.json');
  console.log('    $ stratus -p Azure -c simpleNetwork.json -m setup');
  console.log('    $ stratus -p Azure -c simpleNetwork.json -m teardown');
  console.log('    $ stratus -p Azure -c simpleNetwork.json -m setup -t');
  console.log('    $ stratus -p Azure -c simpleNetwork.json -m teardown -t');
  console.log('');
  console.log('  Notes:');
  console.log('');
  console.log('    stratus will navigate the config file top to bottom in setup mode, traversing the tree normally.');
  console.log('    stratus will in teardown mode will work bottom up and work from the deepest child node.');
  console.log('');
  console.log('  Exmaple config.json:');
  console.log('');
  console.log('    to view example config json file use the command "stratus --example');

});


program.parse(process.argv);


if (program.example) {
    var file = './configs/examples/basicConfig.json'
    jf.readFile(file, function(err, obj) {
        console.json('', obj);
        console.json('', err);
    })
};


if (program.configFile == null) {
   program.emit('--help');
};

