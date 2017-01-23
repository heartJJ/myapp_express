const debug = require('debug')('myapp'),
  {functionHandle} = require('../common/common_function'),
  // userService = require('../services/userService');
  {userService} = require('../services');


const getUserList = functionHandle(function*(req, res, next) {
  // usersModel.fetch((err, userList) => { // 定义在userSchema中, 回调的方式
  //   if(err) {
  //     debug(err);
  //   }
  //   // res.send({title: '用户列表', users: userList});
  //   res.render('users', {title: '用户列表', users: userList});
  // });

  // usersModel.find().exec().then( data => {  // promise then 调用
  //   res.render('users', {title: '用户列表', users: data});
  // });
  const data = yield userService.getUserList();
  res.render('users', {title: '用户列表', users: data});
});


// const getUser = (req, res, next) => {
//   debug('根据id查询单个用户');
//   usersModel.findOne({'_id': req.params.id}, (err, user) => {
//     if(err) {
//       debug(err);
//     }
//     res.send({title: '单个用户详情', users: user});
//   });
// };
const getUser = functionHandle(function*(req, res, next) {
  const data = yield userService.getUser(req.params.id);
  res.send({title: '单个用户详情', users: data});
});

const createUser = functionHandle(function*(req, res, next) {
  const data = yield userService.createUser(req.Body.User);
  res.send(data);
});

const updateUser = functionHandle(function*(req, res, next) {
  const data = yield userService.updateUser(req.params.id, req.Body.User);
  res.send(data);
});

const removeUser = functionHandle(function*(req, res, next) {
  const data = yield userService.removeUser(req.params.id);
  res.send(data);
});

module.exports = function(app) {

  app.get('/user', getUserList);

  app.get('/user/:id', getUser);

  app.post('/user', createUser);

  app.put('/user/:id', updateUser);

  app.delete('/user/:id', removeUser);
};
