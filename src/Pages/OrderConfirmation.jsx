import { Link } from "react-router-dom";

import { useOrder } from "../context/OrderContext";

function OrderConfirmation() {
  const { lastOrder } = useOrder();

  if (!lastOrder) {
    return (
      <div>
        <h1>Order confirmation</h1>
        <p>No recent order found.</p>
        <Link to="/shop">Return to shop</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Thank you for your order!</h1>

      <p>Order number: {lastOrder.orderNumber}</p>

      <section>
        <h2>Items</h2>
        {lastOrder.items.map((item) => (
          <article key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.artist}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: {item.price * item.quantity} kr</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Shipping</h2>
        <p>Country: {lastOrder.shippingInfo.country}</p>
        <p>
          Phone: {lastOrder.shippingInfo.phoneCountryCode}{" "}
          {lastOrder.shippingInfo.phoneNumber}
        </p>
        <p>Shipping method: {lastOrder.shippingMethodLabel}</p>
      </section>

      <section>
        <h2>Totals</h2>
        <p>Albums subtotal: {lastOrder.cartTotal} kr</p>
        <p>Shipping: {lastOrder.shippingCost} kr</p>
        <p>VAT: {lastOrder.vatAmount} kr</p>
        <p>Total: {lastOrder.finalTotal} kr</p>
      </section>

      <Link to="/shop">Continue shopping</Link>
    </div>
  );
}

export default OrderConfirmation;
