const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true  
  },
  streetname: {
    type: String,
    required: true,
  },
  cityname: {
    type: String,
    required: true,
  },
  statename: {
    type: String,
    required: true,
  },
  countryname: {
    type: String,
    required: true,
  },
  postalcode: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;