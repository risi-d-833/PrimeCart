export default function BannerSection() {
  const banners = [
    {
      tag: "NEW ARRIVAL",
      title: "MEN'S",
      subtitle: "COLLECTION",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      position: "right",
      button: "Shop Now",
    },
    {
      tag: "TRENDING",
      title: "WOMEN'S",
      subtitle: "COLLECTION",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      position: "center",
      button: "Discover",
    },
    {
      tag: "BIG SALE",
      title: "SALE OFF",
      subtitle: "20% - 45%",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      position: "right",
      button: "Shop Sale",
    },
  ];

  return (
    <section className="bg-[#F1EDE5] py-12">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {banners.map((banner, index) => (
            <div
              key={index}
              className="group relative h-48 overflow-hidden rounded-xl bg-white border border-[#E9E2D6] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}

              <img
                src={banner.image}
                alt={banner.title}
                className={`absolute inset-0 h-full w-full transition-all duration-700 group-hover:scale-110 ${
                  banner.position === "center"
                    ? "object-cover object-center"
                    : "object-cover object-right"
                }`}
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2] via-[#F8F6F2]/90 to-transparent"></div>

              {/* Decorative Square */}

              <div className="absolute right-10 top-6 h-20 w-20 rotate-45 border border-gray-300/60 transition-all duration-700 group-hover:rotate-[70deg]"></div>

              {/* Shine */}

              <div className="absolute -left-28 top-0 h-full w-16 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]"></div>

              {/* Content */}

              <div className="relative z-10 flex h-full flex-col justify-center px-7">

                <span className="text-[11px] uppercase tracking-[4px] text-[#B8864A] font-semibold">
                  {banner.tag}
                </span>

                <h2 className="mt-2 text-3xl font-extrabold leading-none text-[#222]">
                  {banner.title}
                </h2>

                <h3 className="mt-1 text-sm tracking-[3px] text-gray-600 uppercase">
                  {banner.subtitle}
                </h3>

                <button className="mt-5 w-fit rounded-full border border-[#222] px-5 py-2 text-xs font-semibold transition-all duration-300 hover:bg-[#222] hover:text-white hover:px-6">
                  {banner.button}
                </button>

              </div>

              {/* Bottom Accent */}

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#B8864A] transition-all duration-500 group-hover:w-full"></div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}