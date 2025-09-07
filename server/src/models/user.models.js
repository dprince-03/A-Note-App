const mongoose = require('mongoose');

const userSchema = new mongoose.SchemaType({});

const user = mongoose.model('User', userSchema);

module.exports = user;