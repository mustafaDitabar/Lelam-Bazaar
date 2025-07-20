const Add =require("../models/addProducts") 

// حذف آگهی بر اساس ID
 const deleteAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const add = await Add.findById(id);
    if (!add) {
      return res.status(404).json({ message: "آگهی پیدا نشد" });
    }

    await add.remove();

    res.status(200).json({ message: "آگهی با موفقیت حذف شد" });
  } catch (error) {
    console.error("خطا در حذف آگهی:", error);
    res.status(500).json({ message: "خطای سرور در حذف آگهی" });
  }
};
module.exports=deleteAdById;