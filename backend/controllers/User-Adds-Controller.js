const Ad = require("../models/addProducts");
const { getImageFullPath, deleteFileIfExists, URL_PREFIX } = require("../utils/file-User-Add");

// حذف آگهی و عکس‌های آن
const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ message: "آگهی یافت نشد" });

    ad.imagesURLs?.forEach((imgPath) => {
      const fullPath = getImageFullPath(imgPath);
      deleteFileIfExists(fullPath);
    });

    res.json({ message: "آگهی حذف شد" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در حذف آگهی" });
  }
};

// بروزرسانی آگهی
const updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: "آگهی یافت نشد" });
    res.json(updatedAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در بروزرسانی آگهی" });
  }
};

// حذف یک عکس از آگهی
const removeImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "آگهی یافت نشد" });

    ad.imagesURLs = ad.imagesURLs.filter((img) => img !== imageUrl);
    await ad.save();

    const fullPath = getImageFullPath(imageUrl);
    deleteFileIfExists(fullPath);

    res.json({ message: "عکس حذف شد", imagesURLs: ad.imagesURLs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در حذف عکس" });
  }
};

// آپلود عکس جدید برای آگهی
const uploadImage = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "آگهی یافت نشد" });

    // مسیر ذخیره‌شده فقط "images/..."
    const relativeImagePath = `images/${req.file.filename}`;

    ad.imagesURLs.push(relativeImagePath); // ذخیره فقط بخش نسبی
    await ad.save();

    res.json({
      message: "عکس آپلود شد",
      imageUrl: `http://localhost:3500/${relativeImagePath}`, // آدرس کامل برای نمایش
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در آپلود عکس" });
  }
};


module.exports = {
  uploadImage,
  removeImage,
  updateAd,
  deleteAd,
};
