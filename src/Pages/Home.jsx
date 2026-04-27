import products from "../../data.json";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="page">
      <h1>Home - Featured Vinyls</h1>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}