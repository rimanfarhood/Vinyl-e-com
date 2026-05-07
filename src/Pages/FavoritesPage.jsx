import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useContext(
    FavoritesContext
  );

  return (
    <section className="favorites-page">
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((id) => (
            <li key={id}>
              {id}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FavoritesPage;