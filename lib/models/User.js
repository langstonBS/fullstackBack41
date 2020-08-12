
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash,
      delete ret.__v,
      delete ret.id;
    }
  }
});

schema.virtual('password').set(function(plainTextPassword) {
  const passwordHash = bcrypt.hashSync(plainTextPassword + process.env.SALT_ROUNDS);
  this.passwordHash = passwordHash;
});

schema.statics.authorize = async function(email, password) {
  const user = await this.findOne({ email });
  if(!user) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }
  const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  if(!passwordsMatch) {
    const error = new Error('Invalid email/password');
    error.status = 401;
    throw error;
  }

  return user;
};

module.exports = mongoose.model('User', schema);
