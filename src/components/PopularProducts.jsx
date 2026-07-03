import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

export default function PopularProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  const products = [
    {
      id: 1,
      title: "Luxury Wrist Watch",
      category: "Fashion",
      price: 22,
      oldPrice: 35,
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=80",
      sale: "-35%",
    },
    {
      id: 2,
      title: "Soft Cashmere Scarf",
      category: "Accessories",
      price: 16,
      oldPrice: 28,
      image:
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&auto=format&fit=crop&q=80",
      sale: "-20%",
    },
    {
      id: 3,
      title: "Premium Laptop Bag",
      category: "Accessories",
      price: 32,
      oldPrice: 45,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      sale: "-15%",
    },
    {
      id: 4,
      title: "Denim Shirt",
      category: "Apparel",
      price: 28,
      oldPrice: 42,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
      sale: "-30%",
    },
    {
      id: 5,
      title: "Classic Leather Belt",
      category: "Accessories",
      price: 21,
      oldPrice: 30,
      image:
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80",
      sale: "-25%",
    },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
    const isSaved = wishlistItems.some((item) => item.id === product.id);
    toast.success(isSaved ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`);
  };

  return (
    <section className="bg-[#F1EDE5] py-14">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-12">

          <p className="uppercase tracking-[4px] text-[#B8864A] text-xs font-semibold">
            Trending Collection
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#222]">
            Popular Products
          </h2>

          <div className="mt-5 flex justify-center gap-8 text-sm font-medium text-gray-500">
            <button className="text-[#B8864A] border-b-2 border-[#B8864A] pb-1">
              Fashion
            </button>

            <button className="hover:text-[#B8864A] transition">
              Accessories
            </button>

            <button className="hover:text-[#B8864A] transition">
              Apparel
            </button>
          </div>

        </div>

        {/* Products */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              {/* Image */}

              <div className="relative overflow-hidden bg-[#FAFAFA]">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Sale */}

                <span className="absolute top-3 left-3 bg-[#222] text-white text-xs px-2 py-1 rounded">
                  {item.sale}
                </span>

                {/* Icons */}

                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                  <button
                    onClick={() => handleToggleWishlist(item)}
                    className="h-9 w-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#B8864A] hover:text-white transition"
                  >
                    <Heart
                      size={17}
                      className={wishlistItems.some((wishlistItem) => wishlistItem.id === item.id) ? "fill-red-500 text-red-500" : ""}
                    />
                  </button>

                  <button className="h-9 w-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#B8864A] hover:text-white transition">
                    <Eye size={17} />
                  </button>

                </div>

                {/* Add Cart */}

                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition duration-500 bg-[#222] hover:bg-[#B8864A] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm"
                >
                  <ShoppingBag size={16} />
                  Add Cart
                </button>

              </div>

              {/* Content */}

              <div className="p-5">

                <p className="text-xs uppercase tracking-wider text-[#B8864A]">
                  {item.category}
                </p>

                <h3 className="mt-2 font-semibold text-[#222] line-clamp-2 h-12">
                  {item.title}
                </h3>

                {/* Rating */}

                <div className="flex justify-center mt-3 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>

                {/* Price */}

                <div className="flex justify-center items-center gap-2 mt-3">
                  <span className="text-lg font-bold text-[#222]">
                    ₹{item.price}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}