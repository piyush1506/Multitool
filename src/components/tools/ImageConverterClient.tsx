"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Download, FileImage } from "lucide-react";

const FORMATS = [
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "JPEG", value: "image/jpeg", ext: "jpg" },
  { label: "WEBP", value: "image/webp", ext: "webp" },
];

export default function ImageConverterClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);
  const [quality, setQuality] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name.split('.')[0]); // Get filename without extension
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      // Fill background for JPEGs to avoid black background for transparent PNGs
      if (selectedFormat.value === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL(selectedFormat.value, quality / 100);
      const link = document.createElement("a");
      link.download = `${fileName}-converted.${selectedFormat.ext}`;
      link.href = dataUrl;
      link.click();
    };
    img.src = imageSrc;
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {!imageSrc ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-purple-400 bg-purple-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-slate-200 mb-2">
            {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-slate-400">All standard image formats supported</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
            <img 
              src={imageSrc} 
              alt="Preview" 
              className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg mb-4"
            />
            <p className="text-slate-400 text-sm">Preview loaded</p>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <FileImage className="h-6 w-6 text-purple-400" /> Conversion Settings
            </h2>
            
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Target Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {FORMATS.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                        selectedFormat.value === fmt.value 
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25 border-transparent' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedFormat.value === "image/jpeg" || selectedFormat.value === "image/webp") && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quality ({quality}%)
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              )}
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <button 
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" /> Convert & Download
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="w-full mt-4 py-3 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Upload a different image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
