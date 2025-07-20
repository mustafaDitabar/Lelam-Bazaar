// controllers/add.controller.js
const Add = require("../models/addProducts");

const getAddById = async (req, res) => {
  try {
    const add = await Add.findById(req.params.id);
    if (!add) {
      return res.status(404).json({ message: 'آگهی پیدا نشد' });
    }
    res.json(add);

  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت آگهی', error: err.message });
  }
};

module.exports = { getAddById };
