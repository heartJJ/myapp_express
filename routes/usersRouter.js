const usersModel = require('../models/usersModel'),
  debug = require('debug')('myapp');

  
const getUsers = function(req, res, next) {
  console.log('查询用户信息');
  usersModel.fetch((err, users) => {
    if(err) {
      console.log(err);
    }
    res.send({title: '用户列表', users: users});
  });
  // const newUser = new usersModel({name: 'abcde', age: '22'});
  // newUser.save( (err, data) => {
  //   if(err) {
  //     debug(err);
  //     res.send('数据库操作有误');
  //   }
  // });
  // usersModel.find( (err, data) => {
  //   if(err) {
  //     debug(err);
  //     res.send('数据库操作有误');
  //   }
  //   res.send({title: '用户列表', users: data});
  // });
};

module.exports = function(app) {

  app.get('/users', getUsers);
};
