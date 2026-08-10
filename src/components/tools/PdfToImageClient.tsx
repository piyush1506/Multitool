"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Download, FileDown, Loader2 } from "lucide-react";

interface ExtractedImage {
  id: string;
  pageNumber: number;
  dataUrl: string;
}

export default function PdfToImageClient() {
  const [images, setImages] = useState<ExtractedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    // Setup PDF.js worker dynamically to avoid SSR DOMMatrix error
    import("pdfjs-dist").then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name.replace('.pdf', ''));
    setIsProcessing(true);
    setImages([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const totalPages = pdf.numPages;
      setProgress({ current: 0, total: totalPages });
      
      const extractedImages: ExtractedImage[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Scale for better quality
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) continue;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        } as any).promise;
        
        extractedImages.push({
          id: Math.random().toString(36).substr(2, 9),
          pageNumber: i,
          dataUrl: canvas.toDataURL("image/jpeg", 0.9)
        });
        
        setProgress({ current: i, total: totalPages });
      }
      
      setImages(extractedImages);
    } catch (error) {
      console.error("Error processing PDF:", error);
      alert("An error occurred while processing the PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const downloadImage = (dataUrl: string, pageNum: number) => {
    const link = document.createElement("a");
    link.download = `${fileName}-page-${pageNum}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  const downloadAll = () => {
    // Basic implementation for single downloads. In a real app, you might want to use JSZip to zip them.
    images.forEach((img, idx) => {
      setTimeout(() => downloadImage(img.dataUrl, img.pageNumber), idx * 200);
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {images.length === 0 && !isProcessing ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-yellow-400 bg-yellow-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-slate-200 mb-2">
            {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF file, or click to select"}
          </p>
        </div>
      ) : isProcessing ? (
        <div className="bg-slate-900 rounded-2xl p-16 border border-white/10 flex flex-col items-center justify-center text-center">
          <Loader2 className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Processing PDF...</h3>
          <p className="text-slate-400">
            Extracting page {progress.current} of {progress.total}
          </p>
          <div className="w-full max-w-md bg-slate-800 rounded-full h-2.5 mt-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                <FileDown className="h-6 w-6 text-yellow-400" /> Extracted Pages
              </h2>
              <p className="text-slate-400 text-sm">Found {images.length} pages in {fileName}.pdf</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setImages([])}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Upload New
              </button>
              <button 
                onClick={downloadAll}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Download className="h-4 w-4" /> Download All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
                <div className="aspect-[1/1.4] w-full relative group">
                  <img 
                    src={img.dataUrl} 
                    alt={`Page ${img.pageNumber}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => downloadImage(img.dataUrl, img.pageNumber)}
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full font-medium transition-colors"
                    >
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-slate-800 text-center border-t border-slate-700">
                  <span className="text-sm font-medium text-slate-300">Page {img.pageNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
