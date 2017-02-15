$(function() {
  
  let username, msg;

  const socket = io(), 
    $loginPage = $('.login.page'), // The login page
    $chatPage = $('.chat.page'), // The chatroom page
    $usernameInput = $('.usernameInput'),
    $inputMessage = $('.inputMessage'),
    $message = $('.messages');

  $usernameInput.keydown( (event) => {
    if (event.keyCode === 13) {  // 按下回车键
      username = $usernameInput.val();
      socket.emit('add user', username);
    } 
  });

  $inputMessage.keydown( event => {
    if (event.keyCode === 13) {
      msg = $inputMessage.val();
      socket.emit('new message', msg);
    }
  });

  socket.on('login', (data) => {
    console.log('登录聊天室成功');
    $loginPage.hide();
    $chatPage.show();
    const $el = $('<li>').addClass('log').text(`您已加入聊天室，当前在线人数为：${data.numUsers}人`);
    $message.append($el);
  });

  socket.on('user joined', (data) => {
    console.log('有新用户加入');
    const $el = $('<li>').addClass('log').text(`${data.username}加入聊天室，当前在线人数为${data.numUsers}人`);
    $message.append($el);
  });

  socket.on('invalid username', data => {
    console.log(data);
  });

  socket.on('msg to other', data => {
    const $el = $('<li>').addClass('log').text(`${data.username}：${data.message}`);
    $message.append($el);
  });

  socket.on('msg to self', data => {
    const $el = $('<li>').addClass('log').text(`${data.message}`);
    $message.append($el);
  });

  socket.on('user left', data => {
    console.log('断开连接');
    const $el = $('<li>').addClass('log').text(`${data.message}`);
    $message.append($el);
  });

});
