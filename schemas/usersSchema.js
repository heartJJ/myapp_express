const mongoose = require('../common/mongo_connect');

const UsersSchema = new mongoose.Schema({
  name: String,
  paw: String,
  age: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
  info: Array,
  address: Object
});

UsersSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else {
    this.meta.updateAt = Date.now();
  }
  next();
});

UsersSchema.statics = {
  fetch: function(cb) { //查询所有数据
    return this
         .find()
         .sort('meta.updateAt') //排序          
         .exec(cb); //回调
  },
  findById: function(id, cb) { //根据id查询单条数据
    return this
        .findOne({_id: id})          
        .exec(cb);
  }
};




module.exports = UsersSchema;