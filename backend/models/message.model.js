	const  mongoose =require("mongoose")

	const messageSchema = new mongoose.Schema(
		{
			senderId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			receiverId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			message: {
				type: String,
				required: false,
			},
		
			 image: {
                type: String, // مسیر عکس
                default: null,
            },
			
		},
		{ timestamps: true }
	);

	const Message = mongoose.model("Message", messageSchema);


	module.exports =  Message;
