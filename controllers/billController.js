const Bill = require("../models/Bill");
const Product = require("../models/Product");

const createBill = async (req, res) => {
  try {
    console.log("USER =", req.user);
console.log("BODY =", req.body);
    const {
      products,
      paymentMethod
    } = req.body;

    let subtotal = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `${item.productName} not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.productName} stock insufficient`
        });
      }

      subtotal += product.price * item.quantity;

      product.stock -= item.quantity;

      await product.save();
    }

    const gst = subtotal * 0.18;

    const totalAmount = subtotal + gst;

    const bill = await Bill.create({
      billNumber: `BILL-${Date.now()}`,
      cashierId: req.user.id,
      products,
      subtotal,
      gst,
      totalAmount,
      paymentMethod
    });

    res.status(201).json(bill);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("cashierId", "name email");

    res.json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBill,
  getBills
};