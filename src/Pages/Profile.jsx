import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FavoritesContext } from "../context/FavoritesContext";
import FavoritesCarousel from "../components/FavoritesCarousel";

const CARD_MIN_WIDTH = 185;
const CARD_GAP = 20;

export default function Profile() {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  const [flippedIds, setFlippedIds] = useState({});
  const [columnsPerRow, setColumnsPerRow] = useState(4);
  const favCardRef = useRef(null);

  const toggleFlip = (id) =>
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    if (!auth.currentUser) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const snapshots = await Promise.all(
          favorites.map((id) => getDoc(doc(db, "vinyl_webp", id)))
        );
        const albums = snapshots
          .filter((s) => s.exists())
          .map((s) => ({ ...s.data(), id: s.id }));
        setFavoriteAlbums(albums);
      } catch (error) {
        console.error(error);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteAlbums([]);
    }
  }, [favorites]);

  useEffect(() => {
    const el = favCardRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth - 48; // subtract 1.5rem padding on each side
      setColumnsPerRow(Math.max(1, Math.floor((w + CARD_GAP) / (CARD_MIN_WIDTH + CARD_GAP))));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!auth.currentUser) return null;

  const displayName =
    auth.currentUser.displayName ||
    auth.currentUser.email?.split("@")[0] ||
    "User";

  return (
    <div className="profile-layout">

      {/* LEFT COLUMN */}
      <aside className="profile-left">

        <div className="profile-card">
          <h2>Account</h2>
          <div className="profile-info">
            <span className="profile-info__label">Name</span>
            <span className="profile-info__value">{displayName}</span>
            <span className="profile-info__label">Email</span>
            <span className="profile-info__value">{auth.currentUser.email}</span>
          </div>
        </div>

        <div className="profile-card">
          <h2>Orders</h2>
          <p className="profile-empty">No orders yet.</p>
        </div>

        <div className="profile-card">
          <h2>Receipts</h2>
          <p className="profile-empty">No receipts available.</p>
        </div>

      </aside>

      {/* RIGHT COLUMN */}
      <section className="profile-right">

        <div className="profile-card profile-card--full" ref={favCardRef}>
          <div className="profile-card__header">
            <h2>Favorites</h2>
          </div>

          {favoriteAlbums.length === 0 ? (
            <p className="profile-empty">No favorites added yet.</p>
          ) : (
            <FavoritesCarousel
              albums={favoriteAlbums}
              flippedIds={flippedIds}
              onFlip={toggleFlip}
              isStatic={favoriteAlbums.length <= columnsPerRow}
            />
          )}
        </div>

      </section>

    </div>
  );
}
