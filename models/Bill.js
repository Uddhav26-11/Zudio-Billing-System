const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true
    },

    cashierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        productName: String,

        quantity: Number,

        price: Number
      }
    ],

    subtotal: Number,

    gst: Number,

    totalAmount: Number,

    paymentMethod: {
      type: String,
      default: "Cash"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Bill", billSchema);