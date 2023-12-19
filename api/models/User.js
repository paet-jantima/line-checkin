const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    userId: {
      type: String,
    },
    email: {
      type: String,
      default: ""
    },
    profileImage: {
      type: String,
      default: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    roles: {
      type: [Schema.Types.ObjectId],
      ref: "Role"
    },
    phoneNumber: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    jobPosition: {
      type: String,
      default: ""
    },
    absentDays: {
      type: Number,
      default: 0,
    },
    lateDays: {
      type: Number,
      default: 0,
    },
    nickname: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
