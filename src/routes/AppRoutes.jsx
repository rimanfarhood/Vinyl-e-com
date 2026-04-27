import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SearchResults from "../pages/SearchResults";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Navbar /> {/* Navbar is outside Routes so it shows on all pages */ }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

    </BrowserRouter>
  );
}