import { Star, Quote, ShieldCheck, Users, ShoppingBag } from "lucide-react";

export default function GlobalRating() {
  const reviews = [
    {
      id: 1,
      name: "Sophia Anderson",
      country: "United States",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
      review:
        "Amazing quality products. The delivery was fast and everything looked premium.",
    },
    {
      id: 2,
      name: "James Wilson",
      country: "United Kingdom",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      review:
        "Fantastic customer service and beautiful packaging. Highly recommended.",
    },
    {
      id: 3,
      name: "Emily Brown",
      country: "Canada",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
      review: "The products exceeded my expectations. Definitely buying again.",
    },
  ];

  return (
    <section className="bg-[#F1EDE5] py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <div className="text-center mb-14">
          <p className="uppercase tracking-[6px] text-sm font-semibold text-[#B8864A]">
            Customer Reviews
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-[#222]">
            Trusted By Thousands
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            More than 25,000 customers trust our products worldwide.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#FFF6EB] flex items-center justify-center">
              <Star className="text-[#B8864A]" fill="currentColor" />
            </div>

            <h3 className="mt-4 text-4xl font-bold">4.9</h3>

            <p className="text-gray-500 mt-2">Average Rating</p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#FFF6EB] flex items-center justify-center">
              <Users className="text-[#B8864A]" />
            </div>

            <h3 className="mt-4 text-4xl font-bold">25K+</h3>

            <p className="text-gray-500 mt-2">Happy Customers</p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#FFF6EB] flex items-center justify-center">
              <ShoppingBag className="text-[#B8864A]" />
            </div>

            <h3 className="mt-4 text-4xl font-bold">120K+</h3>

            <p className="text-gray-500 mt-2">Orders Delivered</p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#FFF6EB] flex items-center justify-center">
              <ShieldCheck className="text-[#B8864A]" />
            </div>

            <h3 className="mt-4 text-4xl font-bold">99%</h3>

            <p className="text-gray-500 mt-2">Positive Feedback</p>
          </div>
        </div>

        {/* Reviews */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              {" "}
              {/* Quote */}
              <div className="flex justify-between items-center">
                <Quote
                  size={34}
                  className="text-[#B8864A] opacity-20 group-hover:rotate-12 transition"
                />

                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              {/* Review */}
              <p className="mt-6 text-gray-600 leading-7">"{item.review}"</p>
              {/* User */}
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-[#B8864A]/20"
                />

                <div>
                  <h4 className="font-semibold text-lg text-[#222]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">{item.country}</p>
                </div>
              </div>
              {/* Bottom Hover Line */}
              <div className="mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-[#B8864A] to-[#E5B66A] transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
