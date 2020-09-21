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
        quantity: { type: Number, default: 1 },
        img: String,
      },
    ],
    default: [],
  },
  shipment: { type: Boolean, default: false },
});

UserSchema.methods.calsum = function () {
  if (this.order.length === 0) {
    return 0;
  } else {
    const amountarr = this.order.map((item) => item.price * item.quantity);
    console.log("amountarr", amountarr);
    const reducer = (total, cur) => total + cur;
    const totalamount = amountarr.reduce(reducer, 0);
    return totalamount;
  }
};

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
