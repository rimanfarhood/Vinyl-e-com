import { Link } from "react-router-dom";
import { useContext } from "react";

import { useCart } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

function AlbumCard({ album }) {

  console.log("AlbumCard ID:", album.id);
  const { addToCart, getCartQuantity } = useCart();

  // ❤️ Favorites
  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const isFav = isFavorite(album.id);

  // 🛒 Cart logic
  const cartQty = getCartQuantity(album.id);

  const isOutOfStock = album.stock <= 0;

  const isAtLimit = cartQty >= album.stock;

  const disabled = isOutOfStock || isAtLimit;

  // 🔗 SEO slug
  const slug = album.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <article className="album-card">

      {/* ❤️ Favorite Button */}
      <button
        className={`favorite-btn ${
          isFav ? "active" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(album);
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* Album Link */}
      <Link
        className="album-card__link"
        to={`/product/${album.id}-${slug}`}
      >
        {/* Image */}
        <div className="album-card__image-frame">
          <img
            className="album-card__image"
            src={album.imageUrl}
            alt={album.title}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="album-card__content">

          <h2
            className="album-card__title"
            title={album.title}
          >
            {album.title}
          </h2>

          <p
            className="album-card__artist"
            title={album.artist}
          >
            {album.artist}
          </p>

          <p className="album-card__genre">
            {album.genre}
          </p>

          <p className="album-card__price">
            {album.price} kr
          </p>

        </div>
      </Link>

      {/* Add To Cart */}
      <button
        className="album-card__button"
        type="button"
        disabled={disabled}
        onClick={() => addToCart(album)}
      >
        {isOutOfStock
          ? "Out of stock"
          : isAtLimit
          ? "Max in cart"
          : "Add to Cart"}
      </button>

    </article>
  );
}

export default AlbumCard;