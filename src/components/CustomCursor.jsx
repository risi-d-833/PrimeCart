import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const down = () => setClick(true);
    const up = () => setClick(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    let animationFrame;

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.16;
      current.current.y += (mouse.current.y - current.current.y) * 0.16;

      const transform = `translate3d(${current.current.x}px, ${current.current.y}px,0) translate(-50%,-50%)`;

      if (cursorRef.current) {
        cursorRef.current.style.transform = transform;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = transform;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px,0) translate(-50%,-50%)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const elements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], .cursor-hover"
    );

    const enter = () => setHover(true);
    const leave = () => setHover(false);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      document.body.style.cursor = "auto";

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      {/* Glow */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 pointer-events-none z-[9997]
        rounded-full transition-all duration-300
        ${
          hover
            ? "w-24 h-24 opacity-100 scale-100"
            : "w-16 h-16 opacity-70 scale-100"
        }
        ${click ? "scale-90" : ""}`}
        style={{
          background:
            "radial-gradient(circle, rgba(232,210,162,.28) 0%, rgba(200,169,126,.15) 40%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Main Ring */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 pointer-events-none z-[9998]
        rounded-full transition-all duration-300 ease-out
        ${
          hover
            ? "w-14 h-14 border-[#C8A97E]"
            : "w-10 h-10 border-[#D6B98C]"
        }
        ${click ? "scale-75" : "scale-100"}`}
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          background: "rgba(255,255,255,.03)",
          boxShadow: hover
            ? "0 0 28px rgba(214,185,140,.55)"
            : "0 0 12px rgba(214,185,140,.25)",
        }}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 pointer-events-none z-[9999]
        rounded-full transition-all duration-150
        ${hover ? "w-4 h-4" : "w-3 h-3"}
        ${click ? "scale-150" : "scale-100"}`}
        style={{
          background:
            "linear-gradient(135deg,#F4E2BE 0%,#D6B98C 50%,#1F1F1F 100%)",
          boxShadow:
            "0 0 10px rgba(214,185,140,.9),0 0 20px rgba(200,169,126,.45)",
        }}
      />
    </>
  );
}