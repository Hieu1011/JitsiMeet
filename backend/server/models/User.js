const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true
        },
        avatarUrl: {
          type: String,
        },
        role: {
          type: Number,
          required: true,
          enum: [1, 2, 3] // 1: admin, 2: manager, 3: user
        }
      },
      { timestamps: true }
);
  
module.exports = mongoose.model('User', userSchema);