import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import getCroppedImg from "../utils/cropImage.js";
import Layout from "../components/Layout.jsx";

const API_URL = "http://localhost:8000/process-image";

function formatBytes(bytes) {
  if (bytes == null) return "-";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
}

export default function Editor() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [outputUrl, setOutputUrl] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(413 / 531);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [bgColor, setBgColor] = useState("#00d9ff");
  const [useTransparent, setUseTransparent] = useState(false);
  const [width, setWidth] = useState("413");
  const [height, setHeight] = useState("531");
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(90);

  const [inputSize, setInputSize] = useState(null);
  const [outputSize, setOutputSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setOutputUrl(null);
    setInputSize(f.size);
    setOutputSize(null);
    toast.success("Image uploaded");
  };

  const handlePreset = (w, h) => {
    setWidth(String(w));
    setHeight(String(h));
    setAspect(w / h);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  const handleResetCrop = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
    toast("Crop reset", { icon: "↺" });
  };

  const handleProcess = async () => {
    if (!file || !imageUrl) {
      toast.error("Upload an image first");
      return;
    }
    setLoading(true);
    setOutputUrl(null);
    setOutputSize(null);
    try {
      let fileToSend = file;
      if (croppedAreaPixels) {
        const { blob } = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
        fileToSend = new File([blob], "crop.png", { type: "image/png" });
      }

      const fd = new FormData();
      fd.append("file", fileToSend);
      if (width) fd.append("width", width);
      if (height) fd.append("height", height);
      fd.append("format", format);
      fd.append("quality", String(quality));
      fd.append("bg_color", useTransparent ? "" : bgColor);

      const res = await fetch(API_URL, { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to process image");
      }

      const blob = await res.blob();
      setOutputSize(blob.size);
      setOutputUrl(URL.createObjectURL(blob));
      toast.success("Image processed 🎉");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const ext = format === "jpeg" ? "jpg" : format;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `bgerase.${ext}`;
    a.click();
  };

  const reduction =
    inputSize && outputSize ? ((inputSize - outputSize) / inputSize) * 100 : null;

  return (
    <Layout>
      <section className="text-center mb-8">
        <h1 className="hero-title mb-1 text-center">
          Remove Background, Crop & Resize — Instantly
        </h1>
        <p className="hero-sub text-center max-w-xl mx-auto">
          Upload a photo, adjust crop, change background to solid colour or transparent PNG,
          and export in ready-to-use sizes.
        </p>
      </section>

      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6">
        {/* LEFT SIDE */}
        <div className="panel">
          <p className="text-[11px] font-semibold mb-2 text-slate-300">Upload Image</p>

          <label className="flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-950/80 px-4 py-5 cursor-pointer text-xs text-slate-200 hover:border-indigo-400 transition">
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <span className="flex items-center gap-2">
              <span className="text-lg">📁</span> Click to upload image
            </span>
          </label>

          {file && (
            <p className="mt-1 text-[11px] text-slate-400">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          )}

          {/* WIDTH + HEIGHT */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] mb-1 text-slate-300">Width (px)</p>
              <input className="input" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>

            <div>
              <p className="text-[11px] mb-1 text-slate-300">Height (px)</p>
              <input className="input" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>

          {/* CROP PRESETS */}
          <div className="mt-5">
            <p className="text-[11px] font-semibold text-slate-300 mb-2">Crop Presets</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                ["Passport", 413, 531],
                ["Square", 1080, 1080],
                ["YouTube Thumb", 1280, 720],
                ["LinkedIn", 800, 800],
                ["Aadhaar / PAN", 480, 640],
                ["Instagram Post", 1080, 1350],
                ["E-Commerce", 1600, 1600],
                ["FB Cover", 1640, 720],
              ].map(([label, w, h]) => (
                <button key={label} type="button" className="preset-btn" onClick={() => handlePreset(w, h)}>
                  <div className="flex justify-between"><span>{label}</span></div>
                </button>
              ))}
            </div>
          </div>

          {/* BACKGROUND SETTINGS */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-slate-300">Background</p>

              <button
                type="button"
                onClick={() => setUseTransparent((v) => !v)}
                className={`px-3 py-1.5 rounded-full text-[10px] border transition ${
                  useTransparent
                    ? "bg-emerald-500 text-slate-900 border-emerald-400"
                    : "bg-slate-900 text-slate-100 border-slate-600"
                }`}
              >
                Transparent: {useTransparent ? "ON" : "OFF"}
              </button>
            </div>

            <p className="text-[10px] text-slate-400">
              Turn ON to keep PNG transparent. Turn OFF to pick a solid colour.
            </p>

            {!useTransparent && (
              <div className="color-picker-box">
                <div className="flex-1">
                  <HexColorPicker
                    color={bgColor}
                    onChange={setBgColor}
                    style={{ width: "100%", height: "180px" }}
                  />

                  <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                    <div
                      className="w-9 h-9 rounded-md border border-slate-500"
                      style={{ backgroundColor: bgColor }}
                    />
                    <span>{bgColor}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 max-w-[120px]">
                  Keep backgrounds clean (white / light grey / blue) for ID photos, resumes & ecommerce.
                </p>
              </div>
            )}
          </div>

          {/* FORMAT + QUALITY */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] mb-1 text-slate-300">Format</p>
              <select className="input" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>

            <div>
              <p className="text-[11px] mb-1 text-slate-300">Quality ({quality}%)</p>
              <input
                type="range"
                min={40}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* SIZE INFO */}
          <div className="mt-4 text-[11px] text-slate-400 space-y-1">
            <p>Input: {formatBytes(inputSize)}</p>
            <p>
              Output: {formatBytes(outputSize)}{" "}
              {reduction != null && (
                <span className="ml-2 text-emerald-400">({reduction.toFixed(1)}% change)</span>
              )}
            </p>
          </div>

          {/* APPLY BUTTON */}
          <button
  type="button"
  onClick={handleProcess}
  disabled={loading || !file}
  className="btn-main apply-btn-big disabled:opacity-60"
>
  {loading ? "Processing…" : "✨ Apply Changes"}
</button>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">
          {/* CROPPER */}
          <div className="panel">
            <p className="text-[11px] font-semibold mb-2 text-slate-300">Crop · Rotate · Zoom</p>

            <div className="cropper-box">
              {imageUrl ? (
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  showGrid={false}
                  restrictPosition={false}
                />
              ) : (
                <p className="output-placeholder">Upload an image to begin</p>
              )}
            </div>

            {imageUrl && (
              <div className="slider-box">
                <div>
                  <p className="text-[11px] mb-1 text-slate-300">Rotate</p>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="text-[11px] mb-1 text-slate-300">Zoom</p>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.02}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button type="button" onClick={handleResetCrop} className="reset-btn">
                  Reset crop ↺
                </button>
              </div>
            )}
          </div>

          {/* RESULT PREVIEW — FIXED VERSION */}
          <div className="panel">
            <p className="text-[11px] font-semibold mb-2 text-slate-300">Result Preview</p>

            <div className="output-box">
              <div className={`output-inner ${useTransparent ? "checkerboard" : ""}`}>
                {outputUrl ? (
                  <img src={outputUrl} alt="output" className="output-inner-img" />
                ) : (
                  <p className="output-placeholder">Processed image will appear here</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!outputUrl}
              className="btn-download mt-4 disabled:opacity-60"
            >
              ⬇ Download
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
