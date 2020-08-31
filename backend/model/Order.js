const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  itemname: {
    type: Int,
    required: true
  },
  itemnumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("order", OrderSchema);
