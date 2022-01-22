const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (str) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(str);
      },
      message: 'Please enter a valid email address'
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const User = model('user', UserSchema)
module.exports = User;