const Conversation = require('../models/conversation.model');
const Message = require("../models/message.model"); // مدل پیام


// گرفتن مکالمات
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      members: userId
    }).populate("members", "username"," photo");

    res.status(200).json(conversations);
  } catch (error) {
    console.error("خطا در گرفتن مکالمات:", error);
    res.status(500).json({ message: "خطای سرور", error: error.message });
  }
};



// حذف مکالمه و پیام‌های مربوطه
const deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;

    // حذف مکالمه
    await Conversation.findByIdAndDelete(conversationId);

    // حذف تمام پیام‌های مرتبط
    await Message.deleteMany({ conversationId });

    res.status(200).json({ message: "مکالمه و پیام‌های مرتبط حذف شدند" });
  } catch (error) {
    console.error("❌ خطا در حذف مکالمه:", error);
    res.status(500).json({ message: "خطای سرور", error: error.message });
  }
};

// خروجی
module.exports = {
  getConversations,
  deleteConversation,
};
