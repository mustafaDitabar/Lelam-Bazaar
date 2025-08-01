const  mongoose = require( "mongoose")

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [ 
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation


// models/Conversation.js
// const mongoose = require("mongoose");

// const conversationSchema = new mongoose.Schema(
//   {
//     members: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Conversation", conversationSchema);
