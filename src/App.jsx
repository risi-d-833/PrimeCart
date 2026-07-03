import React from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <Loader>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Loader>
  );
};

export default App;