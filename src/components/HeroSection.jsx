import {
  ArrowRight,
  Play,
  ShoppingBag,
} from "lucide-react";
import man from "../assets/man.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F8F5EF] via-[#F3EEE5] to-[#E8DCCB] flex items-center">
      {/* Background Blur Elements */}
      <div className="absolute -top-32 -left-24 h-[450px] w-[450px] rounded-full bg-[#E9DCC7] blur-[150px] opacity-70"></div>
      <div className="absolute -bottom-32 -right-24 h-[500px] w-[500px] rounded-full bg-[#DCC8AB] blur-[170px] opacity-70"></div>
      <div className="absolute top-24 right-1/4 h-60 w-60 rounded-full bg-white blur-[120px] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">
            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight">
              Wear
              <br />
              Luxury
              <span className="text-[#A77C45]"> Fashion</span>
              <br />
              Everyday
            </h1>
            <p className="mt-7 text-gray-600 max-w-xl text-lg leading-8 mx-auto lg:mx-0">
              Premium clothing crafted with timeless elegance, luxurious fabrics
              and modern design. Experience fashion that combines comfort,
              confidence and sophistication.
            </p>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-5">
              <button className="group rounded-full bg-black text-white px-8 py-4 flex items-center gap-3 font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                Shop Now
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
              <button className="rounded-full border-2 border-black px-8 py-4 font-semibold flex items-center gap-3 transition hover:bg-black hover:text-white">
                <Play size={18} />
                Lookbook
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="relative flex justify-center items-center">
            {/* Glow behind circle */}
            <div className="absolute h-[650px] w-[650px] rounded-full bg-[#E8D7BC] blur-[180px] opacity-60"></div>

            {/* Circular Container */}
            <div className="relative h-[330px] w-[330px] sm:h-[430px] sm:w-[430px] lg:h-[560px] lg:w-[560px] rounded-full bg-gradient-to-br from-white via-[#F6F2EA] to-[#DDD0BB] shadow-[0_40px_80px_rgba(0,0,0,.15)] overflow-hidden">
              <img
                src={man}
                alt="Fashion Model"
                className="w-full h-full object-cover object-center scale-110 transition-all duration-700 hover:scale-100"
              />
            </div>

            {/* Left Floating Card */}
            <div className="absolute left-0 lg:-left-6 top-16 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#F4EEE5] flex items-center justify-center">
                  <ShoppingBag />
                </div>
                <div>
                  <h3 className="font-semibold">New Arrival</h3>
                  <p className="text-sm text-gray-500">Summer Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}