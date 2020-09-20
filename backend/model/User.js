const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  order: {
    type: [
      {
        id: Number,
        title: String,
        desc: String,
        price: Number,
        quantity: { type: Number, default: 1, min: 0 },
        img: String,
      },
    ],
    default: [],
  },
  shipment: { type: Boolean, default: false },
});

UserSchema.methods.calsum = function () {
  const amountarr = this.order.map((item) => item.price * item.quantity);
  console.log("amountarr", amountarr);
  const totalamount = amountarr.reduce((total, cur) => total + cur);
  return totalamount;
};

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
