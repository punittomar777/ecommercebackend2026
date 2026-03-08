const Order = require("../models/order.model");
// const redisClient = require("../config/redis")

// GET ALL ORDERS (Public)
exports.getOrders = async (req, res, next) => {
  try {
    // const cacheKey = `products:${JSON.stringify(req.query)}`;

    // 1 Check cache
    // const cachedData = await redisClient.get(cacheKey);
    // if (cachedData) {
    //   return res.json(JSON.parse(cachedData));
    // }

    const { status, amount } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (amount) filter.amount = amount;

    // 2 Fetch from DB
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    // 3 Save to cache (TTL 60 sec)
    // await redisClient.setEx(
    //   cacheKey,
    //   60,
    //   JSON.stringify(products)
    // );

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE ORDER
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    next(error);
  }
};
