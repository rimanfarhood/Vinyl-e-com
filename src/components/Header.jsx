import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

import CartModal from "./CartModal";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../auth";

import logo from "../assets/logo.png";
import userIcon from "/icons/user.svg";
import shopIcon from "/icons/shoppingCart.svg";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const { cartItemCount } = useCart();
  const { favorites } = useContext(FavoritesContext);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Display name fallback
  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <header>
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Vinyllo" className="logo-img" />
      </Link>

      <nav>
        {/* Shop */}
        <Link to="/shop">Shop</Link>

        {/* Favorites */}
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

        {/* Auth section */}
        {!user ? (
          <Link to="/login">
            <img src={userIcon} alt="Login" className="icon" />
            Login
          </Link>
        ) : (
          <>
            {/* Profile link */}
            <Link to="/profile" className="user-info">
              <img src={userIcon} alt="User" className="icon" />
              <span>{displayName}</span>
            </Link>

            {/* Logout */}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* Cart */}
        <button
          className="header-cart-button button--secondary"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          <img src={shopIcon} alt="Cart" className="icon" />
          Cart ({cartItemCount})
        </button>
      </nav>

      {/* Cart modal */}
      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
}

export default Header;