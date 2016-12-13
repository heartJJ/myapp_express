const mongoose = require('mongoose');

const UsersSchema = require('../schemas/usersSchema');

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;