/**
 * 此文件包含了Sequelize 对mysql的连接
 */
const {extname, basename, join} = require('path'),
  readFile = require('../common/load_files'),
  config = require('../config/mysql_config.json'),
  Sequelize = require('sequelize'),
  debug = require('debug')('myapp');

const sequelize = new Sequelize(
  config.database, config.username, config.password, config.otherOption
);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

readFile(__dirname)
  .filter(val => extname(val) === '.js' && basename(val) !== 'index.js')
  .forEach(file => {
    const model = sequelize['import'](file); // sequelize.import方法导入模型
    db[model.name] = model;
  });

module.exports = db;
