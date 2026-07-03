export default function CategorySection() {
  const categories = [
    {
      name: "Watch",
      products: 17,
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Fashion",
      products: 6,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Ethnic Wear",
      products: 4,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Goggles",
      products: 10,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Tote Bag",
      products: 4,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Shoes",
      products: 5,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="bg-[#F1EDE5] py-12">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-12">
          <p className="uppercase tracking-[4px] text-[#B8864A] text-xs font-semibold">
            Shop Categories
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#222]">
            Best For Your Categories
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Discover premium collections for every style.
          </p>
        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((item, index) => (
            <div
              key={index}
              className="group text-center cursor-pointer"
            >
              {/* Image */}

              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-white shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

                {/* Golden Border */}

                <div className="absolute inset-1 rounded-full border-2 border-transparent group-hover:border-[#C89B63] transition-all duration-500"></div>

                {/* Shine */}

                <div className="absolute -left-16 top-0 h-full w-8 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[140%]"></div>
              </div>

              {/* Text */}

              <h3 className="mt-4 text-base font-semibold text-[#222] transition-all duration-300 group-hover:text-[#B8864A]">
                {item.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {item.products} Products
              </p>

              {/* Animated Line */}

              <div className="mx-auto mt-3 h-[2px] w-0 rounded-full bg-[#B8864A] transition-all duration-500 group-hover:w-10"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}