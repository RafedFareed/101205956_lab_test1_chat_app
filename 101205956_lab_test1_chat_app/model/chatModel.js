const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;