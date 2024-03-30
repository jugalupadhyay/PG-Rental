const express = require("express");
const router = express.Router();
const pg = require("../models/PgModel");

router.get("/getallpgs", async (req, res) => {
  try {
    const pgs = await pg.find({});
    res.send(pgs);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addpg", async (req, res) => {
  const pgdata = req.body.pg;

  try {
    const newpg = new pg({
      name: pgdata.name,
      images: pgdata.images,
      varients: ["Single_Sharing", "double_Sharing", "triple_Sharing"],
      facility: ["AC", "Non-AC"],
      description: pgdata.description,
      catagory: pgdata.catagory,
      prices: [pgdata.prices],
      facilityPrices: [pgdata.facilityPrices],
      otherfacilities: pgdata.otherfacilities,
    });
    await newpg.save();
    res.send("New PG Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletepg", async (req, res) => {
  const pgid = req.body.pgid;

  try {
    await pg.findOneAndDelete({ _id: pgid });
    res.send("PG Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
