import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import "../styles/RecordCard.css";

export default function AlbumCard({ album, isFlipped: isFlippedProp, onFlip }) {
  const { addToCart, getCartQuantity } = useCart();

  // ❤️ Favorites
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const isFav = isFavorite(album.id);

  // 🛒 Cart logic
  const cartQty = getCartQuantity(album.id);
  const isOutOfStock = album.stock <= 0;
  const isAtLimit = cartQty >= album.stock;
  const disabled = isOutOfStock || isAtLimit;

  // 🔗 Slug
  const slug = album.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // 🎛 UI state — use prop if provided (carousel), otherwise local state (shop/favorites)
  const [localFlipped, setLocalFlipped] = useState(false);
  const flipped = isFlippedProp !== undefined ? isFlippedProp : localFlipped;
  const setFlipped = (val) => {
    setTilt({ x: 0, y: 0 });
    if (onFlip) onFlip(album.id);
    else setLocalFlipped(val);
  };
  const [visibleTracks, setVisibleTracks] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 🎵 Animate tracks
  useEffect(() => {
    if (flipped) {
      setVisibleTracks([]);
      album.tracks?.forEach((_, i) => {
        setTimeout(() => {
          setVisibleTracks((prev) => [...prev, i]);
        }, i * 300);
      });
    }
  }, [flipped, album.tracks]);

  // 🖱 Tilt — disabled while flipped to avoid transform conflicts
  const handleMouseMove = (e) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 12;
    const rotateY = ((x / rect.width) - 0.5) * -12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="record-wrapper">

      {/* CARD */}
      <div
        className="card-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ❤️ Favorite */}
        <button
          className={`favorite-btn ${isFav ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(album);
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
        <div
          className={`card ${flipped ? "flipped" : ""}`}
          style={{
            transform: flipped
              ? "rotateY(180deg)"
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          }}
        >
          {/* FRONT */}
          <div className="card-side front" onClick={() => setFlipped(true)}>
            <img src={album.imageUrl} alt={album.title} />
          </div>

          {/* BACK */}
          <div className="card-side back" onClick={() => setFlipped(false)}>
            <h3>Tracklist</h3>
            <ul>
              {album.tracks?.map((track, index) => (
                <li
                  key={index}
                  className={`track ${
                    visibleTracks.includes(index) ? "show" : ""
                  }`}
                >
                  <span>{track.title}</span>
                  <span className="time">{track.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 🔥 EXPANDED PANEL */}
      <div className={`record-expanded ${flipped ? "show" : ""}`}>
        <div className="expanded-content">

          {/* LEFT */}
          <div className="expanded-left">
            <img src={album.imageUrl} alt={album.title} />
          </div>

          {/* RIGHT */}
          <div className="expanded-right">
            <h2>{album.title}</h2>

            <div className="meta">
              <span>{album.year}</span>
              <span>{album.length}</span>
              <span>{album.label}</span>
            </div>

            <p className="description">
              {album.description}
            </p>

            <div className="bottom-row">
              <div className="price">{album.price} kr</div>

              <button
                className="buy-btn"
                disabled={disabled}
                onClick={() => addToCart(album)}
              >
                {isOutOfStock
                  ? "Out of stock"
                  : isAtLimit
                  ? "Max in cart"
                  : "Add to Cart"}
              </button>
            </div>

            <p className="stock">
              {album.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <Link
              className="product-link"
              to={`/product/${album.id}-${slug}`}
            >
              Visa mer →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
