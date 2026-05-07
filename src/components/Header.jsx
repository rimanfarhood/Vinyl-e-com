import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import logo from "../assets/logo.png";

import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../auth";
import userIcon from "/icons/user.svg";
import shopIcon from "/icons/shoppingCart.svg";

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

  const displayName =
  user?.displayName ||
  user?.email?.split("@")[0] ||
  "User";

  return (
    <header>
      <h1 className="logo">
     <Link to="/">
      <img src={logo} alt="Vinyllo" className="logo-img" />
    </Link>
    </h1>


      <nav>
        <Link to="/shop">Shop</Link>

        <Link to="/favorites" className="favorites-link">
          <span className={`favorites-icon ${favorites.length > 0 ? "active" : ""}`}>
            <FaHeart />
          </span>
          ({favorites.length})
        </Link>

        {!user ? (
          
          <Link to="/login"><img src={userIcon} alt="Login" className="icon" />Login</Link>
        ) : (
           <>
            <div className="user-info">
             <img src={userIcon} alt="User" className="icon" />
             <span>{displayName}</span>
           </div>
            <button onClick={handleLogout}>Logout</button>
          </>

        )}

        <button
          className="header-cart-button button--secondary"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          <img src={shopIcon} alt="Cart" className="icon" />
          Cart ({cartItemCount})
        </button>
      </nav>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </header>
  );
}

export default Header;