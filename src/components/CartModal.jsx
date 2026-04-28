import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useShipping } from "../context/ShippingContext";
import { countries } from "../data/countries";
import { isValidVatFormat } from "../services/vatValidation";

function CartModal({ onClose }) {
  const navigate = useNavigate();

  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const { shippingInfo, updateShippingInfo, resetShippingInfo } = useShipping();

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
  const hasVatNumber = shippingInfo.vatNumber.trim() !== "";
  const hasValidVatFormat = isValidVatFormat(
    shippingInfo.country,
    shippingInfo.vatNumber
  );

  const shouldChargeVat = isEUOrSweden && (!isCompany || !hasValidVatFormat);
  const vatRate = shouldChargeVat ? 0.25 : 0;

  const taxableAmount = cartTotal + shippingCost;
  const vatAmount = Math.round(taxableAmount * vatRate);
  const finalTotal = taxableAmount + vatAmount;

  const hasPhoneNumber = shippingInfo.phoneNumber.trim() !== "";

  const checkoutWarnings = [];

  if (!selectedShippingOption) checkoutWarnings.push("Select shipping method.");
  if (!hasPhoneNumber) checkoutWarnings.push("Add phone number.");
  if (isCompany && isEUOrSweden && !hasValidVatFormat)
    checkoutWarnings.push("Enter a valid VAT number.");

  const canCheckout = checkoutWarnings.length === 0;

  function handleCountryChange(countryName) {
    const selected = countries.find((c) => c.name === countryName);
    updateShippingInfo("country", countryName);
    updateShippingInfo("shippingMethod", "");
    updateShippingInfo("vatNumber", "");
    if (selected) updateShippingInfo("phoneCountryCode", selected.phoneCode);
  }

  return (
    <div className="cart-modal">
      <div className="cart-modal__backdrop" onClick={onClose}></div>

      <div className="cart-modal__content">
        <div className="cart-modal__header">
          <h2>Shopping Cart</h2>
          <button className="cart-modal__close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-modal__items">
              {cartItems.map((item) => {
                const slug = item.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");

                const isAtStockLimit = item.quantity >= item.stock;

                return (
                  <div className="cart-modal__item" key={item.id}>
                    <Link to={`/product/${item.id}-${slug}`} onClick={onClose}>
                      <img
                        className="cart-modal__image"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                    </Link>

                    <div className="cart-modal__details">
                      <Link
                        to={`/product/${item.id}-${slug}`}
                        onClick={onClose}
                        className="cart-modal__link"
                      >
                        <h3>{item.title}</h3>
                      </Link>

                      <p>{item.artist}</p>
                      <p>{item.price} kr each</p>

                      <div className="cart-modal__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          disabled={isAtStockLimit}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {isAtStockLimit && (
                        <p className="cart-modal__stock-warning">
                          Maximum available stock reached.
                        </p>
                      )}

                      <p>Subtotal: {item.price * item.quantity} kr</p>

                      <button
                        className="cart-modal__remove"
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shipping-form">
              <h3>Shipping information</h3>

              <button
                className="shipping-form__reset"
                type="button"
                onClick={resetShippingInfo}
              >
                Clear shipping info
              </button>

              <div className="shipping-form__grid">
                <div className="shipping-form__field">
                  <label htmlFor="shipping-country">Country</label>
                  <select
                    id="shipping-country"
                    value={shippingInfo.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="shipping-form__field">
                  <label htmlFor="customer-type">Customer type</label>
                  <select
                    id="customer-type"
                    value={shippingInfo.customerType}
                    onChange={(e) =>
                      updateShippingInfo("customerType", e.target.value)
                    }
                  >
                    <option value="private">Private</option>
                    <option value="company">Company</option>
                  </select>
                </div>

                {shippingInfo.customerType === "company" && isEUOrSweden && (
                  <div className="shipping-form__field shipping-form__field--wide">
                    <label htmlFor="vat-number">VAT number</label>
                    <input
                      id="vat-number"
                      type="text"
                      value={shippingInfo.vatNumber}
                      onChange={(e) =>
                        updateShippingInfo("vatNumber", e.target.value)
                      }
                      placeholder="Example: DE123456789"
                    />
                    {hasVatNumber && !hasValidVatFormat && (
                      <p className="shipping-form__warning">
                        VAT number format is not valid for the selected country.
                      </p>
                    )}
                    {hasVatNumber && hasValidVatFormat && (
                      <p className="shipping-form__success">
                        VAT number format accepted.
                      </p>
                    )}
                  </div>
                )}

                {shippingInfo.customerType === "company" && !isEUOrSweden && (
                  <div className="shipping-form__field shipping-form__field--wide">
                    <p className="shipping-form__success">
                      Company outside EU — no VAT required
                    </p>
                  </div>
                )}

                <div className="shipping-form__field">
                  <label htmlFor="phone-country-code">Phone country code</label>
                  <select
                    id="phone-country-code"
                    value={shippingInfo.phoneCountryCode}
                    onChange={(e) =>
                      updateShippingInfo("phoneCountryCode", e.target.value)
                    }
                  >
                    {countries.map((country) => (
                      <option
                        key={`${country.name}-${country.phoneCode}`}
                        value={country.phoneCode}
                      >
                        {country.phoneCode} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="shipping-form__field">
                  <label htmlFor="phone-number">Phone number</label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={shippingInfo.phoneNumber}
                    onChange={(e) =>
                      updateShippingInfo("phoneNumber", e.target.value)
                    }
                    placeholder="Phone number"
                  />
                </div>

                <div className="shipping-form__field shipping-form__field--wide">
                  <label htmlFor="shipping-method">Shipping method</label>
                  <select
                    id="shipping-method"
                    value={shippingInfo.shippingMethod}
                    onChange={(e) =>
                      updateShippingInfo("shippingMethod", e.target.value)
                    }
                  >
                    <option value="">Select shipping method</option>
                    {shippingOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} — {option.price} kr
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="cart-modal__summary">
              <div>
                <p>Albums subtotal: {cartTotal} kr</p>
                <p>
                  Shipping:{" "}
                  {selectedShippingOption
                    ? `${shippingCost} kr`
                    : "Select shipping method"}
                </p>
                <p>VAT ({Math.round(vatRate * 100)}%): {vatAmount} kr</p>

                {vatRate === 0 && isEUOrSweden && isCompany && hasValidVatFormat && (
                  <p className="shipping-form__success">
                    VAT reverse charge applied.
                  </p>
                )}
                {vatRate === 0 && !isEUOrSweden && (
                  <p className="shipping-form__success">
                    No VAT applied outside EU.
                  </p>
                )}

                <p>Total: {finalTotal} kr</p>

                {!canCheckout && (
                  <div className="shipping-form__warning">
                    {checkoutWarnings.map((warning) => (
                      <p key={warning}>{warning}</p>
                    ))}
                  </div>
                )}
              </div>

              <button type="button" onClick={clearCart}>
                Clear cart
              </button>

              <button type="button" onClick={onClose}>
                Continue shopping
              </button>

              <button
                type="button"
                disabled={!canCheckout}
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
