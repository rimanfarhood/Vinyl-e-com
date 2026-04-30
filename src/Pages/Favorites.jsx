import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import AlbumCard from "../components/AlbumCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="page">
      <h1>My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet...</p>
      ) : (
        <div className="album-grid">
          {favorites.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}