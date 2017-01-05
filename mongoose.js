/**
 * mongoose quickly start demo 
 * 与项目中其他文件无关，可单独执行
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/runoob');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('connection success...');
});

const kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  const greeting = this.name ? 'Meow name id' + this.name : 'I don not have a name';
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({
  name: 'fluffy'
});

fluffy.save(function (err, res) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
  console.log('执行完毕');
  process.exit();
});