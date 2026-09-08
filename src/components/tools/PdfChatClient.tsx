"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, UploadCloud, FileText, Send, Sparkles, Settings2, X, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export default function PdfChatClient() {
  const [file, setFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customApiKey, setCustomApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedApiKey = localStorage.getItem("multitool_custom_gemini_key");
      if (savedApiKey) {
        setCustomApiKey(savedApiKey);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSaveCustomApiKey = (key: string) => {
    setCustomApiKey(key);
    try {
      localStorage.setItem("multitool_custom_gemini_key", key.trim());
    } catch (e) {}
  };

  const extractTextFromPdf = async (pdfFile: File) => {
    setIsExtracting(true);
    setError(null);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        text += pageText + "\n";
      }
      setDocumentText(text);
      setMessages([{ role: "ai", text: `I have successfully read "${pdfFile.name}" (${pdf.numPages} pages). What would you like to know about it?` }]);
    } catch (err: any) {
      setError("Failed to read PDF file. It might be corrupted or password protected.");
      console.error(err);
      setFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setMessages([]);
      extractTextFromPdf(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const handleSend = async () => {
    if (!input.trim() || !documentText || isProcessing) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch("/api/pdf-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentText,
          question: userMsg,
          customApiKey: customApiKey.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to get an answer.");
      }

      setMessages((prev) => [...prev, { role: "ai", text: data.result }]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      // Remove the user message if it failed or add an error message
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto pb-12">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-[var(--panel-border)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 via-red-500 to-orange-500 shadow-md">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text-main)]">
                AI PDF Chat
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-600 border border-rose-500/20">
                <Sparkles className="h-3 w-3" /> Gemini
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Upload a document and instantly ask questions about its content.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors shadow-sm"
        >
          <Settings2 className="h-4 w-4 text-rose-500" />
          <span>API Key</span>
          {customApiKey && <span className="h-2 w-2 rounded-full bg-rose-500" />}
        </button>
      </div>

      {isSettingsOpen && (
        <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 bg-rose-500/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-rose-500" /> API Settings
            </h3>
            <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="block font-medium text-[var(--text-main)] mb-1 text-xs">
              Google AI Studio API Key (Gemini)
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={customApiKey}
              onChange={(e) => handleSaveCustomApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] text-xs focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      )}

      {error && (
         <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-start gap-2.5 text-sm">
         <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
         <p>{error}</p>
       </div>
      )}

      {!file ? (
        <div
          {...getRootProps()}
          className={`p-10 rounded-3xl glass-panel border-2 border-dashed flex flex-col items-center justify-center text-center gap-4 transition-colors cursor-pointer min-h-[400px] ${
            isDragActive
              ? "border-rose-500 bg-rose-500/5"
              : "border-[var(--panel-border)] hover:border-rose-400 hover:bg-[var(--card-hover-bg)]"
          }`}
        >
          <input {...getInputProps()} />
          <div className="h-16 w-16 rounded-2xl bg-[var(--card-bg)] border border-[var(--panel-border)] flex items-center justify-center shadow-sm">
            <UploadCloud className="h-8 w-8 text-rose-500 opacity-80" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)]">Upload a PDF</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-xs mx-auto leading-relaxed">
              Drag and drop your PDF document here to start chatting with it.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[600px] rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm overflow-hidden">
          {/* Active File Header */}
          <div className="p-4 border-b border-[var(--panel-border)] bg-[var(--card-bg)] flex justify-between items-center">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-600">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-main)] truncate">{file.name}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {isExtracting ? "Extracting text locally..." : "Ready to chat"}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setDocumentText(""); setMessages([]); }}
              className="text-xs font-medium text-[var(--text-muted)] hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10"
            >
              Close PDF
            </button>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-[var(--preview-bg)]">
            {messages.length === 0 && !isExtracting && (
              <div className="m-auto flex flex-col items-center justify-center text-center text-[var(--text-muted)]">
                <MessageSquare className="h-10 w-10 opacity-20 mb-3" />
                <p className="text-sm">Ask me anything about this document!</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-rose-600 text-white rounded-br-sm shadow-md" 
                    : "bg-[var(--card-bg)] border border-[var(--panel-border)] text-[var(--text-main)] rounded-bl-sm shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-5 py-3.5 bg-[var(--card-bg)] border border-[var(--panel-border)] text-[var(--text-main)] shadow-sm flex gap-1.5 items-center">
                  <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--panel-border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-3 bg-[var(--panel-bg)] p-2 rounded-2xl border border-[var(--panel-border)] focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleSend() }}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-[var(--text-main)] px-2"
                disabled={isProcessing || isExtracting}
              />
              <button
                onClick={handleSend}
                disabled={isProcessing || isExtracting || !input.trim()}
                className="p-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
