// const User = require("../models/User");
const Conversation = require("../models/conversation.model")
const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		// تمام مکالماتی که کاربر در آن حضور دارد
		const conversations = await Conversation.find({ participants: loggedInUserId })
			.populate("participants", "username photo")
			.select("participants");

		// استخراج تمام یوزرهایی که طرف مکالمه هستند
		let users = [];

		conversations.forEach(conv => {
			conv.participants.forEach(user => {
				// خود کاربر لاگین شده را حذف می‌کنیم
				if (user._id.toString() !== loggedInUserId.toString()) {
					users.push(user);
				}
			});
		});

		// حذف کاربران تکراری
		const uniqueUsers = Array.from(new Map(users.map(u => [u._id.toString(), u])).values());

		res.status(200).json(uniqueUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};



//کد قبلی
// const getUsersForSidebar = async (req, res) => {
// 	try {
// 		const loggedInUserId = req.user._id;
		
// 		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
// 		res.status(200).json(filteredUsers);
// 	} catch (error) {
// 		console.error("Error in getUsersForSidebar: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

module.exports = { getUsersForSidebar };
