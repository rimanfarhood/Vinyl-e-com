import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useShipping } from "../context/ShippingContext";
import { countries } from "../data/countries";
import { isValidVatFormat } from "../services/vatValidation";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { shippingInfo } = useShipping();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountMessage, setDiscountMessage] = useState("");

  const selectedCountry = countries.find(
    (country) => country.name === shippingInfo.country
  );

  const countryRegion = selectedCountry?.region || "outsideEU";

  const shippingOptionsByRegion = {
    sweden: [
      { id: "postnord-standard", label: "PostNord Standard", price: 59 },
      { id: "dhl-standard", label: "DHL Standard", price: 79 },
      { id: "dhl-priority", label: "DHL Priority", price: 119 },
    ],
    eu: [
      { id: "dhl-eu-standard", label: "DHL Standard EU", price: 129 },
      { id: "dhl-eu-priority", label: "DHL Priority EU", price: 199 },
    ],
    outsideEU: [
      { id: "dhl-international", label: "DHL International", price: 249 },
    ],
  };

  const shippingOptions = shippingOptionsByRegion[countryRegion];

  const selectedShippingOption = shippingOptions.find(
    (option) => option.id === shippingInfo.shippingMethod
  );

  const shippingCost = selectedShippingOption ? selectedShippingOption.price : 0;

  const isEUOrSweden = countryRegion === "sweden" || countryRegion === "eu";
  const isCompany = shippingInfo.customerType === "company";
  const hasValidVatFormat = isValidVatFormat(
    shippingInfo.country,
    shippingInfo.vatNumber
  );

  const shouldChargeVat = isEUOrSweden && (!isCompany || !hasValidVatFormat);
  const vatRate = shouldChargeVat ? 0.25 : 0;

  const taxableAmount = cartTotal + shippingCost;
  const vatAmount = Math.round(taxableAmount * vatRate);

  let finalTotal = taxableAmount + vatAmount;
  let discountAmount = 0;

  if (appliedDiscount) {
    discountAmount = Math.round(finalTotal * (appliedDiscount.percent / 100));
    finalTotal = finalTotal - discountAmount;
  }

  function handleApplyDiscount() {
    const code = discountCode.trim().toUpperCase();

    if (code === "LEXICONELEV") {
      setAppliedDiscount({ code, percent: 20 });
      setDiscountMessage("20% discount applied.");
    } else if (code === "ÖMER") {
      setAppliedDiscount({ code, percent: 30 });
      setDiscountMessage("30% discount applied.");
    } else {
      setAppliedDiscount(null);
      setDiscountMessage("Invalid discount code.");
    }
  }

  function handlePlaceOrder() {
    createOrder({
      items: cartItems,
      shippingInfo,
      shippingMethodLabel: selectedShippingOption.label,
      cartTotal,
      shippingCost,
      vatAmount,
      discountCode: appliedDiscount ? appliedDiscount.code : "",
      discountPercent: appliedDiscount ? appliedDiscount.percent : 0,
      discountAmount,
      finalTotal,
    });

    clearCart();
    navigate("/confirmation");
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Return to shop</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      <section>
        <h2>Order summary</h2>
        {cartItems.map((item) => {
          const slug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          return (
            <article key={item.id}>
              <h3>
                <Link to={`/product/${item.id}-${slug}`}>{item.title}</Link>
              </h3>
              <p>{item.artist}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: {item.price * item.quantity} kr</p>
            </article>
          );
        })}
      </section>

      <section>
        <h2>Shipping details</h2>
        <p>Country: {shippingInfo.country}</p>
        <p>Customer type: {shippingInfo.customerType}</p>
        <p>
          Phone: {shippingInfo.phoneCountryCode} {shippingInfo.phoneNumber}
        </p>
        <p>
          Shipping method:{" "}
          {selectedShippingOption ? selectedShippingOption.label : "Not selected"}
        </p>
        {shippingInfo.vatNumber && isEUOrSweden && (
          <p>VAT number: {shippingInfo.vatNumber}</p>
        )}
      </section>

      <section>
        <h2>Discount</h2>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code"
        />
        <button type="button" onClick={handleApplyDiscount}>
          Apply
        </button>
        {discountMessage && <p>{discountMessage}</p>}
      </section>

      <section>
        <h2>Totals</h2>
        <p>Albums subtotal: {cartTotal} kr</p>
        <p>Shipping: {shippingCost} kr</p>
        <p>VAT ({Math.round(vatRate * 100)}%): {vatAmount} kr</p>

        {vatRate === 0 && isEUOrSweden && isCompany && hasValidVatFormat && (
          <p>VAT reverse charge applied.</p>
        )}
        {vatRate === 0 && !isEUOrSweden && <p>No VAT applied outside EU.</p>}

        {appliedDiscount && (
          <p>
            Discount ({appliedDiscount.percent}%): -{discountAmount} kr
          </p>
        )}

        <p>Total: {finalTotal} kr</p>
      </section>

      <section>
        <h2>Payment</h2>
        <p>Payment integration will be added later.</p>
        <button type="button" onClick={handlePlaceOrder}>
          Place order
        </button>
      </section>
    </div>
  );
}

export default Checkout;
