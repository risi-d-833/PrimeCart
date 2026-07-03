import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import AuthModal from "./AuthModal";

import { toggleWishlist } from "../features/wishlist/wishlistSlice"; // Import this

export default function Navbar() {
  const menu = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
    { name: "Accessories", path: "/accessories" },
  ];

  const [openAuth, setOpenAuth] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!(user || token));
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logout Successfully");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F1EDE5]/95 backdrop-blur-xl border-b border-[#ddd5c7] shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-5 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
              P
            </div>
            <div className="leading-none">
              <h1 className="text-lg lg:text-xl font-black tracking-wide uppercase text-black">
                Prime<span className="text-[#8A6E4B]">Cart</span>
              </h1>
              <p className="text-[8px] uppercase tracking-[3px] text-gray-500 mt-0.5">
                Premium Store
              </p>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {menu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-[14px] font-medium uppercase tracking-wide transition-all duration-300 group ${
                    isActive ? "text-black" : "text-gray-700 hover:text-black"
                  }`
                }
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-0.5 rounded-full bg-[#8A6E4B] transition-all duration-300 w-0 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <button className="w-9 h-9 rounded-full bg-white border border-[#ddd5c7] shadow-sm hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center">
              <Search size={18} />
            </button>

            {/* Wishlist - Fully Working */}
            <NavLink
              to="/wishlist"
              className="relative w-9 h-9 rounded-full bg-white border border-[#ddd5c7] shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Heart size={18} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-medium flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative w-9 h-9 rounded-full bg-black text-white shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <ShoppingBag size={18} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C8A977] text-black text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white text-sm font-medium shadow-md hover:bg-red-600 transition-all duration-300"
              >
                <User size={16} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setOpenAuth(true)}
                className="ml-2 flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-sm font-medium shadow-md hover:bg-[#8A6E4B] transition-all duration-300"
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden w-10 h-10 rounded-full bg-white border border-[#ddd5c7] shadow-sm flex items-center justify-center"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenu ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="bg-[#F1EDE5] border-t border-[#ddd5c7] px-5 py-5">
            <nav className="flex flex-col gap-5">
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between font-medium transition-all duration-300 ${
                      isActive ? "text-black" : "text-gray-700 hover:text-black"
                    }`
                  }
                >
                  {item.name}
                  <ChevronDown size={16} />
                </NavLink>
              ))}
            </nav>

            {/* Mobile Icons */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <button className="h-11 rounded-xl bg-white border border-[#ddd5c7] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <Search size={20} />
              </button>

              <NavLink
                to="/wishlist"
                onClick={() => setMobileMenu(false)}
                className="relative h-11 rounded-xl bg-white border border-[#ddd5c7] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Heart size={20} className={wishlistCount > 0 ? "fill-red-500 text-red-500" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMobileMenu(false)}
                className="relative h-11 rounded-xl bg-black text-white flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#C8A977] text-black text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Mobile Login */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenu(false);
                }}
                className="w-full mt-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenAuth(true);
                  setMobileMenu(false);
                }}
                className="w-full mt-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-[#8A6E4B] transition-all duration-300"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        open={openAuth}
        onClose={() => {
          setOpenAuth(false);
          const user = localStorage.getItem("user");
          const token = localStorage.getItem("token");
          setIsLoggedIn(!!(user || token));
        }}
      />
    </>
  );
}