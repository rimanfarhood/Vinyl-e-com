const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  const { items } = data;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map(item => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // öre
      },
      quantity: item.quantity,
    })),
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return { id: session.id };
});