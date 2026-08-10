"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { type Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { UploadCloud, Download, Crop as CropIcon } from "lucide-react";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropperClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
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

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const handleDownload = () => {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `cropped-${fileName}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const setFixedAspect = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (newAspect && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, newAspect));
    } else {
      setCrop(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {!imageSrc ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-orange-400 bg-orange-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-slate-200 mb-2">
            {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4 border border-white/10 flex items-center justify-center overflow-auto min-h-[400px]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="max-h-[600px]"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                className="max-h-[600px] object-contain"
              />
            </ReactCrop>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <CropIcon className="h-6 w-6 text-orange-400" /> Controls
            </h2>
            
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFixedAspect(undefined)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      aspect === undefined ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    Free
                  </button>
                  <button
                    onClick={() => setFixedAspect(1)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      aspect === 1 ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    1:1 (Square)
                  </button>
                  <button
                    onClick={() => setFixedAspect(16/9)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      aspect === 16/9 ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    16:9
                  </button>
                  <button
                    onClick={() => setFixedAspect(4/3)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      aspect === 4/3 ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    4:3
                  </button>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <button 
                  onClick={handleDownload}
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-5 w-5" /> Crop & Download
                </button>
                <button
                  onClick={() => { setImageSrc(null); setCrop(undefined); setCompletedCrop(undefined); }}
                  className="w-full mt-4 py-3 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Upload a different image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
