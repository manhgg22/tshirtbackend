import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file?.filename;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image: `/uploads/${image}`,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};