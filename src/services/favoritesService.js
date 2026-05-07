import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

// Add favorite
export const addFavorite = async (
  uid,
  productId
) => {
  await setDoc(
    doc(
      db,
      "users",
      uid,
      "favorites",
      productId
    ),
    {
      id: productId,
    }
  );
};

// Remove favorite
export const removeFavorite = async (
  uid,
  productId
) => {
  await deleteDoc(
    doc(
      db,
      "users",
      uid,
      "favorites",
      productId
    )
  );
};

// Listen to favorites
export const subscribeToFavorites = (
  uid,
  callback
) => {
  const favoritesRef = collection(
    db,
    "users",
    uid,
    "favorites"
  );

  return onSnapshot(favoritesRef, (snapshot) => {
    const favorites = snapshot.docs.map(
      (doc) => doc.id
    );

    callback(favorites);
  });
};