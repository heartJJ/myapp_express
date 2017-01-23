const {extname, basename} = require('path'),
  readFile = require('../common/load_files');


readFile(__dirname)
  .filter(val => extname(val) === '.js' && basename(val) !== 'index.js')
  .forEach(file => require(file));
