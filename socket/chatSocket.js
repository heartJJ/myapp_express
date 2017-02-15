const debug = require('debug')('myapp');

let numUsers = 0;
let userList = [];

module.exports = socket => {

  // 新用户加入聊天室
  socket.on('add user', function (username) {
    const user = userList.find(user => user.name === username);
    if (user) {
      socket.emit('invalid username', '用户名被占用');
    } else {
      // we store the username in the socket session for this client
      socket.username = username;
      userList.push({name: username, socket: socket});
      // debug('用户列表为:', userList);
      ++numUsers;
      socket.emit('login', {
        numUsers: numUsers
      });
      // 发送消息给除了自己之外的客户端
      socket.broadcast.emit('user joined', {
        username: username,
        numUsers: numUsers
      });
    }
  });

  // 发送消息
  socket.on('new message', data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('msg to other', {
      username: socket.username,
      message: data
    });

    socket.emit('msg to self', {
      message: data
    });
  });

  // 断开连接，无需客户端主动 emit 事件
  socket.on('disconnect', function () {
    --numUsers;
    const index = userList.findIndex(user => user.name === socket.username);
    userList.splice(index, 1);
    socket.broadcast.emit('user left', {
      message: `${socket.username}用户离开聊天室，当前在线人数为${numUsers}人`
    });
  });
  
};
  