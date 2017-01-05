const mongoose = require('../common/mongo_connect');

const usersSchema = require('../schemas/usersSchema');

const usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;