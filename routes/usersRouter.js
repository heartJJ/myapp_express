const usersModel = require('../models/usersModel'),
  co = require('co'),
  debug = require('debug')('myapp');

  
const getUserList = function(req, res, next) {
  debug('查询用户信息');
  usersModel.fetch((err, userList) => { // 定义在userSchema中
    if(err) {
      debug(err);
    }
    // res.send({title: '用户列表', users: userList});
    res.render('users', {title: '用户列表', users: userList});
  });
};

const getUser = (req, res, next) => {
  debug('根据id查询单个用户');
  usersModel.findOne({'_id': req.params.id}, (err, user) => {
    if(err) {
      debug(err);
    }
    res.send({title: '单个用户详情', users: user});
  });
};

const createUser = (req, res, next) => {
  debug(req.body.User);
  const newUser = new usersModel({name: 'jack', paw: 'test', age: 22});
  newUser.save( (err, data) => {
    if(err) {
      debug(err);
    }
    res.send(data);
  });
};

const updateUser = (req, res, next) => {
  const user = req.body.User;
  debug(user);
  usersModel.update({'_id': req.params.id}, user, (err, data) => {
    if(err) {
      debug(err);
    }
    res.send(data);
  });
};

const removeUser = (req, res, next) => {
  usersModel.remove({'_id': req.params.id}, (err, data) => {
    if(err) {
      debug(err);
    }
    // debug(data);
    res.send(data);
  });
};

module.exports = function(app) {

  app.get('/user', getUserList);

  app.get('/user/:id', getUser);

  app.post('/user', createUser);

  app.put('/user/:id', updateUser);

  app.delete('/user/:id', removeUser);
};
