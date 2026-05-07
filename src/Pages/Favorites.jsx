import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { FavoritesContext } from "../context/FavoritesContext";

import AlbumCard from "../components/AlbumCard";

function Favorites() {
  const { favorites } = useContext(
    FavoritesContext
  );

  const [favoriteAlbums, setFavoriteAlbums] =
    useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const albums = [];

        for (const favoriteId of favorites) {

          // ✅ Fetch from vinyl_webp
          const docRef = doc(
            db,
            "vinyl_webp",
            favoriteId
          );

          const snapshot = await getDoc(
            docRef
          );

          console.log(
            "Fetching favorite:",
            favoriteId,
            "exists:",
            snapshot.exists()
          );

          if (snapshot.exists()) {

            albums.push({
              ...snapshot.data(),

              // ✅ Force Firestore ID
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

  return (
    <section className="favorites-page">

      <h1>My Favorites</h1>

      {favoriteAlbums.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="album-grid">

          {favoriteAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default Favorites;