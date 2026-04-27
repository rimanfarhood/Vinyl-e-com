export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.title} />
      <div className="card-body">
        <h2>{product.title}</h2>
        <p className="artist">{product.artist}</p>
        <span className="genre">{product.genre}</span>
        <div className="card-footer">
          <span className="price">{product.price} kr</span>
          <button>Lägg i korg</button>
        </div>
      </div>
    </div>
  )
}
