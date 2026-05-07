import { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/productService";
import AlbumCard from "../components/AlbumCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  /* 🔥 TRACK POSITION DETECTION */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      setIsAtStart(track.scrollLeft <= 0);

      setIsAtEnd(
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 5
      );
    };

    handleScroll(); // 🔥 initial check

    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
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
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="product-carousel">
      <h2>Featured Products</h2>

      {/* 🔥 CONTROLS */}
      <div className="carousel-controls">
        <button onClick={scrollLeft} disabled={isAtStart}>
          ←
        </button>

        <button onClick={scrollRight} disabled={isAtEnd}>
          →
        </button>
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