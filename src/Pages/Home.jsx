import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";
import { logout } from "../auth";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <h1>Home - Featured Vinyls</h1>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      <section>
        {products.slice(0, 4).map((product) => (
          <AlbumCard key={product.id} album={product} />
        ))}
      </section>
    </div>
  );
}