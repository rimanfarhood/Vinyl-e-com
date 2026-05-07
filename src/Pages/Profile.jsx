import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Profile() {
  const { favorites } = useContext(FavoritesContext);

  const user = {
    name: "admin",
    email: "admin@sypchain.gov",
  };

  return (
    <div className="profile-page">

      {/* =========================
         HEADER (AVATAR + USER)
      ========================= */}
      <div className="profile-header">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="member-badge">Member</span>
        </div>
      </div>

      {/* =========================
         ACCOUNT CARD
      ========================= */}
      <div className="profile-card">
        <h3>Account Information</h3>

        <div className="profile-info">
          <p><span>Name:</span> {user.name}</p>
          <p><span>Email:</span> {user.email}</p>
        </div>
      </div>

      {/* =========================
         DASHBOARD GRID
      ========================= */}
      <div className="profile-grid">

        {/* FAVORITES */}
        <div className="profile-box">
          <h3>Favorites ❤️</h3>

          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            <>
              {/* 🔥 PREVIEW IMAGES */}
              <div className="favorites-preview">
                {favorites.slice(0, 3).map((album) => (
                  <img
                    key={album.id}
                    src={album.imageUrl}
                    alt={album.title}
                  />
                ))}
              </div>

              {/* COUNT */}
              <p>{favorites.length} items</p>

              <button className="button--secondary">
                View all
              </button>
            </>
          )}
        </div>

        {/* ORDERS */}
        <div className="profile-box">
          <h3>Orders 📦</h3>

          <div className="profile-stat">
            <strong>0</strong>
            <span>Total Orders</span>
          </div>

          <button className="button--secondary">
            View Orders
          </button>
        </div>

        {/* RECEIPTS */}
        <div className="profile-box">
          <h3>Receipts 🧾</h3>

          <div className="profile-stat">
            <strong>0</strong>
            <span>Available Receipts</span>
          </div>

          <button className="button--secondary">
            View Receipts
          </button>
        </div>

      </div>
    </div>
  );
}