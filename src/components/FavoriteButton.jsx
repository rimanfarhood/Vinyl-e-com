import { useContext } from "react";

import { FaHeart } from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";

function FavoriteButton({ product }) {
  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const isFav = isFavorite(product.id);

  return (
    <button
      className={`favorite-btn ${
        isFav ? "active" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();

        e.stopPropagation();

        toggleFavorite(product);
      }}
    >
      <FaHeart
        color={isFav ? "red" : "gray"}
      />
    </button>
  );
}

export default FavoriteButton;