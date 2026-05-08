import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AlbumCard from "./AlbumCard";

const SCROLL_SPEED = 50;
const ITEM_SIZE = 185 + 16; // card width + gap

export default function FavoritesCarousel({ albums, flippedIds, onFlip, isStatic }) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedRef = useRef(false);
  const prevIsStaticRef = useRef(isStatic);
  const prevAlbumsRef = useRef(albums);

  const [visuallyStatic, setVisuallyStatic] = useState(isStatic);
  const [albumOffset, setAlbumOffset] = useState(0);

  const staticAlbums = visuallyStatic && albumOffset > 0
    ? [...albums.slice(albumOffset), ...albums.slice(0, albumOffset)]
    : albums;

  const items = [
    ...staticAlbums.map((a) => ({ album: a, copy: 0, key: `${a.id}-c0` })),
    ...albums.map((a)       => ({ album: a, copy: 1, key: `${a.id}-c1` })),
    ...albums.map((a)       => ({ album: a, copy: 2, key: `${a.id}-c2` })),
  ];

  // Single layout effect that owns all scroll-position decisions.
  // Runs on mode change, albumOffset change, or album list change.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prevAlbums = prevAlbumsRef.current;
    const albumsChanged = prevAlbums !== albums;
    prevAlbumsRef.current = albums;

    if (visuallyStatic) {
      // In static mode, clamp offset if albums shrank
      if (albumsChanged && albums.length > 0) {
        setAlbumOffset((o) => Math.min(o, albums.length - 1));
      }
      return;
    }

    if (albumsChanged && prevAlbums.length > 0) {
      // Album list changed: find which album was first visible and preserve it
      const idx = Math.floor(track.scrollLeft / ITEM_SIZE);
      const visibleId = prevAlbums[idx % prevAlbums.length]?.id;
      const newIndex = albums.findIndex((a) => a.id === visibleId);
      const newOffset = newIndex !== -1
        ? newIndex
        : Math.max(0, Math.min(idx % prevAlbums.length, albums.length - 1));
      setAlbumOffset(newOffset);
      track.scrollLeft = (albums.length + newOffset) * ITEM_SIZE;
    } else {
      // Mode transition (static→scroll): restore position from albumOffset
      track.scrollLeft = (albums.length + albumOffset) * ITEM_SIZE;
    }
  }, [visuallyStatic, albumOffset, albums]);

  // Scroll→static: capture order, animate to center, then apply static layout.
  // Static→scroll: immediately restore scroll layout.
  useEffect(() => {
    const track = trackRef.current;
    const wasStatic = prevIsStaticRef.current;
    prevIsStaticRef.current = isStatic;

    if (isStatic && !wasStatic) {
      const contentWidth = albums.length * 185 + (albums.length - 1) * 16;
      const targetLeft = Math.max(0, (track.clientWidth - contentWidth) / 2);
      const nearest = Math.round((track.scrollLeft + targetLeft) / ITEM_SIZE);
      const offset = ((nearest % albums.length) + albums.length) % albums.length;
      setAlbumOffset(offset);

      const target = Math.max(0, (track.scrollWidth - track.clientWidth) / 2);
      track.scrollTo({ left: target, behavior: "smooth" });

      const finish = () => setVisuallyStatic(true);
      track.addEventListener("scrollend", finish, { once: true });
      const fallback = setTimeout(finish, 600);

      return () => {
        clearTimeout(fallback);
        track.removeEventListener("scrollend", finish);
      };
    }

    if (!isStatic && wasStatic) {
      setVisuallyStatic(false);
    }
  }, [isStatic, albums]);

  // RAF auto-scroll
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
      className={`fav-carousel${visuallyStatic ? " fav-carousel--static" : ""}`}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      {!visuallyStatic && (
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
        {items.map(({ album, copy, key }) => (
          <div key={key} className="fav-carousel__item" data-copy={copy}>
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
