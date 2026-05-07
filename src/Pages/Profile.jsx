import {
  useEffect,
  useContext,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import { FavoritesContext } from "../context/FavoritesContext";

import AlbumCard from "../components/AlbumCard";

export default function Profile() {
  const navigate = useNavigate();

  const { favorites } = useContext(
    FavoritesContext
  );

  const [favoriteAlbums, setFavoriteAlbums] =
    useState([]);

  // 🔒 Protect route
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  // ❤️ Fetch favorite albums
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const albums = [];

        for (const favoriteId of favorites) {

          const docRef = doc(
            db,
            "vinyl_webp",
            favoriteId
          );

          const snapshot = await getDoc(
            docRef
          );

          if (snapshot.exists()) {

            albums.push({
              ...snapshot.data(),

              // ✅ Use Firestore ID
              id: snapshot.id,
            });
          }
        }

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
    <div className="page">

      <h1>My Profile</h1>

      {/* 👤 User info */}
      <section className="profile-section">

        <h2>Account Information</h2>

        <p>
          <strong>Name:</strong>{" "}
          {displayName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {auth.currentUser.email}
        </p>

      </section>

      {/* ❤️ Favorites */}
      <section className="profile-section">

        <div className="profile-header-row">

          <h2>Favorites</h2>

          <Link to="/favorites">
            View All
          </Link>

        </div>

        {favoriteAlbums.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="album-grid">

            {favoriteAlbums
              .slice(0, 4)
              .map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                />
              ))}

          </div>
        )}

      </section>

      {/* 📦 Orders */}
      <section className="profile-section">

        <h2>Orders</h2>

        <p>No orders yet.</p>

      </section>

      {/* 🧾 Receipts */}
      <section className="profile-section">

        <h2>Receipts</h2>

        <p>No receipts available.</p>

      </section>

    </div>
  );
}