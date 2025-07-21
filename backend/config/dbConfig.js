const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const connectDB = async () => {
  console.log("📡 Connecting to MongoDB with URI:", process.env.DATABASE_URL);
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
