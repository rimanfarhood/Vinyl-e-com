import { useParams } from "react-router-dom";
import products from "../../data.json";

export default function ProductPage() {
  // Get product id from URL
  const { id } = useParams();

  // Find product by id
  const product = products.find((p) => p.id === Number(id));

  // If product not found
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