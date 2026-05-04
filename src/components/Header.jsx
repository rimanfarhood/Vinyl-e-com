import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../auth";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItemCount } = useCart();
  const { favorites } = useContext(FavoritesContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <h1>Vinyl Webshop</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        <Link to="/favorites" className="favorites-link">
          <span className={`favorites-icon ${favorites.length > 0 ? "active" : ""}`}>
            <FaHeart />
          </span>
          ({favorites.length})
        </Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}

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