import React, { useMemo, useRef, useState } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Tops",
  "Dresses",
  "Outerwear",
  "Denim",
  "Footwear",
  "Accessories",
];

const IMG = (id) => `https://picsum.photos/id/${id}/600/750`;

// Women's Products (24 original style + 21 new = 45 total)
const PRODUCTS = [
  // Original Style Products
  {
    id: 101,
    name: "Silk Blouse",
    category: "Tops",
    price: 2899,
    rating: 4.7,
    image: IMG(1005),
    isNew: true,
  },
  {
    id: 102,
    name: "Linen Shirt Dress",
    category: "Dresses",
    price: 3299,
    rating: 4.5,
    image: IMG(1010),
  },
  {
    id: 103,
    name: "Cashmere Sweater",
    category: "Outerwear",
    price: 4599,
    rating: 4.8,
    image: IMG(1020),
  },
  {
    id: 104,
    name: "Wide Leg Jeans",
    category: "Denim",
    price: 2799,
    rating: 4.4,
    image: IMG(1030),
  },
  {
    id: 105,
    name: "Leather Ankle Boots",
    category: "Footwear",
    price: 6299,
    rating: 4.6,
    image: IMG(1040),
  },
  {
    id: 106,
    name: "Cotton Poplin Shirt",
    category: "Tops",
    price: 2199,
    rating: 4.3,
    image: IMG(1055),
  },
  {
    id: 107,
    name: "Midi Slip Dress",
    category: "Dresses",
    price: 3599,
    rating: 4.7,
    image: IMG(1065),
  },
  {
    id: 108,
    name: "Wool Blend Coat",
    category: "Outerwear",
    price: 8999,
    originalPrice: 11999,
    rating: 4.9,
    image: IMG(1080),
  },
  {
    id: 109,
    name: "Mom Fit Jeans",
    category: "Denim",
    price: 2599,
    rating: 4.5,
    image: IMG(1095),
  },
  {
    id: 110,
    name: "Suede Loafers",
    category: "Footwear",
    price: 4899,
    rating: 4.6,
    image: IMG(1105),
  },

  // More Products (Total 45)
  {
    id: 111,
    name: "Ribbed Knit Top",
    category: "Tops",
    price: 1799,
    rating: 4.4,
    image: IMG(1120),
    isNew: true,
  },
  {
    id: 112,
    name: "Floral Maxi Dress",
    category: "Dresses",
    price: 3999,
    rating: 4.6,
    image: IMG(1135),
  },
  {
    id: 113,
    name: "Quilted Bomber Jacket",
    category: "Outerwear",
    price: 5199,
    rating: 4.5,
    image: IMG(1150),
  },
  {
    id: 114,
    name: "High Rise Straight Jeans",
    category: "Denim",
    price: 2999,
    rating: 4.7,
    image: IMG(1165),
  },
  {
    id: 115,
    name: "Chelsea Leather Boots",
    category: "Footwear",
    price: 6799,
    rating: 4.8,
    image: IMG(1180),
  },
  {
    id: 116,
    name: "Oversized Button Shirt",
    category: "Tops",
    price: 2399,
    rating: 4.3,
    image: IMG(1195),
  },
  {
    id: 117,
    name: "Wrap Midi Dress",
    category: "Dresses",
    price: 3499,
    rating: 4.6,
    image: IMG(1210),
  },
  {
    id: 118,
    name: "Trench Coat",
    category: "Outerwear",
    price: 10999,
    originalPrice: 13999,
    rating: 4.9,
    image: IMG(1225),
  },
  {
    id: 119,
    name: "Boyfriend Jeans",
    category: "Denim",
    price: 2699,
    rating: 4.4,
    image: IMG(1240),
  },
  {
    id: 120,
    name: "Canvas Sneakers",
    category: "Footwear",
    price: 3299,
    rating: 4.5,
    image: IMG(1255),
  },

  // Additional 25 products
  {
    id: 121,
    name: "Silk Cami Top",
    category: "Tops",
    price: 1899,
    rating: 4.6,
    image: IMG(1270),
  },
];

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "priceAsc", label: "Price: Low to High" },
  { key: "priceDesc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

function formatPrice(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function Women() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("featured");
  const [wishlist, setWishlist] = useState(() => new Set());
  const [added, setAdded] = useState(() => new Set());
  const timeouts = useRef({});

  const visibleProducts = useMemo(() => {
    let list =
      activeCategory === "All"
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortKey === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sortKey === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sortKey === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortKey]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddToBag = (id) => {
    setAdded((prev) => new Set(prev).add(id));
    clearTimeout(timeouts.current[id]);
    timeouts.current[id] = setTimeout(() => {
      setAdded((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1600);
  };

  return (
    <div className="mc-sans bg-[#F4EFE7] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .mc-serif { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
        .mc-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes mcRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .mc-card { animation: mcRise .45s ease both; }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C1A2B] to-[#1F1621] text-white px-6 md:px-12 py-20 md:py-28">
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-pink-300 mb-4">
            Home / Women
          </p>
          <h1 className="mc-serif text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-5">
            Women&apos;s Collection
          </h1>
          <p className="text-pink-200 text-[15px] md:text-lg max-w-xl mx-auto">
            Timeless silhouettes with effortless elegance and everyday comfort.
          </p>
        </div>
      </section>

      {/* Filter & Sort */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#2C1A2B] border-[#2C1A2B] text-white"
                  : "bg-white border-[#E7E2D9] text-[#5B5647] hover:border-[#C08A3E] hover:text-[#2C1A2B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#8A8478] whitespace-nowrap">
            {visibleProducts.length} products
          </span>
          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-sm font-medium bg-white border border-[#E7E2D9] text-[#2C1A2B] outline-none focus:border-[#C08A3E] cursor-pointer w-full md:w-auto"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8478]"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {visibleProducts.map((product, i) => {
            const isWished = wishlist.has(product.id);
            const isAdded = added.has(product.id);
            const discount = product.originalPrice
              ? Math.round(100 - (product.price / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="mc-card group relative bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#C08A3E]/60"
                style={{ animationDelay: `${(i % 8) * 45}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE9DF]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="px-3 py-1 text-[10px] font-bold bg-black text-white rounded-full">
                        NEW
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="px-3 py-1 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-all shadow"
                  >
                    <Heart
                      size={18}
                      className={
                        isWished
                          ? "fill-rose-600 text-rose-600"
                          : "text-zinc-700"
                      }
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleAddToBag(product.id)}
                      className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                        isAdded
                          ? "bg-emerald-700 text-white"
                          : "bg-white text-black hover:bg-rose-700 hover:text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          {" "}
                          <Check size={17} /> Added{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <ShoppingBag size={17} /> Add to Bag{" "}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs uppercase tracking-widest text-[#8A8478]">
                    {product.category}
                  </p>
                  <h3 className="mc-serif text-[15px] font-medium leading-tight mt-1 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={13} className="fill-amber-500 text-amber-500" />
                    <span className="text-sm text-[#8A8478]">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
