import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  Gift,
} from "lucide-react";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import CartItem from "../components/CartItem";
import { useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const discountAmount = Math.round((subtotal * discount) / 100);
  const total = subtotal + shipping + tax - discountAmount;

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PULSE20") {
      setDiscount(20);
      setAppliedCoupon("PULSE20");
    } else if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(10);
      setAppliedCoupon("WELCOME10");
    } else {
      alert("Invalid Coupon Code!");
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon("");
    setCouponCode("");
  };

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#F1EDE5] flex items-center justify-center px-5">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-24 h-24 rounded-full bg-[#F8F3EB] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={46} className="text-[#8A6E4B]" />
          </div>
          <h2 className="text-3xl font-black text-[#1F1F1F]">Your Cart is Empty</h2>
          <p className="mt-3 text-gray-500 leading-7">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-[#8A6E4B] transition text-lg"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F1EDE5] py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#1F1F1F]">Shopping Cart</h1>
            <p className="text-gray-500 mt-2">{cartItems.length} Products</p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-black text-[#1F1F1F] mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-8">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter Coupon Code"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-300 focus:border-[#8A6E4B] outline-none"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-8 rounded-2xl bg-black text-white hover:bg-[#8A6E4B] transition font-medium"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="mt-3 flex items-center justify-between bg-green-50 text-green-700 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Gift size={18} />
                      <span className="font-medium">{appliedCoupon} Applied (-{discount}%)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-600">Remove</button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <hr className="my-4" />

                <div className="flex justify-between text-2xl font-black text-[#1F1F1F]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress to Free Shipping */}
              {shipping !== 0 && (
                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Free Shipping</span>
                    <span>₹999</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8A6E4B] transition-all"
                      style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Spend ₹{Math.max(999 - subtotal, 0)} more for free shipping
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="space-y-4 mt-10 text-gray-600">
                <div className="flex items-center gap-3">
                  <Truck size={20} />
                  Free Delivery on Orders Above ₹999
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} />
                  100% Secure Payments
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-3">We Accept</p>
                <div className="flex gap-4 text-3xl">
                  <span>💳</span>
                  <span>🇮🇳</span>
                  <span>🔄</span>
                  <span>📱</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => alert("Proceeding to Checkout... (Payment Gateway will be integrated here)")}
                className="mt-10 w-full h-16 rounded-2xl bg-black text-white font-bold text-lg hover:bg-[#8A6E4B] transition flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="mt-4 w-full h-14 rounded-2xl border border-[#ddd] flex items-center justify-center gap-2 font-semibold hover:bg-[#F1EDE5] transition"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}