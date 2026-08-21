"use client";

import React, { useState } from "react";
import { ArrowRightLeft, Copy, Check, Download, FileCode } from "lucide-react";

type FormatType = "json" | "csv" | "xml";

export default function FormatConverterClient() {
  const [inputFormat, setInputFormat] = useState<FormatType>("json");
  const [outputFormat, setOutputFormat] = useState<FormatType>("csv");
  const [inputText, setInputText] = useState<string>(
    JSON.stringify(
      [
        { id: 1, name: "John Doe", role: "Developer", city: "New York" },
        { id: 2, name: "Jane Smith", role: "Designer", city: "London" },
      ],
      null,
      2
    )
  );
  const [outputText, setOutputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const jsonToCsv = (jsonArr: any[]) => {
    if (!Array.isArray(jsonArr) || jsonArr.length === 0) return "";
    const keys = Object.keys(jsonArr[0]);
    const header = keys.join(",");
    const rows = jsonArr.map((row) =>
      keys.map((k) => JSON.stringify(row[k] ?? "")).join(",")
    );
    return [header, ...rows].join("\n");
  };

  const csvToJson = (csvStr: string) => {
    const lines = csvStr.trim().split("\n");
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ?? "";
      });
      return obj;
    });
  };

  const jsonToXml = (jsonObj: any) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
    const buildXml = (obj: any, indent = "  ") => {
      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          xml += `${indent}<item>\n`;
          buildXml(item, indent + "  ");
          xml += `${indent}</item>\n`;
        });
      } else if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach((key) => {
          xml += `${indent}<${key}>`;
          if (typeof obj[key] === "object") {
            xml += "\n";
            buildXml(obj[key], indent + "  ");
            xml += `${indent}`;
          } else {
            xml += String(obj[key]);
          }
          xml += `</${key}>\n`;
        });
      }
    };
    buildXml(jsonObj);
    xml += "</root>";
    return xml;
  };

  const handleConvert = () => {
    setError(null);
    try {
      let data: any;

      if (inputFormat === "json") {
        data = JSON.parse(inputText);
      } else if (inputFormat === "csv") {
        data = csvToJson(inputText);
      } else {
        setError("XML parsing not supported for input. Please use JSON or CSV as input.");
        return;
      }

      let result = "";
      if (outputFormat === "json") {
        result = JSON.stringify(data, null, 2);
      } else if (outputFormat === "csv") {
        result = jsonToCsv(Array.isArray(data) ? data : [data]);
      } else if (outputFormat === "xml") {
        result = jsonToXml(data);
      }

      setOutputText(result);
    } catch (err: any) {
      setError("Failed to convert: " + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted-data.${outputFormat}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">From:</label>
          <select
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value as FormatType)}
            className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-zinc-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>

          <ArrowRightLeft className="h-4 w-4 text-emerald-500 mx-2" />

          <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">To:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as FormatType)}
            className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-zinc-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all"
        >
          <FileCode className="h-4 w-4" /> Convert Data
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Input ({inputFormat.toUpperCase()})
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={12}
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Output ({outputFormat.toUpperCase()})
            </label>
            {outputText && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1"
                >
                  <Download className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            )}
          </div>
          <textarea
            value={outputText}
            readOnly
            rows={12}
            placeholder="Converted output will appear here..."
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
