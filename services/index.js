const {extname, basename} = require('path'),
  readFile = require('../common/load_files'),
  servcies = {};


readFile(__dirname)
  .filter(val => extname(val) === '.js' && basename(val) !== 'index.js')
  .forEach(file => {
    const key = basename(file).substring(0, basename(file).length -3);
    servcies[key] = require(file);
  });

module.exports = servcies;