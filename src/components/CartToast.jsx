import { useCart } from "../context/CartContext";

function CartToast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return <div className="cart-toast">{toastMessage}</div>;
}

export default CartToast;
