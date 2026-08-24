"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, Scissors, FileText } from "lucide-react";

export default function SplitPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitRange, setSplitRange] = useState<string>("1");
  const [isSplitting, setIsSplitting] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const count = pdf.getPageCount();
        setPageCount(count);
        setSplitRange(`1-${count}`);
      } catch (err) {
        console.error("Failed to load PDF", err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const parsePageRanges = (rangeStr: string, totalPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(",");

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const pageNum = Number(trimmed);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          pages.add(pageNum - 1);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || pageCount === 0) return;

    setIsSplitting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const targetPageIndices = parsePageRanges(splitRange, pageCount);

      if (targetPageIndices.length === 0) {
        alert("Please enter a valid page range.");
        setIsSplitting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, targetPageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `split-${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Split failed:", error);
    } finally {
      setIsSplitting(false);
    }
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
            {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF, or click to select"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
            <FileText className="h-20 w-20 text-orange-400 mb-4" />
            <p className="text-xl font-bold text-white mb-1">{file.name}</p>
            <p className="text-sm text-slate-400">Total Pages: {pageCount}</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-white/10 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Scissors className="h-6 w-6 text-orange-400" /> Split Options
            </h2>

            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Page Selection/Range
                </label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  placeholder="e.g. 1-3, 5, 7-9"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Specify page numbers or ranges separated by commas (e.g. 1-3, 5).
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-800 flex flex-col gap-4">
                <button
                  onClick={handleSplit}
                  disabled={isSplitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" />
                  {isSplitting ? "Processing..." : "Extract Pages & Download"}
                </button>

                <button
                  onClick={() => { setFile(null); setPageCount(0); }}
                  className="w-full py-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Upload a different PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
