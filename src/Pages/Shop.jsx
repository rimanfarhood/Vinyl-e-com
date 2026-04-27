import { useState } from "react";
import products from "../../data.json";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Rock", "Jazz", "Hip-Hop", "K-Pop", "Electronic"];

  const filteredProducts =
    selectedGenre === "All"
      ? products
      : products.filter((p) => p.genre === selectedGenre);

  return (
    <div className="page">
      <h1>Shop - Browse Vinyls</h1>

      {/* Categories */}
      <div className="categories">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={selectedGenre === genre ? "active" : ""}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}