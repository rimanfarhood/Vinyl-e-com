import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

// Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductPage from "../pages/ProductPage";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SearchResults from "../pages/SearchResults";
import Success from "../pages/Success";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

import Favorites from "../pages/Favorites";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/product/:id"
            element={<ProductPage />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/confirmation"
            element={<OrderConfirmation />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/search"
            element={<SearchResults />}
          />

          <Route
            path="/success"
            element={<Success />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* ❤️ Favorites */}
          <Route
            path="/favorites"
            element={<Favorites />}
          />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}