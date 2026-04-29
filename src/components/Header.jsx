import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItemCount } = useCart();

  return (
    <header>
      <h1>Vinyl Webshop</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {/* NEW: Login link */}
        <Link to="/login">Login</Link>

        <button
          className="header-cart-button button--secondary"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          Cart ({cartItemCount})
        </button>
      </nav>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}

export default Header;