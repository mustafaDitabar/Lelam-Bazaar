require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser");
const {app,server} =require("./socket/socket.js")
const GoogleAuth = require("./routes/api/GoogleAuth")
const passport = require("../backend/passport");
const connectDB = require("./config/dbConfig");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credential.js");
const protectRoute = require("./middlewares/protectRoute.js");
const PORT = process.env.PORT || 3500;
const path = require('path');


connectDB();
app.use(express.json({ limit: '5mb' })); // یا هر مقداری که فکر می‌کنی کافیه
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));




app.use(session({
  name: "session",
  secret: "cyberwolve",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false ,
    sameSite: "lax",         
    maxAge: 24 * 60 * 60 * 1000
  }
}));   
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('public'));
app.use(passport.initialize());      
app.use(passport.session()); 

app.use("/auth", GoogleAuth);  

// public routes

app.use("/auth", require("./routes/api/auth"));
app.use("/register", require("./routes/api/register.js"));


app.use("/api/messages", require("./routes/message.routes.js" ));
app.use("/api/users", require("./routes/user.routes.js"));
app.use("/api/users-A", require("./routes/Allusers-A.js"));
app.use('/api', require("./routes/api/categoryRoute-A.js"));
app.use("/api", require("./routes/api/Delete-Route-A.js"));
app.use("/api", require("./routes/api/Delete-User-Route.js"));
app.use("/api/categories-PUT-A",require("./routes/Update-Category-A.js"))
app.use("/api",require("./routes/api/Delete-Category-A.js"))
app.use('/api/admin', require("./routes/Chart-AllUser-AllAdd.js"));
app.use('/api/adds-ADMIN', require("./routes/Adds.Admin-Routes.js"));
app.use('/api',require("./routes/User-Adds-Routes.js"))
app.use('/api/admin', require("./routes/Chart-A-Route.js"));
app.use('/api', require("./routes/api/Adds-Users-Route.js"));

//ismat
app.use('/api/add-d', require("./routes/add.js"));
app.use('/api/add-i', require("./routes/addRoutes.js"));
app.use('/api/add', require("./routes/addRoutes.js"));
app.use('/api/adds', require("./routes/MashBi.js"));
app.use('/api/adds', require("./routes/All-Adds-By-Category.js"));

app.use('/api', require("./routes/categoryRoutes.js"));
app.use('/api', require("./routes/addsRoutes.js"));
app.use('/api', require("./routes/addsRoutes.js"));

app.use('/api', require("./routes/adds-A-Routes.js"));

app.use("/api/auth/logout", require("./routes/api/logout.js"));

//پسورد
app.use("/forgot-password",require("./routes/api/forgotPassword"));
app.use("/reset-password",require("./routes/api/resetPassword"));

app.use(protectRoute);
app.use("/refresh", require("./routes/api/refresh.js"));
app.use('/api/conversations',require("../backend/routes/api/getConversation.js"));
app.use("/api/users", require("../backend/routes/api/CurrentPassword.js"));
app.use("/api/users", require("../backend/routes/profile.js"));
app.use("/api", require("../backend/routes/api/getUserConversation.js"));
app.use("/api/users", require("../backend/routes/user.routes.js"));
app.use('/api/conversations', require('./routes/api/findConversation.js'));
app.use('/api/conversations', require('./routes/GetConversationID.js'));



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use((err, req, res,next) => {
  console.error("❌ خطای ثبت‌نام:", err); 
  res.status(500).send(err.message);
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  
});

server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
