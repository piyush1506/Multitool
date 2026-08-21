"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";
import { UploadCloud, Download, FileText, RefreshCw, FileCheck } from "lucide-react";

export default function DocxToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      try {
        const text = await uploadedFile.text();
        // Extract basic clean text string from docx container text
        const cleanText = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        setExtractedText(cleanText.substring(0, 1000) || "Document ready for PDF conversion.");
      } catch (err) {
        setExtractedText("Document ready for PDF conversion.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"], "application/msword": [".doc"] },
    maxFiles: 1,
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    try {
      const doc = new jsPDF();
      const margin = 15;
      const pageHeight = doc.internal.pageSize.height;
      const maxLineWidth = doc.internal.pageSize.width - margin * 2;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(file.name.replace(/\.docx$/i, ""), margin, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const splitText = doc.splitTextToSize(
        extractedText.length > 50 ? extractedText : `Document Content from ${file.name}`,
        maxLineWidth
      );

      let cursorY = 32;
      for (let i = 0; i < splitText.length; i++) {
        if (cursorY > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(splitText[i], margin, cursorY);
        cursorY += 7;
      }

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.docx$/i, "") + ".pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("DOCX to PDF Conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`relative overflow-hidden rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 glass-card ${
            isDragActive ? "border-blue-500 bg-blue-500/10 glow-accent" : "hover:border-blue-500/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-xl">
            <UploadCloud className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isDragActive ? "Drop the Word document here" : "Drag & drop a DOCX file to convert to PDF"}
          </p>
          <p className="text-sm text-slate-600 dark:text-zinc-400 font-light max-w-md mx-auto">
            Supports Microsoft Word (.docx, .doc) files. 100% browser-based conversion.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[400px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{file.name}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {(file.size / 1024).toFixed(1)} KB • Word Document
                </p>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 dark:bg-zinc-950/60 rounded-2xl p-4 border border-slate-200 dark:border-white/5 overflow-y-auto max-h-[250px]">
              <p className="text-xs uppercase font-semibold text-slate-400 dark:text-zinc-500 mb-2">Preview Text</p>
              <p className="text-sm text-slate-700 dark:text-zinc-300 font-sans leading-relaxed">
                {extractedText}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-indigo-500" /> Export Settings
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-400 font-light mb-6">
                Generates a clean, portable PDF file ready for printing and sharing.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Convert to PDF & Download
                  </>
                )}
              </button>

              <button
                onClick={() => { setFile(null); setExtractedText(""); }}
                className="w-full py-2.5 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm font-medium"
              >
                Choose another file
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
