import { createContext, useContext, useRef, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  function showToast(message) {
    setToastMessage(message);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 2500);
  }

  function getCartQuantity(albumId) {
    const item = cartItems.find((item) => item.id === albumId);
    return item ? item.quantity : 0;
  }

  function addToCart(album) {
    const currentQty = getCartQuantity(album.id);

    if (album.stock <= 0) {
      showToast("This album is out of stock.");
      return;
    }

    if (currentQty >= album.stock) {
      showToast(`You now have all available copies (${album.stock})`);
      return;
    }

    const newQty = currentQty + 1;

    setCartItems((items) => {
      const existing = items.find((item) => item.id === album.id);

      if (existing) {
        return items.map((item) =>
          item.id === album.id ? { ...item, quantity: newQty } : item
        );
      }

      return [...items, { ...album, quantity: 1 }];
    });

    if (newQty === album.stock) {
      showToast(`${album.title} (${newQty} in cart — max reached)`);
    } else {
      showToast(`${album.title} (${newQty} in cart)`);
    }
  }

  function removeFromCart(albumId) {
    setCartItems((items) => items.filter((item) => item.id !== albumId));
  }

  function updateQuantity(albumId, quantity) {
    setCartItems((items) =>
      items.flatMap((item) => {
        if (item.id !== albumId) return [item];
        if (quantity <= 0) return [];
        const safeQuantity = Math.min(quantity, item.stock);
        return [{ ...item, quantity: safeQuantity }];
      })
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
        getCartQuantity,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
