import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">🎧 Vinyl Shop</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-icons">
        <Link to="/cart">🛒</Link>
      </div>

    </nav>
  );
}