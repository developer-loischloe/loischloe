"use client";
import React, { useRef, useState, useCallback } from "react";
import { Camera, Upload, RefreshCw, Sparkles, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Predefined lip color swatches inspired by common makeup shades
const LIP_SHADES = [
  { name: "Classic Red", hex: "#C41E3A", opacity: 0.65 },
  { name: "Nude Beige", hex: "#C4956A", opacity: 0.60 },
  { name: "Rose Pink", hex: "#E8638A", opacity: 0.60 },
  { name: "Berry Mauve", hex: "#8B3A6B", opacity: 0.65 },
  { name: "Coral Crush", hex: "#E8704A", opacity: 0.65 },
  { name: "Deep Wine", hex: "#6B1A2A", opacity: 0.70 },
  { name: "Dusty Rose", hex: "#C4828A", opacity: 0.60 },
  { name: "Peachy Keen", hex: "#E8A87C", opacity: 0.55 },
];

const LipTryOn = ({ product }: { product: any }) => {
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedShade, setSelectedShade] = useState(LIP_SHADES[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [overlayMode, setOverlayMode] = useState(false);
  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 65, w: 35, h: 12 });

  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Check if this is a lip product
  const isLipProduct =
    product?.child_category?.toLowerCase().includes("lip") ||
    product?.parent_category?.toLowerCase().includes("lip") ||
    product?.name?.toLowerCase().includes("lip") ||
    product?.name?.toLowerCase().includes("lipstick") ||
    product?.name?.toLowerCase().includes("lip gloss") ||
    product?.name?.toLowerCase().includes("lip liner");

  const drawCanvas = useCallback(
    (img: HTMLImageElement, shade: typeof LIP_SHADES[0], pos: typeof overlayPos) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (overlayMode) {
        // Draw lip color overlay as an ellipse
        const cx = (pos.x / 100) * canvas.width;
        const cy = (pos.y / 100) * canvas.height;
        const rx = (pos.w / 200) * canvas.width;
        const ry = (pos.h / 200) * canvas.height;

        ctx.save();
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = shade.opacity;
        ctx.fillStyle = shade.hex;

        // Draw upper lip (slightly smaller)
        ctx.beginPath();
        ctx.ellipse(cx, cy - ry * 0.3, rx * 0.8, ry * 0.7, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Draw lower lip
        ctx.beginPath();
        ctx.ellipse(cx, cy + ry * 0.5, rx, ry * 0.8, 0, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();

        // Add subtle shine
        ctx.save();
        ctx.globalAlpha = 0.15;
        const grad = ctx.createRadialGradient(cx - rx * 0.2, cy + ry * 0.3, 0, cx, cy, rx);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy + ry * 0.5, rx * 0.6, ry * 0.5, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    },
    [overlayMode]
  );

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImage(src);
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        drawCanvas(img, selectedShade, overlayPos);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const applyColor = (shade: typeof LIP_SHADES[0]) => {
    setSelectedShade(shade);
    setOverlayMode(true);
    if (imageRef.current) {
      drawCanvas(imageRef.current, shade, overlayPos);
    }
  };

  const resetCanvas = () => {
    setOverlayMode(false);
    if (imageRef.current) {
      drawCanvas(imageRef.current, selectedShade, overlayPos);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newPos = { ...overlayPos, x, y };
    setOverlayPos(newPos);
    if (imageRef.current && overlayMode) {
      drawCanvas(imageRef.current, selectedShade, newPos);
    }
  };

  if (!isLipProduct) return null;

  return (
    <div className="border border-brand_primary/20 rounded-xl bg-[#fdf8f3] p-5 mt-4">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand_primary" />
          <h3 className="font-semibold text-brand_secondary">
            Virtual Lip Try-On
          </h3>
          <span className="text-xs bg-brand_primary text-brand_secondary px-2 py-0.5 rounded-full font-medium">
            NEW
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-brand_gray" />
        ) : (
          <ChevronDown size={18} className="text-brand_gray" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-brand_gray">
            Upload your selfie and try our lip shades virtually. Click the canvas to reposition the color overlay.
          </p>

          {/* Upload Area */}
          {!image ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file?.type.startsWith("image/")) handleFileUpload(file);
              }}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-brand_primary bg-brand_primary/10"
                  : "border-gray-300 hover:border-brand_primary hover:bg-brand_primary/5"
              }`}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={32} className="mx-auto text-brand_gray mb-3" />
              <p className="text-sm font-medium text-brand_secondary">
                Drop your selfie here or click to upload
              </p>
              <p className="text-xs text-brand_gray mt-1">
                JPG, PNG supported · Your photo stays on your device
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Canvas */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full max-h-[350px] object-contain rounded-xl border cursor-crosshair"
                  onClick={handleCanvasClick}
                />
                {overlayMode && (
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Click lips to reposition
                  </div>
                )}
                <button
                  onClick={() => { setImage(null); setOverlayMode(false); imageRef.current = null; }}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCanvas}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <RefreshCw size={13} />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Camera size={13} />
                  New Photo
                </Button>
              </div>

              {/* Shade Picker */}
              <div>
                <p className="text-sm font-medium text-brand_secondary mb-3">
                  Try a shade:
                </p>
                <div className="flex flex-wrap gap-3">
                  {LIP_SHADES.map((shade) => (
                    <button
                      key={shade.name}
                      title={shade.name}
                      onClick={() => applyColor(shade)}
                      className={`group flex flex-col items-center gap-1 transition-all`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedShade.name === shade.name && overlayMode
                            ? "border-brand_secondary scale-110 shadow-md"
                            : "border-transparent hover:border-brand_gray"
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-[9px] text-brand_gray text-center w-[50px] leading-tight">
                        {shade.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />

          <p className="text-xs text-brand_gray italic">
            🔒 Your photos are processed locally and never uploaded to our servers.
          </p>
        </div>
      )}
    </div>
  );
};

export default LipTryOn;
