const express = require("express");
const router = express.Router();
const pg = require("./models/PgModel");
const db = require("./db");
const app = express();
const cors = require("cors");
app.use(cors());
require("./models/model");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(require("./routes/auth"));
const pgRoute = require("./routes/pgRoute");
app.get("/", (req, res) => {
  res.send("Server working");
});
app.use("/api/pgs/", pgRoute);
const stripe = require("stripe")(
  "" //write stripe api eg: sk_test...
);
const port = process.env.PORT || 8000;
app.listen(port, () => "Server running on port port" + port);
console.log(port);
app.use(express.static("public"));
const baseUrl = "http://localhost:8000";

app.get("/search/:key", async (req, resp) => {
  try {
    let data = await pg.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { description: { $regex: req.params.key, $options: "i" } },
      ],
    });
    resp.send(data);
  } catch (error) {
    console.error("Error searching:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: product.images,
        selectedCheckboxes: product.selectedCheckboxes,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));

  const pgname = products[0].name;
  const price = products[0].price;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/success?name=${pgname}&price=${price}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.send({ id: session.id });
});

app.post("/notary-payment", async (req, res) => {
  const { products } = req.body;

  try {
    // Prepare line items for the checkout session
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr", // Change currency according to your requirements
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const price = products[0].price;

    console.log("Total Payment Amount:", price);
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/successnotary?price=${price}`,
      cancel_url: "http://localhost:3000/cancelnotary",
    });

    // Send session ID back to the client
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the checkout session" });
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
    });
    await newpg.save();
    res.send("New PG Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
