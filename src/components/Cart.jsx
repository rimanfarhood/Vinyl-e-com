import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const cartItems = [
    { name: "Vinyl 1", price: 199, quantity: 1 },
  ];

  return (
    <div>
      <h2>Din varukorg</h2>
      <CheckoutButton cartItems={cartItems} />
    </div>
  );
}