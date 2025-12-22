import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 text-center text-slate-400 text-sm">
      <div className="flex justify-center gap-6 mb-3">
        <Link to="/about" className="hover:text-white transition">About</Link>
        <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition">Terms</Link>
      </div>
      <p>© {new Date().getFullYear()} BGErase — All rights reserved.</p>
    </footer>
  );
}
