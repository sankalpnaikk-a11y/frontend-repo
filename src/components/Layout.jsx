import React from "react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col bg-hero-pattern">
      {/* NAVBAR */}
      <nav className="w-full py-6 flex justify-center items-center">
        <div
          className="cursor-pointer rounded-full px-3 py-1 flex items-center gap-3"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-emerald-400 flex items-center justify-center text-black font-bold">
            BG
          </div>
          <div className="text-[22px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
            BGErase
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6">{children}</main>

      {/* FOOTER */}
      <footer className="w-full mt-12 py-6 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} BGErase — All Rights Reserved.
      </footer>
    </div>
  );
}
