import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Profile() {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoritesContext);
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);

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

        <div className="profile-card profile-card--full">
          <div className="profile-card__header">
            <h2>Favorites</h2>
            {favoriteAlbums.length > 0 && (
              <Link to="/favorites" className="profile-view-all">View all</Link>
            )}
          </div>

          {favoriteAlbums.length === 0 ? (
            <p className="profile-empty">No favorites added yet.</p>
          ) : (
            <div className="profile-favorites-grid">
              {favoriteAlbums.slice(0, 4).map((album) => {
                const slug = album.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");
                return (
                  <Link
                    key={album.id}
                    to={`/product/${album.id}-${slug}`}
                    className="profile-album"
                  >
                    <img src={album.imageUrl} alt={album.title} />
                    <span className="profile-album__title">{album.title}</span>
                    <span className="profile-album__artist">{album.artist}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
