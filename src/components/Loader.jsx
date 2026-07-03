import { useEffect, useState } from "react";

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#F1EDE5] flex items-center justify-center overflow-hidden">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#f5d0a8_0.8px,transparent_1px)] bg-[length:30px_30px] opacity-40" />
        
        {/* Soft Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-400/20 to-amber-300/10 blur-[140px]" />

        {/* Main Loader */}
        <div className="relative flex flex-col items-center">
          
          {/* Spinner Container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            
            {/* Gradient Spinner Ring */}
            <div className="absolute w-32 h-32 rounded-full border-[6px] border-transparent 
                            bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 
                            animate-spin-slow shadow-2xl"
                 style={{
                   mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                   WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                   maskComposite: "exclude"
                 }}
            />

            {/* Inner Circle with Logo */}
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10">
              <div className="relative">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-amber-600 tracking-tighter animate-pulse">
                  P
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mt-8 flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-800 tracking-wide">
              Loading
            </p>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-0.5 bg-gray-200 rounded-full mt-10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-progress" />
          </div>
        </div>
      </div>
    );
  }

  return children;
}