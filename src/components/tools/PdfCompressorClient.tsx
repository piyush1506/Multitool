"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, Minimize2, FileText } from "lucide-react";

export default function PdfCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedPdfBytes, setCompressedPdfBytes] = useState<Uint8Array | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setCompressedPdfBytes(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleCompress = async () => {
    if (!file) return;

    setIsCompressing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Simple compression by creating a fresh doc and copying pages (strips metadata & unused objects)
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      setCompressedPdfBytes(pdfBytes);
    } catch (error) {
      console.error("PDF Compression failed:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedPdfBytes || !file) return;

    const blob = new Blob([compressedPdfBytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-${file.name}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-orange-400 bg-orange-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <p className="text-xl font-medium text-slate-200 mb-2">
            {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF to compress"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
            <FileText className="h-20 w-20 text-orange-400 mb-4" />
            <p className="text-xl font-bold text-white mb-2">{file.name}</p>
            <div className="flex gap-6 text-slate-300 font-medium">
              <p>Original: <span className="text-orange-400">{formatSize(file.size)}</span></p>
              {compressedPdfBytes && (
                <p>New Size: <span className="text-green-400">{formatSize(compressedPdfBytes.length)}</span></p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Minimize2 className="h-6 w-6 text-orange-400" /> Options
            </h2>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              This client-side process removes unnecessary metadata, unreferenced objects, and cleans up document structures to reduce file size.
            </p>

            <div className="mt-auto pt-6 border-t border-slate-800 flex flex-col gap-4">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {isCompressing ? "Compressing..." : "Process PDF"}
              </button>

              {compressedPdfBytes && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" /> Download PDF
                </button>
              )}

              <button
                onClick={() => { setFile(null); setCompressedPdfBytes(null); }}
                className="w-full py-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                Upload a different PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
