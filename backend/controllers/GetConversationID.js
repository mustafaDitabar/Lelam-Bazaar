// controllers/conversation.controller.js
const Conversation = require("../models/conversation.model");

const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate("participants", "-password");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error("Error in getConversationById:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getConversationById };
