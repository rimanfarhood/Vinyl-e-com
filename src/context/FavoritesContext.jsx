import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // 🧠 Load from localStorage on first render
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🔁 Toggle favorite
  const toggleFavorite = (product) => {
    const exists = favorites.find((item) => item.id === product.id);

    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}