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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      {/* Logo */}
      <h1 className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Vinyllo" className="logo-img" />
        </Link>
      </h1>

      {/* Desktop nav */}
      <nav className="nav-desktop">
        <Link to="/shop">Shop</Link>

        <Link to="/favorites" className="favorites-link">
          <span className={`favorites-icon ${favorites.length > 0 ? "active" : ""}`}>
            <FaHeart />
          </span>
          ({favorites.length})
        </Link>

        {!user ? (
          <Link to="/login">
            <img src={userIcon} alt="Login" className="icon" />
            Login
          </Link>
        ) : (
          <>
            <Link to="/profile" className="user-info">
              <img src={userIcon} alt="User" className="icon" />
              <span>{displayName}</span>
            </Link>
            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        )}

        <Link to="/about">About us</Link>

        <button
          className="header-cart-button button--secondary"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          <img src={shopIcon} alt="Cart" className="icon" />
          Cart ({cartItemCount})
        </button>
      </nav>

      {/* Mobile controls */}
      <div className="nav-mobile-controls">
        <Link to="/favorites" className="favorites-link" onClick={closeMenu}>
          <span className={`favorites-icon ${favorites.length > 0 ? "active" : ""}`}>
            <FaHeart />
          </span>
          ({favorites.length})
        </Link>

        <button
          className="header-cart-button button--secondary"
          type="button"
          onClick={() => { setIsCartOpen(true); closeMenu(); }}
        >
          <img src={shopIcon} alt="Cart" className="icon" />
          Cart ({cartItemCount})
        </button>

        <button
          className="hamburger-btn"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          <span className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <nav className="nav-mobile-menu">
          <Link to="/shop" onClick={closeMenu}>Shop</Link>
          <Link to="/about" onClick={closeMenu}>About us</Link>
          {!user ? (
            <Link to="/login" onClick={closeMenu}>
              <img src={userIcon} alt="Login" className="icon" />
              Login
            </Link>
          ) : (
            <>
              <Link to="/profile" className="user-info" onClick={closeMenu}>
                <img src={userIcon} alt="User" className="icon" />
                <span>{displayName}</span>
              </Link>
              <button type="button" onClick={() => { handleLogout(); closeMenu(); }}>
                Logout
              </button>
            </>
          )}
        </nav>
      )}

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}

export default Header;