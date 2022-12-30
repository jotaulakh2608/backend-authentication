import mongoose from "mongoose";
import bcrypt from "bcrypt";
import autoIncrement from "mongoose-auto-increment";

const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
});

userSchema.statics.signup = async function (email, password) {
  const emailExists = await user.findOne({ email });
  if (emailExists) {
    throw Error("User already exists");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const User = user({
      email: email,
      password: hash,
    });
    await User.save();
    return User;
  } catch (error) {
    if (error.message.includes("validation")) {
      throw Error(error.message.split(":")[2]);
    }

    throw Error(error.message);
  }
};
userSchema.statics.login = async function (email, password) {
  try {
    const User = await user.findOne({ email });
    if (!User) {
      throw Error("User does not exist");
    }
    const match = await bcrypt.compare(password, User.password);
    if (!match) {
      throw Error("Password does not match");
    }
    return User;
  } catch (error) {
    throw Error(error.message);
  }
};

const user = mongoose.model("user", userSchema);

export default user;
