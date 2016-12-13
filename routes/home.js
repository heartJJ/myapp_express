/**
 * 首页
 */

const renderHomePage = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

module.exports = function(app) {

  app.get('/', renderHomePage);
};

