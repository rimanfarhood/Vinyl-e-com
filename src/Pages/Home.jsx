import { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";

const SCROLL_SPEED = 80; // pixels per second

export default function Home() {
  const [products, setProducts] = useState([]);
  const [flippedIds, setFlippedIds] = useState({});
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const toggleFlip = (id) =>
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Start at beginning of middle copy
  useEffect(() => {
    const track = trackRef.current;
    if (!track || products.length === 0) return;
    setTimeout(() => {
      track.scrollLeft = track.scrollWidth / 3;
    }, 50);
  }, [products]);

  // RAF auto-scroll — keeps user in middle copy, resets silently at 1/3 boundaries
  useEffect(() => {
    const track = trackRef.current;
    if (!track || products.length === 0) return;

    const animate = (time) => {
      if (!pausedRef.current && track) {
        if (lastTimeRef.current !== null) {
          const delta = ((time - lastTimeRef.current) / 1000) * SCROLL_SPEED;
          const third = track.scrollWidth / 3;

          track.scrollLeft += delta;

          if (track.scrollLeft >= third * 2) {
            track.scrollLeft -= third;
          } else if (track.scrollLeft < third) {
            track.scrollLeft += third;
          }
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [products]);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  const scrollLeft = () => {
    const track = trackRef.current;
    if (!track) return;
    const third = track.scrollWidth / 3;
    track.scrollLeft -= 300;
    if (track.scrollLeft < third) track.scrollLeft += third;
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (!track) return;
    const third = track.scrollWidth / 3;
    track.scrollLeft += 300;
    if (track.scrollLeft >= third * 2) track.scrollLeft -= third;
  };

  const loopedProducts = [...products, ...products, ...products];

  return (
    <>
      <div className="hero">
        <div>
          <h1>Discover Your Next Favorite Vinyl</h1>
          <p>
            Explore curated music collections, trending releases, and timeless classics.
          </p>
          <Link to="/shop" className="hero-button">
            Browse Collection
          </Link>
        </div>
      </div>

      <div
        className="product-carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <h2>Featured Products</h2>

        <div className="carousel-controls">
          <button onClick={scrollLeft} aria-label="Scroll left">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button onClick={scrollRight} aria-label="Scroll right">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="carousel-track" ref={trackRef}>
          {loopedProducts.map((product, index) => (
            <div className="carousel-item" key={`${product.id}-${index}`}>
              <AlbumCard
                album={product}
                isFlipped={!!flippedIds[product.id]}
                onFlip={toggleFlip}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
