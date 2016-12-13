const mongoose = require('mongoose'),
  Users = require('../models/users');

const getUsers = function(req, res, next) {
  res.send('查询');
  // Users.fetch((err, users) => {
  //   if(err) {
  //     console.log(err);
  //   }
  //   res.send('users', {title: '用户列表', users: users});
  // });
};

module.exports = function(app) {

  app.get('/users', getUsers);
};
