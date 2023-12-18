import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        // required: true
        default: ""
      },
      lastName: {
        type: String,
        // required: true
        default: ""
      },
      userId: {
        type: String,
        // required: true
        
      },
      email: {
        type: String,
        // require: true,
        // unique : true
        default: ""
      },
      profileImage: {
        type: String,
        // require: false,
        default: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      roles: {
        type: [Schema.Types.ObjectId],
        //require: true,
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
  

export default mongoose.model("User",UserSchema);