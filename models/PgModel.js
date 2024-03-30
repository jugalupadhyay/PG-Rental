const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    varients: [],
    facility: [],
    facilityPrices: [],
    prices: [],
    otherfacilities: [],
    catagory: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PgModel = mongoose.model("pgs", pgSchema);

module.exports = PgModel;
