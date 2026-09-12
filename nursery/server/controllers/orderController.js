import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      customerName,
      customerEmail,
      customerPhone,
      address,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      couponCode,
      discountAmount,
      razorpayOrderId
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const orderId = 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);
      const order = new Order({
        orderId,
        customerName,
        customerEmail,
        customerPhone,
        address,
        products: orderItems.map((item) => ({ ...item, product: item.product })),
        paymentMethod,
        totalAmount: itemsPrice + taxPrice + shippingPrice,
        finalAmount: totalPrice,
        couponApplied: {
          code: couponCode || null,
          discountAmount: discountAmount || 0,
        },
        razorpayOrderId: razorpayOrderId || null,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending',
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.orderStatus || order.orderStatus;
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update order to paid (Internal/Webhook use mainly)
// @route   PUT /api/orders/:id/pay
// @access  Public
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.paymentStatus = 'Completed';
      order.razorpayPaymentId = req.body.razorpayPaymentId;
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
