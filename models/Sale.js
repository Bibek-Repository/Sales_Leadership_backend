const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  deals: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema, "agents");
