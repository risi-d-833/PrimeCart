import React, { useMemo, useRef, useState } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Shirts",
  "Outerwear",
  "Denim",
  "Footwear",
  "Accessories",
];

const IMG = (id) => `https://picsum.photos/id/${id}/600/750`;

// Expanded Product List (24 original + 21 new = 45 products)
const PRODUCTS = [
  // Original Products
  {
    id: 1,
    name: "Oxford Cotton Shirt",
    category: "Shirts",
    price: 2499,
    rating: 4.6,
    image: IMG(1015),
    isNew: true,
  },
  {
    id: 2,
    name: "Linen Blend Shirt",
    category: "Shirts",
    price: 2199,
    rating: 4.3,
    image: IMG(1027),
  },
  {
    id: 3,
    name: "Flannel Check Shirt",
    category: "Shirts",
    price: 2299,
    originalPrice: 2899,
    rating: 4.5,
    image: IMG(1060),
  },
  {
    id: 4,
    name: "Performance Polo",
    category: "Shirts",
    price: 1799,
    rating: 4.2,
    image: IMG(1074),
  },
  {
    id: 5,
    name: "Ribbed Turtleneck",
    category: "Shirts",
    price: 1999,
    rating: 4.4,
    image: IMG(1080),
  },
  {
    id: 6,
    name: "Merino Crew Sweater",
    category: "Outerwear",
    price: 3499,
    rating: 4.7,
    image: IMG(133),
    isNew: true,
  },
  {
    id: 7,
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 8999,
    originalPrice: 10999,
    rating: 4.8,
    image: IMG(201),
  },
  {
    id: 8,
    name: "Quilted Field Jacket",
    category: "Outerwear",
    price: 5499,
    rating: 4.5,
    image: IMG(211),
  },
  {
    id: 9,
    name: "Shearling Bomber",
    category: "Outerwear",
    price: 7299,
    rating: 4.6,
    image: IMG(225),
  },
  {
    id: 10,
    name: "Technical Windbreaker",
    category: "Outerwear",
    price: 3999,
    rating: 4.1,
    image: IMG(237),
  },
  {
    id: 11,
    name: "Selvedge Denim Jacket",
    category: "Denim",
    price: 4599,
    rating: 4.6,
    image: IMG(251),
  },
  {
    id: 12,
    name: "Slim Fit Denim",
    category: "Denim",
    price: 2799,
    rating: 4.3,
    image: IMG(266),
    isNew: true,
  },
  {
    id: 13,
    name: "Raw Denim Slim",
    category: "Denim",
    price: 3199,
    originalPrice: 3799,
    rating: 4.5,
    image: IMG(275),
  },
  {
    id: 14,
    name: "Tapered Chino Trouser",
    category: "Denim",
    price: 2399,
    rating: 4.2,
    image: IMG(288),
  },
  {
    id: 15,
    name: "Straight Leg Trouser",
    category: "Denim",
    price: 2599,
    rating: 4.4,
    image: IMG(299),
  },
  {
    id: 16,
    name: "Suede Chelsea Boot",
    category: "Footwear",
    price: 5999,
    rating: 4.7,
    image: IMG(312),
  },
  {
    id: 17,
    name: "Leather Derby Shoe",
    category: "Footwear",
    price: 6499,
    originalPrice: 7499,
    rating: 4.6,
    image: IMG(321),
  },
  {
    id: 18,
    name: "Suede Sneaker",
    category: "Footwear",
    price: 4299,
    rating: 4.4,
    image: IMG(335),
    isNew: true,
  },
  {
    id: 19,
    name: "Monk Strap Shoe",
    category: "Footwear",
    price: 6999,
    rating: 4.5,
    image: IMG(342),
  },
  {
    id: 20,
    name: "Canvas Trail Boot",
    category: "Footwear",
    price: 3899,
    rating: 4.1,
    image: IMG(355),
  },
  {
    id: 21,
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 1899,
    rating: 4.8,
    image: IMG(366),
  },
  {
    id: 22,
    name: "Signet Cufflinks",
    category: "Accessories",
    price: 1299,
    rating: 4.3,
    image: IMG(377),
  },
  {
    id: 23,
    name: "Silk Pocket Square",
    category: "Accessories",
    price: 899,
    rating: 4.2,
    image: IMG(388),
  },
  {
    id: 24,
    name: "Leather Weekend Bag",
    category: "Accessories",
    price: 5299,
    originalPrice: 6199,
    rating: 4.7,
    image: IMG(399),
    isNew: true,
  },

  {
    id: 25,
    name: "Slim Fit Oxford Shirt",
    category: "Shirts",
    price: 2599,
    rating: 4.5,
    image: IMG(1018),
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

export default function Men() {
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
      if (next.has(id)) {
        next.delete(id);
        toast.success("Removed from wishlist ❤️");
      } else {
        next.add(id);
        toast.success("Added to wishlist ❤️");
      }
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
    }, 1800);
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#10131C] to-[#1B2030] text-[#FBF9F5] px-6 md:px-12 py-20 md:py-28">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #C08A3E 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9AA1B2] mb-4">
            Home / Men
          </p>
          <h1 className="mc-serif text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-5">
            Men&apos;s Collection
          </h1>
          <p className="text-[#B7BCC8] text-[15px] md:text-lg max-w-xl mx-auto">
             premium essentials — built to last beyond seasons.
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
                  ? "bg-[#10131C] border-[#10131C] text-white"
                  : "bg-white border-[#E7E2D9] text-[#5B5647] hover:border-[#C08A3E] hover:text-[#10131C]"
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
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-sm font-medium bg-white border border-[#E7E2D9] text-[#10131C] outline-none focus:border-[#C08A3E] cursor-pointer w-full md:w-auto"
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

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="px-3 py-1 text-[10px] font-bold bg-black text-white rounded-full">
                        NEW
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="px-3 py-1 text-[10px] font-bold bg-red-600 text-white rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-all shadow"
                  >
                    <Heart
                      size={18}
                      className={
                        isWished ? "fill-red-600 text-red-600" : "text-zinc-700"
                      }
                    />
                  </button>

                  {/* Add to Bag */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleAddToBag(product.id)}
                      className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                        isAdded
                          ? "bg-emerald-700 text-white"
                          : "bg-white text-black hover:bg-amber-700 hover:text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          {" "}
                          <Check size={17} /> Added to Bag{" "}
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
