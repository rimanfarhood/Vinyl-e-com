import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, getCartQuantity } = useCart();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const albumId = id.split("-")[0];

  useEffect(() => {
    getProductById(albumId).then((data) => {
      setAlbum(data);
      setLoading(false);
    });
  }, [albumId]);

  if (loading) return <h2>Laddar...</h2>;

  if (!album) {
    return (
      <div>
        <h1>Album not found</h1>
        <Link to="/shop">Back to shop</Link>
      </div>
    );
  }

  const cartQty = getCartQuantity(album.id);
  const isOutOfStock = album.stock <= 0;
  const isAtLimit = cartQty >= album.stock;
  const disabled = isOutOfStock || isAtLimit;

  return (
    <>
      <Link to="/shop">Back to shop</Link>

      <article className="product-detail">
        <img
          className="product-detail__image"
          src={album.imageUrl}
          alt={album.title}
        />

        <div>
          <h1>{album.title}</h1>

          <div className="product-info">
            <p><span>Artist:</span> {album.artist}</p>
            <p><span>Genre:</span> {album.genre}</p>
            <p><span>Year:</span> {album.year}</p>
            <p><span>Condition:</span> {album.condition}</p>
            <p><span>Stock:</span> {album.stock} in stock</p>
            <p className="product-detail__description"><span>Description:</span> {album.description}</p>
            <p><span>Price:</span> {album.price} kr</p>
          </div>
        
          <br />

          <button type="button" className="add-to-cart-btn" disabled={disabled} onClick={() => addToCart(album)}>
            {isOutOfStock ? "Out of stock" : isAtLimit ? "Max in cart" : "Add to Cart"}
          </button>
        </div>
      </article>
    </>
  );
}
