const Product = require("../models/product.model");
// const redisClient = require("../config/redis")

// CREATE (Admin only)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id
    });
    
    // await redisClient.del("products:*");
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS (Public)
exports.getProducts = async (req, res, next) => {
  try {

      // const cacheKey = `products:${JSON.stringify(req.query)}`;

    // 1 Check cache
    // const cachedData = await redisClient.get(cacheKey);
    // if (cachedData) {
    //   return res.json(JSON.parse(cachedData));
    // }

    const { category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 2 Fetch from DB
    const products = await Product.find(filter).sort({ createdAt: -1 });

     // 3 Save to cache (TTL 60 sec)
    // await redisClient.setEx(
    //   cacheKey,
    //   60,
    //   JSON.stringify(products)
    // );

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE (Admin only)
exports.updateProduct = async (req, res, next) => {
  
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // await redisClient.del("products:*");

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE (Admin only)
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
    // await redisClient.del("products:*");
  } catch (error) {
    next(error);
  }
};