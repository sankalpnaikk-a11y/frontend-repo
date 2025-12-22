import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-start mt-6">
        <div className="space-y-5">
          <h1 className="hero-title text-left md:text-[36px]">
            Remove backgrounds, crop &amp; resize in seconds.
          </h1>

          <p className="hero-sub text-left">
            BGErase is your clean, no-login background remover. Perfect for passport
            photos, LinkedIn headshots, ecommerce products and social media DPs —
            all processed locally on your device.
          </p>

          <div className="flex flex-wrap gap-3 text-[11px]">
            <span className="pill pink">🧠 AI background remover</span>
            <span className="pill indigo">📐 Passport &amp; social presets</span>
            <span className="pill green">📁 File size estimate</span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => navigate("/editor")}
              className="btn-main w-auto px-6 py-3 text-sm"
            >
              ✨ Open BGErase Editor
            </button>

            <button
              onClick={() => navigate("/editor")}
              className="btn-outline"
            >
              Try with a sample image →
            </button>
          </div>

          <ul className="mt-4 space-y-1 text-[12px] text-slate-400 max-w-[640px]">
            <li>• Create passport-size photos with one click</li>
            <li>• Change background to white / blue / any custom colour</li>
            <li>• Keep transparent PNG for logos &amp; social media</li>
            <li>• Compress images while keeping edges sharp</li>
          </ul>
        </div>

        <div className="panel">
          <div className="flex items-center justify-between mb-3 text-[11px] text-slate-300">
            <p className="font-semibold">Before → After preview</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="preview-frame">
              <div className="preview-inner">
                <img src="/samples/before.jpg" alt="before" className="preview-img" />
              </div>
            </div>

            <div className="preview-frame highlight">
              <div className="preview-inner">
                <img src="/samples/after.jpg" alt="after" className="preview-img" />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            Example: take a noisy selfie or product photo, remove the background
            and export ready-to-use images for IDs, resumes and ecommerce.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <p className="text-[11px] font-semibold text-slate-300">
          How BGErase helps you
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-[13px]">
          <div className="panel">
            <p className="font-semibold mb-1 text-slate-100">📸 Passport / ID photos</p>
            <p className="text-slate-400">Crop to passport presets and get a clean export.</p>
          </div>
          <div className="panel">
            <p className="font-semibold mb-1 text-slate-100">💼 Resume &amp; LinkedIn</p>
            <p className="text-slate-400">Fix lighting and messy backgrounds quickly.</p>
          </div>
          <div className="panel">
            <p className="font-semibold mb-1 text-slate-100">🛒 Ecommerce</p>
            <p className="text-slate-400">Center products and export optimized images.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
