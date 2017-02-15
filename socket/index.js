const debug = require('debug')('myapp'),
  demoSocket = require('./demoSocket'),
  chatSocket = require('./chatSocket');

// when the client emits 'new message', this listens and executes
module.exports = socket => {

  demoSocket(socket);  // 官方例子

  chatSocket(socket); // 聊天室

};

