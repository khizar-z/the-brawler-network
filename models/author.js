const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: String,
  userID: String,
  isMuted: Boolean
})

module.exports = mongoose.model('Users', authorSchema);