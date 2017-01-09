const {extname, basename, resolve} = require('path');
const {readdirSync, statSync} = require('fs');

const readFile = (option) => {
  return readdirSync(option).map(val => {
    const filePath = resolve(option, val);
    if(statSync(filePath).isDirectory()) {
      return readFile(filePath);
    } else if(statSync(filePath).isFile()){
      return [filePath];
    }
  }).reduce((preV, curV) => [...preV, ...curV], []);
};

module.exports = function(app) {
  readFile(__dirname)
    .filter(val => extname(val) === '.js' && basename(val) !== 'index.js')
    .forEach(file => require(file)(app));
};