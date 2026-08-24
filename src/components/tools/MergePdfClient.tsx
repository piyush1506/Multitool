"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Download, FileText, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export default function MergePdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Merge failed:", error);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-orange-400 bg-orange-400/10" : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <p className="text-lg font-medium text-slate-200 mb-1">
          {isDragActive ? "Drop PDFs here" : "Drag & drop PDF files to add"}
        </p>
        <p className="text-xs text-slate-400">Select multiple PDF files to combine</p>
      </div>

      {files.length > 0 && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Selected Files ({files.length})
          </h3>

          <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700/50"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="h-6 w-6 text-orange-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveFile(idx, "up")}
                    disabled={idx === 0}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, "down")}
                    disabled={idx === files.length - 1}
                    className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setFiles([])}
              className="text-slate-400 hover:text-white text-sm"
            >
              Clear All
            </button>

            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isMerging}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5" />
              {isMerging ? "Merging..." : "Merge PDFs"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
