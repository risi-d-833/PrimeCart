import React, { useMemo, useRef, useState } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Bags",
  "Jewelry",
  "Scarves",
  "Belts",
  "Hats",
  "Sunglasses",
  "Wallets",
];

const IMG = (id) => `https://picsum.photos/id/${id}/600/750`;

// 45 Premium Accessories
const PRODUCTS = [
  {
    id: 301,
    name: "Leather Tote Bag",
    category: "Bags",
    price: 4299,
    rating: 4.8,
    image: IMG(201),
    isNew: true,
  },
  {
    id: 302,
    name: "Minimal Gold Necklace",
    category: "Jewelry",
    price: 1899,
    rating: 4.7,
    image: IMG(210),
  },
  {
    id: 303,
    name: "Cashmere Wool Scarf",
    category: "Scarves",
    price: 1499,
    rating: 4.9,
    image: IMG(220),
  },
  {
    id: 304,
    name: "Braided Leather Belt",
    category: "Belts",
    price: 1299,
    rating: 4.6,
    image: IMG(230),
  },
  {
    id: 305,
    name: "Classic Fedora Hat",
    category: "Hats",
    price: 2199,
    rating: 4.5,
    image: IMG(240),
  },
  {
    id: 306,
    name: "Polarized Sunglasses",
    category: "Sunglasses",
    price: 2599,
    rating: 4.8,
    image: IMG(250),
  },
  {
    id: 307,
    name: "Slim Leather Wallet",
    category: "Wallets",
    price: 1799,
    rating: 4.7,
    image: IMG(260),
  },
  {
    id: 308,
    name: "Canvas Crossbody Bag",
    category: "Bags",
    price: 2799,
    rating: 4.6,
    image: IMG(270),
  },
  {
    id: 309,
    name: "Silver Hoop Earrings",
    category: "Jewelry",
    price: 999,
    rating: 4.5,
    image: IMG(280),
  },
  {
    id: 310,
    name: "Patterned Silk Scarf",
    category: "Scarves",
    price: 1399,
    rating: 4.8,
    image: IMG(290),
  },

  {
    id: 311,
    name: "Wide Brim Sun Hat",
    category: "Hats",
    price: 1699,
    rating: 4.6,
    image: IMG(300),
    isNew: true,
  },
  {
    id: 312,
    name: "Aviator Sunglasses",
    category: "Sunglasses",
    price: 2299,
    rating: 4.7,
    image: IMG(310),
  },
  {
    id: 313,
    name: "Card Holder Wallet",
    category: "Wallets",
    price: 899,
    rating: 4.5,
    image: IMG(320),
  },
  {
    id: 314,
    name: "Leather Backpack",
    category: "Bags",
    price: 4599,
    rating: 4.8,
    image: IMG(330),
  },
  {
    id: 315,
    name: "Layered Chain Necklace",
    category: "Jewelry",
    price: 1599,
    rating: 4.6,
    image: IMG(340),
  },
  {
    id: 316,
    name: "Merino Wool Beanie",
    category: "Hats",
    price: 1199,
    rating: 4.7,
    image: IMG(350),
  },
  {
    id: 317,
    name: "Studded Leather Belt",
    category: "Belts",
    price: 1499,
    rating: 4.5,
    image: IMG(360),
  },
  {
    id: 318,
    name: "Oversized Square Sunglasses",
    category: "Sunglasses",
    price: 1999,
    rating: 4.6,
    image: IMG(370),
  },
  {
    id: 319,
    name: "Travel Passport Wallet",
    category: "Wallets",
    price: 2199,
    rating: 4.8,
    image: IMG(380),
  },
  {
    id: 320,
    name: "Quilted Shoulder Bag",
    category: "Bags",
    price: 3299,
    rating: 4.7,
    image: IMG(390),
  },

  {
    id: 321,
    name: "Pearl Drop Earrings",
    category: "Jewelry",
    price: 1299,
    rating: 4.6,
    image: IMG(400),
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

export default function Accessories() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black text-white px-6 md:px-12 py-20 md:py-28">
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 mb-4">
            Home / Accessories
          </p>
          <h1 className="mc-serif text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-5">
            Accessories
          </h1>
          <p className="text-zinc-300 text-[15px] md:text-lg max-w-xl mx-auto">
            The finishing touches that elevate every outfit.
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
                  ? "bg-zinc-900 border-zinc-900 text-white"
                  : "bg-white border-[#E7E2D9] text-[#5B5647] hover:border-zinc-900 hover:text-zinc-900"
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
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-sm font-medium bg-white border border-[#E7E2D9] text-[#5B5647] outline-none focus:border-zinc-900 cursor-pointer w-full md:w-auto"
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
                className="mc-card group relative bg-white rounded-3xl overflow-hidden border border-[#E7E2D9] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-zinc-900/60"
                style={{ animationDelay: `${(i % 8) * 45}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
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
                          : "bg-white text-black hover:bg-zinc-900 hover:text-white"
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
