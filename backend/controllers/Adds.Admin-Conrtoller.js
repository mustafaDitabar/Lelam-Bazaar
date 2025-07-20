const Ad = require('../models/addProducts'); // مطمئن شو مدل آگهی درست ایمپورت شده

// تأیید آگهی
const approveAd = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAd = await Ad.findByIdAndUpdate(
      id,
      { isAccepted: true },
      { new: true }
    );

    if (!updatedAd) {
      return res.status(404).json({ message: 'آگهی یافت نشد.' });
    }

    res.status(200).json({ message: 'آگهی تأیید شد.', ad: updatedAd });
  } catch (error) {
    console.error('خطا در تأیید آگهی:', error);
    res.status(500).json({ message: 'خطا در تأیید آگهی.' });
  }
};

// حذف آگهی
const deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return res.status(404).json({ message: 'آگهی پیدا نشد.' });
    }

    res.status(200).json({ message: 'آگهی حذف شد.' });
  } catch (error) {
    console.error('خطا در حذف آگهی:', error);
    res.status(500).json({ message: 'خطا در حذف آگهی.' });
  }
};

module.exports = { approveAd, deleteAd };
