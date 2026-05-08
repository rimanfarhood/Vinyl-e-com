import { useEffect, useRef, useState } from "react";
import AlbumCard from "./AlbumCard";

const SCROLL_SPEED = 50;

export default function FavoritesCarousel({ albums }) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedRef = useRef(false);
  const [flippedIds, setFlippedIds] = useState({});

  const toggleFlip = (id) =>
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));

  const items = [...albums, ...albums, ...albums];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    setTimeout(() => {
      track.scrollLeft = track.scrollWidth / 3;
    }, 50);
  }, [albums]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (time) => {
      if (!pausedRef.current && track) {
        if (lastTimeRef.current !== null) {
          const delta = ((time - lastTimeRef.current) / 1000) * SCROLL_SPEED;
          const third = track.scrollWidth / 3;
          track.scrollLeft += delta;
          if (track.scrollLeft >= third * 2) track.scrollLeft -= third;
          else if (track.scrollLeft < third) track.scrollLeft += third;
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [albums]);

  const scrollLeft = () => {
    const track = trackRef.current;
    if (!track) return;
    const third = track.scrollWidth / 3;
    track.scrollLeft -= 220;
    if (track.scrollLeft < third) track.scrollLeft += third;
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (!track) return;
    const third = track.scrollWidth / 3;
    track.scrollLeft += 220;
    if (track.scrollLeft >= third * 2) track.scrollLeft -= third;
  };

  return (
    <div
      className="fav-carousel"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      <div className="fav-carousel__controls">
        <button onClick={scrollLeft} aria-label="Scroll left">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button onClick={scrollRight} aria-label="Scroll right">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="fav-carousel__track" ref={trackRef}>
        {items.map((album, index) => (
          <div key={`${album.id}-${index}`} className="fav-carousel__item">
            <AlbumCard
              album={album}
              isFlipped={!!flippedIds[album.id]}
              onFlip={toggleFlip}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
