import { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [lastOrder, setLastOrder] = useState(null);

  function createOrder(orderData) {
    const orderNumber = `VW-${Date.now()}`;

    setLastOrder({
      orderNumber,
      createdAt: new Date().toISOString(),
      ...orderData,
    });

    return orderNumber;
  }

  return (
    <OrderContext.Provider value={{ lastOrder, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
