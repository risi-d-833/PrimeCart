import { memo } from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2, Star } from "lucide-react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const price = Number(item?.price || 0);
  const quantity = Number(item?.quantity || 1);

  return (
    <div className="group overflow-hidden rounded-3xl border border-[#E6DED2] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Product Image */}
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-[#F7F4EE] lg:h-44 lg:w-44">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            Premium
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h2 className="line-clamp-2 text-2xl font-bold text-[#1F1F1F]">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {item.description || "Luxury Collection"}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#F1EDE5] px-4 py-1 text-sm font-semibold text-[#8A6E4B]">
                {item.category || "Fashion"}
              </span>

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                In Stock
              </span>

              <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
                <Star size={14} fill="currentColor" />
                {item.rating || "4.8"}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Quantity */}
            <div className="flex w-fit items-center rounded-2xl border border-[#E6DED2] bg-[#F8F5EF] p-1">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white"
              >
                <Minus size={18} />
              </button>

              <span className="w-14 text-center text-lg font-bold">
                {quantity}
              </span>

              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white transition hover:bg-[#8A6E4B]"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Price */}
            <div className="text-center">
              <p className="text-sm text-gray-500">Price</p>

              <h3 className="text-xl font-bold">
                ₹{price.toLocaleString()}
              </h3>
            </div>

            {/* Total */}
            <div className="text-center">
              <p className="text-sm text-gray-500">Total</p>

              <h2 className="text-3xl font-black text-[#8A6E4B]">
                ₹{(price * quantity).toLocaleString()}
              </h2>
            </div>

            {/* Remove */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);