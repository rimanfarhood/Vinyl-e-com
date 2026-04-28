import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="page">
      <h1>Home - Featured Vinyls</h1>

      <section>
        {products.slice(0, 4).map((product) => (
          <AlbumCard key={product.id} album={product} />
        ))}
      </section>
    </div>
  );
}