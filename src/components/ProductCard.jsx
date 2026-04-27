import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">

      {/* Clickable image → navigates to product details page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="card-img"
        />
      </Link>

      <div className="card-body">

        {/* Clickable title → improves UX */}
        <Link to={`/product/${product.id}`} className="title-link">
          <h2>{product.title}</h2>
        </Link>

        {/* Artist name */}
        <p className="artist">{product.artist}</p>

        {/* Genre tag */}
        <span className="genre">{product.genre}</span>

        <div className="card-footer">
          {/* Product price */}
          <span className="price">{product.price} kr</span>

          {/* Add to cart button (currently placeholder logic) */}
          <button className="btn">
         Lägg i korg
         </button>
        </div>

      </div>
    </div>
  );
}