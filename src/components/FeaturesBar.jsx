import {
  Truck,
  BadgeDollarSign,
  Gift,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Worldwide Shipping",
    subtitle: "Order Above $100",
  },
  {
    icon: BadgeDollarSign,
    title: "Money Back Guarantee",
    subtitle: "Guarantee Within 30 Days",
  },
  {
    icon: Gift,
    title: "Offers And Discounts",
    subtitle: "Back Returns In 7 Days",
  },
  {
    icon: Headphones,
    title: "24/7 Support Services",
    subtitle: "Any Time Support",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-[#F1EDE5] py-8">
      <div className="max-w-7xl mx-auto px-5">

        <div className="overflow-hidden rounded-md border border-[#E5DED3] bg-[#F8F5EF] shadow-sm">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`group relative flex items-center gap-3 px-6 py-5 transition-all duration-300 hover:bg-white
                  ${
                    index !== features.length - 1
                      ? "lg:border-r border-[#E5DED3]"
                      : ""
                  }`}
                >
                  {/* Hover Border */}
                  <span className="absolute left-0 top-0 h-0 w-[3px] bg-[#8B5E3C] transition-all duration-300 group-hover:h-full"></span>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DDD3C7] bg-white transition-all duration-300 group-hover:bg-[#8B5E3C] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#2B2B2B]">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}