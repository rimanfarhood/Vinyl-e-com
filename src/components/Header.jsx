import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItemCount } = useCart();
  const { favorites } = useContext(FavoritesContext);

  return (
    <header>
      <h1>Vinyl Webshop</h1>

    <nav>
  <Link to="/">Home</Link>
  <Link to="/shop">Shop</Link>

  <Link to="/favorites" className="favorites-link">
 <span
  className={`favorites-icon ${
    favorites.length > 0 ? "active" : ""
  }`}
>
  <FaHeart />
</span>
  ({favorites.length})
</Link>

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