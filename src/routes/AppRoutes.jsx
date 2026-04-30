import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Favorites from "../Pages/Favorites";

import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import ProductPage from "../Pages/ProductPage";
import Checkout from "../Pages/Checkout";
import OrderConfirmation from "../Pages/OrderConfirmation";
import Cart from "../Pages/Cart";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import SearchResults from "../Pages/SearchResults";
import Success from "../Pages/Success";

import Login from "../pages/Login";
import Register from "../pages/Register";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/success" element={<Success />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
  
         <Route path="/favorites" element={<Favorites />} />
          
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
