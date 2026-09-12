import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// Helper to upload buffer to Cloudinary
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    stream.end(buffer);
  });
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sunlight } = req.query;

    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by sunlight
    if (sunlight) {
      query['careInstructions.sunlight'] = sunlight;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error fetching products');
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      description,
      category,
      sunlight,
      watering,
      difficulty,
      isFeatured,
    } = req.body;

    // Handle image uploads
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await streamUpload(file.buffer);
        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const product = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      category: category || 'Indoor',
      images: uploadedImages,
      careInstructions: {
        sunlight: sunlight || 'Partial',
        watering: watering || 'Moderate',
        difficulty: difficulty || 'Easy',
      },
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid product data');
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      description,
      category,
      sunlight,
      watering,
      difficulty,
      isFeatured,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price ? Number(price) : product.price;
      product.stock = stock ? Number(stock) : product.stock;
      product.description = description || product.description;
      product.category = category || product.category;
      product.isFeatured = isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : product.isFeatured;

      if (sunlight || watering || difficulty) {
        product.careInstructions = {
          sunlight: sunlight || product.careInstructions.sunlight,
          watering: watering || product.careInstructions.watering,
          difficulty: difficulty || product.careInstructions.difficulty,
        };
      }

      // If new images are uploaded, append or replace? Let's append for simplicity, or user can delete manually (advanced feature).
      // Here we will just append new images. 
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await streamUpload(file.buffer);
          product.images.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid product data');
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Opt: delete images from cloudinary
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};
