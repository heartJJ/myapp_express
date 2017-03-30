const models = require('../sequelize_models'),
  co = require('co'),
  debug = require('debug')('myapp'),
  phoneService = {};

phoneService.getPhoneList = () => {
  return models.phone.findAll();
};

module.exports = phoneService;