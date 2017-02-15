
const getChatRoom = (req, res, next) => {
  //res.sendfile(resolve(__dirname, '../views/chat/chat.html'));
  res.render('chat/chat');
};

const getDemoPage = (req, res, next) => {
  res.render('chat/demo');
};


module.exports = app => {

  // 进入聊天室
  app.get('/chat', getChatRoom);

  app.get('/chat/demo', getDemoPage);

};