import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function AlbumCard({ album }) {
  const { addToCart, getCartQuantity } = useCart();

  const cartQty = getCartQuantity(album.id);
  const isOutOfStock = album.stock <= 0;
  const isAtLimit = cartQty >= album.stock;
  const disabled = isOutOfStock || isAtLimit;

  const slug = album.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <article className="album-card">
      <Link className="album-card__link" to={`/product/${album.id}-${slug}`}>
        <div className="album-card__image-frame">
          <img
            className="album-card__image"
            src={album.imageUrl}
            alt={album.title}
          />
        </div>

        <div className="album-card__content">
          <h2 className="album-card__title" title={album.title}>
            {album.title}
          </h2>
          <p className="album-card__artist" title={album.artist}>
            {album.artist}
          </p>
          <p className="album-card__genre">{album.genre}</p>
          <p className="album-card__price">{album.price} kr</p>
        </div>
      </Link>

      <button
        className="album-card__button"
        type="button"
        disabled={disabled}
        onClick={() => addToCart(album)}
      >
        {isOutOfStock ? "Out of stock" : isAtLimit ? "Max in cart" : "Add to Cart"}
      </button>
    </article>
  );
}

export default AlbumCard;
