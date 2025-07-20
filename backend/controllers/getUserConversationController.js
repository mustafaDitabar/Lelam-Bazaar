const Conversation = require("../models/conversation.model");

const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id; // آیدی کاربر لاگین شده از توکن

    // پیدا کردن تمام مکالماتی که userId جز participants است
    const conversations = await Conversation.find({
      participants: userId
    }).populate("participants", "username photo");


    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در گرفتن مکالمات" });
  }
};

module.exports = { getUserConversations };



// // controllers/conversation.controller.js

// const Conversation = require("../models/conversation.model");

// const createConversation = async (req, res) => {
//     try {
//         const senderId = req.user._id;
//         const { receiverId } = req.body;

//         // بررسی وجود مکالمه قبلی
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         }).populate("participants", "username photo");

//         // اگر وجود ندارد بساز
//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });

//             conversation = await Conversation.findById(conversation._id).populate("participants", "username photo");
//         }

//         res.status(200).json(conversation);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// module.exports = {createConversation};


