const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// ⬇️ اول userSocketMap را تعریف کن
const userSocketMap = {}; // {userId: socketId}

// ⬇️ حالا لاگ بگیر

// فقط اگر receiverId در دسترس است
// console.log("🎯 receiverId (string):", receiverId.toString()); ← اینجا ممکنه receiverId تعریف نشده باشه!

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId.toString()];
};

io.on("connection", (socket) => {
	

	const userId = socket.handshake.auth.userId;
	

	if (userId !== undefined) {
		userSocketMap[userId.toString()] = socket.id;
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));


	socket.on("disconnect", () => {
		
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports = { app, io, server, getReceiverSocketId };






// const  { Server } =require( "socket.io")
// const  http =require("http") 
// const  express =require("express") 

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: ["http://localhost:3000"],
// 		methods: ["GET", "POST"],
// 		credentials: true,
// 	},
// });




// const userSocketMap = {}; // {userId: socketId}

//  const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId.toString()];
// };



// io.on("connection", (socket) => {
// 	console.log("a user connected >>>>>>>>>>>", socket.id);

// 	// const userId = socket.handshake.query.userId;
// 	const userId = socket.handshake.auth.userId;
// 	console.log("📲 کاربر وصل شد:", userId, "با socket:", socket.id);
// 	if (userId !== undefined) userSocketMap[userId.toString()] = socket.id;
	
// 	// io.emit() is used to send events to all the connected clients
// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// 	// socket.on() is used to listen to the events. can be used both on client and server side
// 	socket.on("disconnect", () => {
// 		console.log("user disconnected", socket.id);
// 		console.log("❌ کاربر قطع شد:", socket.id)
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// module.exports = { app, io, server,getReceiverSocketId };
