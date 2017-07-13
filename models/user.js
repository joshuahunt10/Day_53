const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  decks:[{
    id: {type: String},
    name: {type: String}
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User;
