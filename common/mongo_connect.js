const mongoose = require('mongoose'),
  config = require('../config/mongo_config.json')['local'];

mongoose.connect(`mongodb://${config.username}:${config.password}@localhost/${config.database}`);

mongoose.Promise = global.Promise; // use native promise(also bluebird, q)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('connection success...');
});

module.exports = mongoose;