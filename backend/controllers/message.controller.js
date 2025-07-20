const  Conversation =require("../models/conversation.model.js"); 
const  Message=require("../models/message.model.js") 
const  { getReceiverSocketId, io } =require("../socket/socket.js") 

const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// 📷 اگر عکس وجود دارد فقط آدرس آن ذخیره شود
		let imageUrl = null;
		if (req.file) {
			// فرض بر اینکه فایل‌ها در /uploads ذخیره می‌شن
			imageUrl = `/uploads/${req.file.filename}`;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message: message || "",
			image: imageUrl, // فقط آدرس نه باینری
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		// 📡 ارسال پیام به گیرنده از طریق سوکت
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};




 const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
module.exports = {getMessages,sendMessage}