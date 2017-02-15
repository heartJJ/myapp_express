const debug = require('debug')('myapp');

module.exports = socket => {
  //socket.emit('news', { hello: 'world' });
  socket.on('news', data => {
    debug('news事件：' + data);
    socket.emit('my other event', { my: 'data' });
  });

  // socket.on('my other event', function (data) {
  //   debug(data);
  // });
};