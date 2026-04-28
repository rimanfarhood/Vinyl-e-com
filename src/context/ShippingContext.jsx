import { createContext, useContext, useState } from "react";

const ShippingContext = createContext(null);

export function ShippingProvider({ children }) {
  const [shippingInfo, setShippingInfo] = useState({
    country: "Sweden",
    customerType: "private",
    vatNumber: "",
    phoneCountryCode: "+46",
    phoneNumber: "",
    shippingMethod: "",
  });

  function updateShippingInfo(field, value) {
    setShippingInfo((currentInfo) => ({
      ...currentInfo,
      [field]: value,
    }));
  }

  function resetShippingInfo() {
    setShippingInfo({
      country: "Sweden",
      customerType: "private",
      vatNumber: "",
      phoneCountryCode: "+46",
      phoneNumber: "",
      shippingMethod: "",
    });
  }

  return (
    <ShippingContext.Provider
      value={{ shippingInfo, updateShippingInfo, resetShippingInfo }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  return useContext(ShippingContext);
}
