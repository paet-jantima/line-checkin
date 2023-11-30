import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        // required: true
      },
      lastName: {
        type: String,
        // required: true
      },
      userId: {
        type: String,
        // required: true
      },
      email: {
        type: String,
        // require: true,
        // unique : true
      },
      profileImage: {
        type: String,
        // require: false,
        default: "url"
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      roles: {
        type: [Schema.Types.ObjectId],
        require: true,
        ref: "Role"
      },
      phoneNumber: {
        type: String,
        // You might want to add validation for phone numbers
        // Example: validate: /^\d{10}$/ (10 digits only)
        // Or use libraries like `validator` for more complex validations
      },
      address: {
        type: String,
        // Add any specific validation as needed
      },
      jobPosition: {
        type: String,
        // Add specific validations or default values if required
      }
    },
    {
      timestamps: true,
    }
  );
  

export default mongoose.model("User",UserSchema);