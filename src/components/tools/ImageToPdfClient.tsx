"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Download, FileText, Trash2, GripVertical } from "lucide-react";
import jsPDF from "jspdf";

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

export default function ImageToPdfClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      // Revoke the object URL to avoid memory leaks
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        
        const img = new Image();
        img.src = images[i].preview;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Calculate aspect ratio to fit image into the page
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;
        
        let finalWidth = pageWidth;
        let finalHeight = pageHeight;
        let x = 0;
        let y = 0;

        if (imgRatio > pageRatio) {
          finalHeight = pageWidth / imgRatio;
          y = (pageHeight - finalHeight) / 2;
        } else {
          finalWidth = pageHeight * imgRatio;
          x = (pageWidth - finalWidth) / 2;
        }

        doc.addImage(img, "JPEG", x, y, finalWidth, finalHeight);
      }

      doc.save("images-to-pdf.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-green-400 bg-green-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        <p className="text-xl font-medium text-slate-200 mb-2">
          {isDragActive ? "Drop images here" : "Drag & drop multiple images, or click to select"}
        </p>
      </div>
      
      {images.length > 0 && (
        <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-400" /> Selected Images ({images.length})
            </h2>
            <button 
              onClick={handleGeneratePdf}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : (
                <><Download className="h-5 w-5" /> Download PDF</>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group bg-slate-800 rounded-xl overflow-hidden aspect-square border border-slate-700">
                <img 
                  src={img.preview} 
                  alt="preview" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
