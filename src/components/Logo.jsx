// src/components/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ size = "md" }) {
  const sizeMap = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl md:text-[32px]",
  };

  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                 bg-slate-950/70 border border-slate-700/70
                 hover:border-[#9B59FF] hover:bg-slate-900
                 transition duration-200 group"
    >
      {/* Small gradient badge on the left */}
      <div
        className="h-8 w-8 rounded-2xl bg-gradient-to-br
                   from-[#5865F2] via-[#9B59FF] to-[#1ED5A9]
                   flex items-center justify-center
                   shadow-[0_0_14px_rgba(88,101,242,0.45)]
                   group-hover:shadow-[0_0_20px_rgba(155,89,255,0.6)]
                   transition"
      >
        <span className="text-[13px] font-semibold text-slate-950 leading-none">
          BG
        </span>
      </div>

      {/* Brand text */}
      <span
        className={`font-semibold tracking-wide bg-gradient-to-r
                    from-[#5865F2] via-[#9B59FF] to-[#1ED5A9]
                    text-transparent bg-clip-text
                    drop-shadow-[0_0_10px_rgba(88,101,242,0.35)]
                    ${sizeMap[size]}`}
      >
        BGErase
      </span>
    </Link>
  );
}
