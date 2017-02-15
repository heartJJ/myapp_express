//var socket = io.connect('http://localhost:3000/chat/demo');
const socket = io();
// socket.on('news', function (data) {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

function a () {
  console.log('按钮被点击，发送news事件');
  socket.emit('news', '测试news事件');
}

socket.on('my other event', function(data) {
  console.log(data);
});