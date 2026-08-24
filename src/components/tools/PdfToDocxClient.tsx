"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Paragraph, TextRun, Packer } from "docx";
import { UploadCloud, Download, FileText, RefreshCw, FileOutput } from "lucide-react";


export default function PdfToDocxClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setExtractedText("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      const paragraphs: Paragraph[] = [];
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");

        fullText += `--- Page ${i} ---\n` + pageText + "\n\n";

        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Page ${i}`,
                bold: true,
                size: 28,
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: pageText,
                size: 24,
              }),
            ],
          })
        );
      }

      setExtractedText(fullText);

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF to DOCX Conversion failed:", error);
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
            isDragActive ? "border-emerald-500 bg-emerald-500/10 glow-accent" : "hover:border-emerald-500/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-xl">
            <UploadCloud className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF to convert to DOCX"}
          </p>
          <p className="text-sm text-slate-600 dark:text-zinc-400 font-light max-w-md mx-auto">
            Extract text and content from your PDF documents into Microsoft Word format.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[400px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{file.name}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                </p>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 dark:bg-zinc-950/60 rounded-2xl p-4 border border-slate-200 dark:border-white/5 overflow-y-auto max-h-[250px]">
              <p className="text-xs uppercase font-semibold text-slate-400 dark:text-zinc-500 mb-2">Extracted Content Preview</p>
              <pre className="text-xs text-slate-700 dark:text-zinc-300 whitespace-pre-wrap font-mono">
                {extractedText || "Click 'Convert to DOCX' below to extract text and download Word document..."}
              </pre>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                <FileOutput className="h-6 w-6 text-blue-500" /> Options
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-400 font-light mb-6">
                Converts page text directly into standard Microsoft Word paragraphs and sections.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    Converting PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Convert to DOCX & Download
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
