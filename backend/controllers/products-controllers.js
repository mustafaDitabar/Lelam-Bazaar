const Product = require('../models/products');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, price } = req.body;

    const newProduct = new Product({
      title,
      price
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product Created', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports={
getAllProducts,
getOneProduct,
addProduct,
}
