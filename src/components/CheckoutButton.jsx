import { stripePromise } from "../services/stripe";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function CheckoutButton({ cartItems }) {
  const handleCheckout = async () => {
    const functions = getFunctions();
    const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");

    const res = await createCheckoutSession({
      items: cartItems,
    });

    const stripe = await stripePromise;

    await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
  };

  return <button onClick={handleCheckout}>Betala</button>;
}