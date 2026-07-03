import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#F1EDE5] py-1">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl border border-[#E5DED3] shadow-sm">

          {/* Left Side */}

          <div className="bg-[#D7D3CE] px-8 py-6 flex items-center relative overflow-hidden">

            {/* Background Circle */}
            <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-white/20"></div>
            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-white/10"></div>

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                  <Mail size={18} className="text-[#B8864A]" />
                </div>

                <span className="uppercase tracking-[4px] text-xs font-semibold text-[#B8864A]">
                  Newsletter
                </span>

              </div>

              <h2 className="mt-3 text-2xl font-bold text-[#222]">
                Join Our Newsletter
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-700">
                Subscribe today and get
                <span className="font-semibold text-[#B8864A]">
                  {" "}20% OFF{" "}
                </span>
                your first order plus exclusive weekly offers.
              </p>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-[#FAFAFA] px-8 py-6 flex items-center">

            <form className="w-full">

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition-all duration-300 focus:border-[#B8864A] focus:ring-2 focus:ring-[#B8864A]/20"
                />

                <button
                  type="submit"
                  className="group flex h-11 items-center justify-center gap-2 rounded-lg bg-[#222] px-7 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#B8864A]"
                >
                  Subscribe

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </button>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                No spam. Unsubscribe anytime.
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}