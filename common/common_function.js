const co = require('co'),
  debug = require('debug')('myapp');

exports.functionHandle = fn => {
  return (req, res, next) => {
    co(fn(req, res, next))
    .then(data => {
      data = data || {};
      return data;
    })
    .catch(err => {
      debug(err);
      // process.exit();
      return err;
    });
  };
};