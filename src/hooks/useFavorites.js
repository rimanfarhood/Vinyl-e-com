import { useEffect, useState } from "react";
import {
  addFavorite,
  removeFavorite,
  listenToFavorites,
} from "../services/favoritesService";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToFavorites(setFavorites);

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (itemId) => {
    if (favorites.includes(itemId)) {
      await removeFavorite(itemId);
    } else {
      await addFavorite(itemId);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}