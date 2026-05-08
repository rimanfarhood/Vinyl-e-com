import { useEffect, useLayoutEffect, useRef } from "react";
import AlbumCard from "./AlbumCard";

const SCROLL_SPEED = 50;

export default function FavoritesCarousel({ albums, flippedIds, onFlip, isStatic }) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const items = [...albums, ...albums, ...albums];

  useLayoutEffect(() => {
    if (isStatic) return;
    const track = trackRef.current;
    if (track) track.scrollLeft = track.scrollWidth / 3;
  }, [isStatic, albums]);

  useEffect(() => {
    if (isStatic) return;
    const track = trackRef.current;
    if (!track) return;

    lastTimeRef.current = null;

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
  }, [albums, isStatic]);

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
      className={`fav-carousel${isStatic ? " fav-carousel--static" : ""}`}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      {!isStatic && (
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
      )}

      <div className="fav-carousel__track" ref={trackRef}>
        {items.map((album, index) => (
          <div
            key={`${album.id}-${index}`}
            className="fav-carousel__item"
            data-copy={Math.floor(index / albums.length)}
          >
            <AlbumCard
              album={album}
              isFlipped={!!flippedIds[album.id]}
              onFlip={onFlip}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
