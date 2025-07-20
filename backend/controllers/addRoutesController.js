const AddProduct = require("../models/addProducts");
const Category = require("../models/Category"); // ایمپورت مدل دسته‌بندی

const getAdds = async (req, res) => {
  try {
    const adds = await AddProduct.find().populate('categoryId');
    res.status(200).json(adds);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت آگهی‌ها' });
  }
};


const createAdd = async (req, res) => {
    console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  try {
    let { title, categoryId, description, phoneNumber, location, price } = req.body;

    if (!title || !categoryId || !price) {
      return res.status(400).json({ error: 'فیلدهای الزامی وارد نشده‌اند.' });
    }
   
    const imageUrls = req.files.map(file => `http://localhost:3500/images/${file.filename}`);

    const newAdd = new AddProduct({
      title,
      categoryId, // حالا categoryId یک ObjectId است
      description,
      phoneNumber,
      location,
      price,
      imagesURLs: imageUrls,
      creatorId: req.user._id 
    });

    await newAdd.save();
    res.status(201).json(newAdd);

  } catch (error) {
    console.error('❌ خطا در ذخیره آگهی:', error);
    res.status(400).json({ error: error.message });
  }
};
 module.exports={
  getAdds,
  createAdd
 }