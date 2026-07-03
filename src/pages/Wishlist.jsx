import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, Plus } from "lucide-react";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice"; // Assuming you have this action

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    alert(`${item.title} added to cart!`);
  };

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
  };

  // Empty Wishlist
  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#F1EDE5] flex items-center justify-center px-5">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <Heart size={48} className="text-red-400" />
          </div>

          <h2 className="text-3xl font-black text-[#1F1F1F]">Your Wishlist is Empty</h2>
          <p className="mt-3 text-gray-500 leading-7">
            Save your favorite items here for later.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-[#8A6E4B] transition text-lg"
          >
            Start Shopping
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
            <h1 className="text-4xl font-black text-[#1F1F1F]">My Wishlist</h1>
            <p className="text-gray-500 mt-2">{wishlistItems.length} Items</p>
          </div>
          <Link
            to="/"
            className="text-[#8A6E4B] font-medium hover:underline flex items-center gap-2"
          >
            Continue Shopping →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-80 bg-[#F8F6F1] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1F1F1F] line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{item.category || "Fashion"}</p>

                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-2xl font-black text-[#1F1F1F]">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-[#8A6E4B] transition-all active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}