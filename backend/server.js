require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

// Allow your frontend to communicate with backend
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// Map your product IDs → Stripe price IDs (replace with real ones)
const PRICE_MAP = {
  "black-og-shirt": "price_1SVkJvQrNnjytm3DBIiev5YF",
  "white-og-shirt": "price_1SVkKKQrNnjytm3DhLoOjwqO",
  "white-aces-and-reds": "price_1SVkKpQrNnjytm3Dauuc5bOO",
  "black-aces-and-reds": "price_1SVkL6QrNnjytm3DC55ozjgf",
  "black-silver-surfer": "price_1SVkLbQrNnjytm3Dmvtrbhl9",
  "white-silver-surfer": "price_1SVkLLQrNnjytm3DTvZttmvw",
};

// Checkout endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const cart = req.body.cart || [];

    if (!cart.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.map((item) => {
      const priceId = PRICE_MAP[item.productId];
      if (!priceId)
        throw new Error("Missing price for product: " + item.productId);
      return { price: priceId, quantity: item.qty };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: "http://127.0.0.1:5500/success.html",
      cancel_url: "http://127.0.0.1:5500/cart.html",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Drunk Cigs backend running at http://localhost:${PORT}`);
});
