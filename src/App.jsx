import products from '../data.json'
import ProductCard from './components/ProductCard'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Vinyl Shop</h1>
      </header>
      <main className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </main>
    </div>
  )
}
