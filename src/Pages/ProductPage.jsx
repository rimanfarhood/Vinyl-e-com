import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <h2>Laddar...</h2>;

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="page product-page">

      {/* Product Image */}
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h1>{product.title}</h1>

        <p className="artist">Artist: {product.artist}</p>

        <p className="genre">Genre: {product.genre}</p>

        <h2 className="price">{product.price} kr</h2>

        <button className="btn">Lägg i korg</button>
      </div>

    </div>
  );
}