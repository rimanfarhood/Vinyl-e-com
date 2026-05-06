import { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  /* 🔥 AUTO SCROLL + LOOP */
  useEffect(() => {
  const track = trackRef.current;
  if (!track) return;

  const scrollStep = () => {
    const isEnd =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

    if (isEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  
  setTimeout(scrollStep, 500);

  
  intervalRef.current = setInterval(scrollStep, 3000);

  return () => clearInterval(intervalRef.current);
}, []);

  /* ⏸️ PAUSE ON HOVER */
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    const track = trackRef.current;

    intervalRef.current = setInterval(() => {
      if (!track) return;

      const isEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

      if (isEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 3000);
  };

  /* ⬅️➡️ BUTTONS */
  const scrollLeft = () => {
    trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="product-carousel">
      <h2>Featured Products</h2>

      {/* 🔥 CONTROLS */}
      <div className="carousel-controls">
        <button onClick={scrollLeft}>←</button>
        <button onClick={scrollRight}>→</button>
      </div>

      {/* 🔥 TRACK */}
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {products.slice(0, 10).map((product) => (
          <div className="carousel-item" key={product.id}>
            <AlbumCard album={product} />
          </div>
        ))}
      </div>
    </div>
  );
}