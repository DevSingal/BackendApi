import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        required: true,
        type: String,
        select: false,
      }
})

const User = new mongoose.model("users", userSchema);

export default User;
