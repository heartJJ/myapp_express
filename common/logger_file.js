const morgan = require('morgan'),
  fs = require('fs'),
  path =  require('path'),
  fileStreamRotator = require('file-stream-rotator');

const logDir = path.join(__dirname, '../logs');

fs.existsSync(logDir) || fs.mkdirSync(logDir);
// create a rotating write stream
const accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDir, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: true
});

// morgan.token('id',  (req) => {
//   return req.id;
// });

module.exports = (app) => {
  app.use(morgan('short'));
  app.use(morgan('common', {stream: accessLogStream}));
};