import {
  createContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

import {
  addFavorite,
  removeFavorite,
  subscribeToFavorites,
} from "../services/favoritesService";

export const FavoritesContext = createContext();

export function FavoritesProvider({
  children,
}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let unsubscribeFavorites = null;

    const unsubscribeAuth =
      onAuthStateChanged(auth, (user) => {
        // Logged out
        if (!user) {
          setFavorites([]);
          return;
        }

        // Logged in
        unsubscribeFavorites =
          subscribeToFavorites(
            user.uid,
            setFavorites
          );
      });

    return () => {
      unsubscribeAuth();

      if (unsubscribeFavorites) {
        unsubscribeFavorites();
      }
    };
  }, []);

  // Toggle favorite
  const toggleFavorite = async (
    product
  ) => {
    const user = auth.currentUser;

    if (!user) return;

    const exists = favorites.includes(
      product.id
    );

    if (exists) {
      await removeFavorite(
        user.uid,
        product.id
      );
    } else {
      await addFavorite(
        user.uid,
        product.id
      );
    }
  };

  // Check if favorite
  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}