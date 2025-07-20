
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // ← اضافه شده
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  roles: {
    User: { type: Number, default: 1000 },
    Admin: Number,
  },
  googleId: { type: String, unique: true, sparse: true }, // ← اصلاح شده
  name: { type: String },
  
  email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
},

  chatId:{
type:String
  },
  photo: {
    type: String,
    default: null,
  },
  password: { type: String },
  refreshToken: [String],
}, { timestamps: true });


// ← middleware هش کردن پسورد
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
