import { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../firebase";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Profile() {
  const navigate = useNavigate();

  const { favorites } = useContext(FavoritesContext);

  // Protect route
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  if (!auth.currentUser) return null;

  const displayName =
    auth.currentUser.displayName ||
    auth.currentUser.email?.split("@")[0] ||
    "User";

  return (
    <div className="page">
      <h1>My Profile</h1>

      {/* User info */}
      <section className="profile-section">
        <h2>Account Information</h2>

        <p>
          <strong>Name:</strong> {displayName}
        </p>

        <p>
          <strong>Email:</strong> {auth.currentUser.email}
        </p>
      </section>

      {/* Favorites */}
      <section className="profile-section">
        <h2>Favorites</h2>

        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="profile-favorites">
            {favorites.map((album) => (
              <Link
                key={album.id}
                to={`/product/${album.id}`}
                className="profile-favorite-item"
              >
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  width="100"
                  loading="lazy"
                />

                <p>{album.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Orders placeholder */}
      <section className="profile-section">
        <h2>Orders</h2>

        <p>No orders yet.</p>
      </section>

      {/* Receipts placeholder */}
      <section className="profile-section">
        <h2>Receipts</h2>

        <p>No receipts available.</p>
      </section>
    </div>
  );
}