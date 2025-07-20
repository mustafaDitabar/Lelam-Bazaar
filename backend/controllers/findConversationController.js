const Conversation = require('../models/conversation.model');
const mongoose = require('mongoose');

const findConversation = async (req, res) => {
  try {
    const { userId, sellerId } = req.params;
    console.log(userId, sellerId, "یوزر آیدی و فروشنده");

    // جستجو مکالمه‌ای که هر دو نفر عضو آن باشند
    let conversation = await Conversation.findOne({
      participants: {
        $all: [
          mongoose.Types.ObjectId(userId),
          mongoose.Types.ObjectId(sellerId)
        ]
      }
    }).populate('participants', 'username photo');

    if (conversation) {
      console.log(conversation, "مکالمه پیدا شد");
      return res.status(200).json(conversation);
    }

    // اگر مکالمه پیدا نشد، مکالمه جدید ایجاد کن
    conversation = await Conversation.create({
      participants: [
        mongoose.Types.ObjectId(userId),
        mongoose.Types.ObjectId(sellerId)
      ]
    });

    // Populate کن تا info طرفین رو هم بده
    conversation = await Conversation.findById(conversation._id).populate('participants', 'username photo');

    console.log(conversation, "مکالمه جدید ایجاد شد");
    res.status(201).json(conversation);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطا در پیدا کردن یا ایجاد مکالمه' });
  }
};

module.exports = {
  findConversation
};



// const Conversation = require('../models/conversation.model');
// const mongoose = require('mongoose');

// const findConversation = async (req, res) => {
//   try {
//     const { userId, sellerId } = req.params;
// console.log(userId,sellerId,"یوزر آیدی و فرشنده");
//     // جستجو مکالمه‌ای که هر دو نفر عضو آن باشند
//     const conversation = await Conversation.findOne({
//        participants: { $all:
//          [
//      mongoose.Types.ObjectId(userId), 
//      mongoose.Types.ObjectId(sellerId)
        
//         ] 


//        }
//     }).populate('participants', 'username photo');

//     console.log(conversation,"کانوسیشن");
//     if (!conversation) {
//       return res.status(404).json({ message: 'مکالمه‌ای بین این کاربران یافت نشد' });
//     }

//     res.status(200).json(conversation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'خطا در پیدا کردن مکالمه' });
//   }
// };

// module.exports = {
//   findConversation
//   // سایر کنترلرها مثل createConversation
// };
