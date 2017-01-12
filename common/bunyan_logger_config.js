const path = require('path');

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    params: req.params,
    body: req.body
  };
}

function errSerializer(err) {
  return {
    message: err.message,
    stack: err.stack
  };
}


module.exports = app => {
  app.use(require('express-bunyan-logger')({
    name: 'logger',
    streams: [
      {
        level: 'info',
        stream: process.stdout            // log INFO and above to stdout
      },
      {
        level: 'error',
        path: path.join(__dirname, '../logs/error.log')  // log ERROR and above to a file
      }
    ],
    serializers: {
      req: reqSerializer,
      err: errSerializer
    }
  }));
};


