const debug = require('debug')('myapp'),
  {functionHandle} = require('../common/common_function'),
  // userService = require('../services/userService');
  {phoneService} = require('../services');


const getPhoneList = functionHandle(function*(req, res, next) {
  const result = yield phoneService.getPhoneList();
  res.send(result);
});


module.exports = (app) => {

  app.get('/phone', getPhoneList);

};