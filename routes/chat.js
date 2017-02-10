const {resolve} = require('path');

const getChatRoom = (req, res, next) => {
  //res.sendfile(resolve(__dirname, '../views/chat/chat.html'));
  res.render('chat/chat');
};


module.exports = app => {

  // 进入聊天室
  app.get('/chat', getChatRoom);

};