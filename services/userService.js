const usersModel = require('../models/usersModel'),
  co = require('co'),
  debug = require('debug')('myapp'),
  userService = {};

/**
 * 获取用户列表
 */
userService.getUserList = co.wrap(function*() {
  debug('查询用户信息');
  return yield usersModel.find().exec();
});

/**
 * 获取单个用户
 */
userService.getUser = co.wrap(function*(id) {
  debug('根据id查询单个用户');
  return yield usersModel.findOne({'_id': id});
});

/**
 * 新建用户
 */
userService.createUser = co.wrap(function*(option) {
  const newUser = new usersModel(option);
  return yield newUser.save();
});

/**
 * 修改用户
 */
userService.updateUser = co.wrap(function*(id, option) {
  return yield usersModel.update({'_id': id}, option);
});

/**
 * 删除用户
 */
userService.removeUser = co.wrap(function*(id) {
  return yield usersModel.remove({'_id': id});
});


module.exports = userService;