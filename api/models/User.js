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
        default: ""
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
        default: ""
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
      }
    },
    {
      timestamps: true,
    }
  );
  

export default mongoose.model("User",UserSchema);