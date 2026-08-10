"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Download, Lock, Unlock, Image as ImageIcon } from "lucide-react";

export default function ImageResizerClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [lockRatio, setLockRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
        
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setDimensions({ width: img.width, height: img.height });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp", ".gif"]
    },
    maxFiles: 1,
  });

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, type: "width" | "height") => {
    const val = parseInt(e.target.value) || 0;
    if (lockRatio) {
      const ratio = originalDimensions.width / originalDimensions.height;
      if (type === "width") {
        setDimensions({ width: val, height: Math.round(val / ratio) });
      } else {
        setDimensions({ width: Math.round(val * ratio), height: val });
      }
    } else {
      setDimensions(prev => ({ ...prev, [type]: val }));
    }
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `resized-${fileName}`;
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
            isDragActive ? "border-blue-400 bg-blue-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-slate-200 mb-2">
            {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-slate-400">Supports JPG, PNG, WEBP, GIF</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
            <img 
              src={imageSrc} 
              alt="Preview" 
              className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg mb-4"
            />
            <p className="text-slate-400 text-sm">Original: {originalDimensions.width} x {originalDimensions.height}px</p>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-blue-400" /> Settings
            </h2>
            
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Width (px)</label>
                  <input 
                    type="number" 
                    value={dimensions.width}
                    onChange={(e) => handleDimensionChange(e, "width")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  />
                </div>
                
                <button 
                  onClick={() => setLockRatio(!lockRatio)}
                  className={`p-3 rounded-xl transition-colors ${lockRatio ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}
                  title="Lock Aspect Ratio"
                >
                  {lockRatio ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
                </button>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Height (px)</label>
                  <input 
                    type="number" 
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange(e, "height")}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  />
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <button 
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" /> Download Resized Image
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
